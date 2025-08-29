import { useState, useCallback } from "react";

export interface Document {
  name: string;
  optional: boolean;
}

export interface Template {
  name: string;
  documents: string[];
}

interface UseDocumentSelectionProps {
  availableDocuments?: string[];
  initialSelectedDocuments?: Document[];
  savedTemplates?: Template[];
}

const DEFAULT_AVAILABLE_DOCUMENTS = [
  "W2 Tax Form",
  "1098 Tax Return",
  "Bank Statements",
  "Employment Records",
  "Medical Records",
  "Insurance Documents",
  "Property Deeds",
  "Driver's License",
  "Social Security Card",
  "Birth Certificate",
  "Marriage Certificate",
  "Financial Statements",
  "Credit Reports",
  "Tax Returns (2023)",
  "Payroll Records",
  "Employment Verification Letter",
  "Wage and Hour Records",
  "Workers Compensation Claims",
  "Performance Reviews",
  "Contracts and Agreements",
  "Court Documents",
];

const DEFAULT_SAVED_TEMPLATES: Template[] = [
  {
    name: "Personal Injury Standard",
    documents: [
      "Medical Records",
      "Insurance Documents",
      "Employment Records",
      "W2 Tax Form",
    ],
  },
  {
    name: "Employment Law Package",
    documents: [
      "Employment Records",
      "Payroll Records",
      "Employment Verification Letter",
      "Wage and Hour Records",
    ],
  },
  {
    name: "Corporate Compliance",
    documents: [
      "Financial Statements",
      "Tax Returns (2023)",
      "Court Documents",
      "Contracts and Agreements",
    ],
  },
  {
    name: "Family Law Basic",
    documents: [
      "Birth Certificate",
      "Marriage Certificate",
      "Financial Statements",
      "Tax Returns (2023)",
    ],
  },
  {
    name: "Comprehensive Litigation Package",
    documents: [
      "W2 Tax Form",
      "1098 Tax Return",
      "Bank Statements",
      "Employment Records",
      "Medical Records",
      "Insurance Documents",
      "Property Deeds",
      "Driver's License",
      "Social Security Card",
      "Birth Certificate",
      "Marriage Certificate",
      "Financial Statements",
      "Credit Reports",
      "Tax Returns (2023)",
      "Payroll Records",
      "Employment Verification Letter",
      "Wage and Hour Records",
      "Workers Compensation Claims",
      "Performance Reviews",
      "Contracts and Agreements",
    ],
  },
];

export function useDocumentSelection({
  availableDocuments = DEFAULT_AVAILABLE_DOCUMENTS,
  initialSelectedDocuments = [],
  savedTemplates = DEFAULT_SAVED_TEMPLATES,
}: UseDocumentSelectionProps = {}) {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>(initialSelectedDocuments);

  // Add document to selection
  const handleAddDocument = useCallback((docName: string) => {
    setSelectedDocuments(prev => {
      if (!prev.find(doc => doc.name === docName)) {
        return [...prev, { name: docName, optional: false }];
      }
      return prev;
    });
  }, []);

  // Remove document from selection
  const handleRemoveDocument = useCallback((docName: string) => {
    setSelectedDocuments(prev => prev.filter(doc => doc.name !== docName));
  }, []);

  // Toggle optional status of a document
  const handleToggleOptional = useCallback((docName: string) => {
    setSelectedDocuments(prev =>
      prev.map(doc =>
        doc.name === docName ? { ...doc, optional: !doc.optional } : doc
      )
    );
  }, []);

  // Clear all selected documents
  const handleClearAllDocuments = useCallback(() => {
    setSelectedDocuments([]);
  }, []);

  // Load template documents (simplified version for direct use)
  const handleLoadTemplate = useCallback((template: Template) => {
    const templateDocs = template.documents.map(name => ({
      name,
      optional: false,
    }));
    setSelectedDocuments(templateDocs);
  }, []);

  // Add multiple documents (useful for AI suggestions)
  const handleAddMultipleDocuments = useCallback((docNames: string[]) => {
    const newDocs = docNames
      .filter(name => !selectedDocuments.find(doc => doc.name === name))
      .map(name => ({ name, optional: false }));
    
    setSelectedDocuments(prev => [...prev, ...newDocs]);
  }, [selectedDocuments]);

  // Get document counts
  const getDocumentCounts = useCallback(() => {
    const required = selectedDocuments.filter(doc => !doc.optional).length;
    const optional = selectedDocuments.filter(doc => doc.optional).length;
    const total = selectedDocuments.length;
    
    return { required, optional, total };
  }, [selectedDocuments]);

  // Check if a document is selected
  const isDocumentSelected = useCallback((docName: string) => {
    return selectedDocuments.some(doc => doc.name === docName);
  }, [selectedDocuments]);

  return {
    // State
    selectedDocuments,
    availableDocuments,
    savedTemplates,

    // Actions
    handleAddDocument,
    handleRemoveDocument,
    handleToggleOptional,
    handleClearAllDocuments,
    handleLoadTemplate,
    handleAddMultipleDocuments,

    // Utilities
    getDocumentCounts,
    isDocumentSelected,
    setSelectedDocuments,
  };
}
