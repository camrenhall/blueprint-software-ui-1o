// File upload utilities and validation logic for client document upload

export const ALLOWED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
} as const;

export const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx'] as const;

export const MAX_FILES = 25;
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per file
export const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB total

export interface FileValidationError {
  file: File;
  error: string;
  type: 'size' | 'type' | 'count';
}

export interface FileValidationResult {
  validFiles: File[];
  errors: FileValidationError[];
  isValid: boolean;
}

/**
 * Validates a list of files against upload restrictions
 */
export function validateFiles(files: File[], existingFiles: File[] = []): FileValidationResult {
  const errors: FileValidationError[] = [];
  const validFiles: File[] = [];
  const totalFiles = files.length + existingFiles.length;

  // Check total file count
  if (totalFiles > MAX_FILES) {
    const excess = totalFiles - MAX_FILES;
    files.slice(-excess).forEach(file => {
      errors.push({
        file,
        error: `Maximum ${MAX_FILES} files allowed. Please remove ${excess} file(s).`,
        type: 'count'
      });
    });
    files = files.slice(0, MAX_FILES - existingFiles.length);
  }

  // Validate each file
  files.forEach(file => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      errors.push({
        file,
        error: `File size exceeds 50MB limit. Current size: ${formatFileSize(file.size)}`,
        type: 'size'
      });
      return;
    }

    // Check file type
    const fileExtension = getFileExtension(file.name).toLowerCase();
    const isValidType = ALLOWED_EXTENSIONS.includes(fileExtension as any) || 
                       Object.keys(ALLOWED_FILE_TYPES).includes(file.type);

    if (!isValidType) {
      errors.push({
        file,
        error: `File type not allowed. Supported types: PDF, PNG, JPG, DOC, DOCX`,
        type: 'type'
      });
      return;
    }

    validFiles.push(file);
  });

  // Check total size
  const totalSize = [...validFiles, ...existingFiles].reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    const excessSize = totalSize - MAX_TOTAL_SIZE;
    errors.push({
      file: validFiles[validFiles.length - 1],
      error: `Total upload size exceeds 200MB limit. Please remove ${formatFileSize(excessSize)} of files.`,
      type: 'size'
    });
  }

  return {
    validFiles,
    errors,
    isValid: errors.length === 0
  };
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf('.'));
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file type icon name based on extension (for use with lucide-react)
 */
export function getFileTypeIcon(filename: string): string {
  const extension = getFileExtension(filename).toLowerCase();

  switch (extension) {
    case '.pdf':
      return 'FileText';
    case '.png':
    case '.jpg':
    case '.jpeg':
      return 'Image';
    case '.doc':
    case '.docx':
      return 'FileText';
    default:
      return 'File';
  }
}

/**
 * Get file type color for UI styling
 */
export function getFileTypeColor(filename: string): string {
  const extension = getFileExtension(filename).toLowerCase();
  
  switch (extension) {
    case '.pdf':
      return 'text-red-600 bg-red-50 border-red-200';
    case '.png':
    case '.jpg':
    case '.jpeg':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case '.doc':
    case '.docx':
      return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

/**
 * Generate a unique ID for file tracking
 */
export function generateFileId(): string {
  return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simulate file upload progress (for demo purposes)
 */
export function simulateUpload(file: File, onProgress: (progress: number) => void): Promise<string> {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress increment
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => resolve(`uploaded_${generateFileId()}`), 200);
      }
      onProgress(Math.min(progress, 100));
    }, 200);
  });
}

/**
 * Extract readable filename without path
 */
export function getDisplayFilename(file: File | string): string {
  if (typeof file === 'string') return file;
  return file.name;
}

/**
 * Check if file is an image
 */
export function isImageFile(filename: string): boolean {
  const extension = getFileExtension(filename).toLowerCase();
  return ['.png', '.jpg', '.jpeg'].includes(extension);
}

/**
 * Create a safe filename for storage
 */
export function createSafeFilename(originalName: string): string {
  // Remove unsafe characters and replace with underscores
  const safe = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return safe;
}
