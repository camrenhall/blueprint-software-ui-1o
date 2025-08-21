import { describe, it, expect } from 'vitest';
import { filterCases, sortCases, getStatusColors, convertLegacyCase } from './utils';
import { Case, CaseStatus } from './types';

const mockCases: Case[] = [
  {
    id: "#CASE1",
    name: "John Doe",
    caseId: "#CASE1",
    status: "Needs Review",
    progress: "3/3 Complete",
    progressPercent: 100,
    lastActivity: "1 hour ago",
    queueDays: 5,
    avatar: "JD"
  },
  {
    id: "#CASE2",
    name: "Jane Smith",
    caseId: "#CASE2",
    status: "Awaiting Documents",
    progress: "2/4 Complete",
    progressPercent: 50,
    lastActivity: "2 hours ago",
    queueDays: 10,
    avatar: "JS"
  },
  {
    id: "#CASE3",
    name: "Bob Wilson",
    caseId: "#CASE3",
    status: "Complete",
    progress: "5/5 Complete",
    progressPercent: 100,
    lastActivity: "1 day ago",
    queueDays: 3,
    avatar: "BW"
  }
];

describe('filterCases', () => {
  it('should filter by search query (name)', () => {
    const result = filterCases(mockCases, "john", []);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });

  it('should filter by search query (case ID)', () => {
    const result = filterCases(mockCases, "#CASE2", []);
    expect(result).toHaveLength(1);
    expect(result[0].caseId).toBe("#CASE2");
  });

  it('should filter by status filter', () => {
    const result = filterCases(mockCases, "", ["needs-review"]);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("Needs Review");
  });

  it('should filter by multiple status filters', () => {
    const result = filterCases(mockCases, "", ["needs-review", "awaiting-docs"]);
    expect(result).toHaveLength(2);
  });

  it('should combine search and filter', () => {
    const result = filterCases(mockCases, "jane", ["awaiting-docs"]);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Jane Smith");
  });

  it('should return all cases when no filters applied', () => {
    const result = filterCases(mockCases, "", []);
    expect(result).toHaveLength(3);
  });

  it('should be case insensitive', () => {
    const result = filterCases(mockCases, "JOHN", []);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });
});

describe('sortCases', () => {
  it('should prioritize "Needs Review" cases first', () => {
    const result = sortCases(mockCases);
    expect(result[0].status).toBe("Needs Review");
  });

  it('should prioritize "Awaiting Documents" cases second', () => {
    const result = sortCases(mockCases);
    const awaitingDocsIndex = result.findIndex(c => c.status === "Awaiting Documents");
    const completeIndex = result.findIndex(c => c.status === "Complete");
    expect(awaitingDocsIndex).toBeLessThan(completeIndex);
  });

  it('should sort by queue days within same status', () => {
    const casesWithSameStatus: Case[] = [
      { ...mockCases[0], queueDays: 3 },
      { ...mockCases[0], id: "#CASE4", queueDays: 7 }
    ];
    const result = sortCases(casesWithSameStatus);
    expect(result[0].queueDays).toBe(7); // Higher queue days first
  });

  it('should not mutate original array', () => {
    const original = [...mockCases];
    sortCases(mockCases);
    expect(mockCases).toEqual(original);
  });
});

describe('getStatusColors', () => {
  it('should return correct colors for "Needs Review"', () => {
    const colors = getStatusColors("Needs Review");
    expect(colors.dot).toContain("C5BFEE");
  });

  it('should return correct colors for "Awaiting Documents"', () => {
    const colors = getStatusColors("Awaiting Documents");
    expect(colors.dot).toContain("99C0F0");
  });

  it('should return correct colors for "Complete"', () => {
    const colors = getStatusColors("Complete");
    expect(colors.dot).toContain("C1D9F6");
  });
});

describe('convertLegacyCase', () => {
  it('should convert legacy format correctly', () => {
    const legacy = {
      name: "Test User",
      caseId: "#TEST123",
      status: "Needs Review",
      progress: "3/3 Complete",
      progressPercent: 100,
      lastActivity: "1 hour ago",
      queueTime: "5 Days",
      avatar: "TU"
    };

    const result = convertLegacyCase(legacy);
    
    expect(result.id).toBe("#TEST123");
    expect(result.name).toBe("Test User");
    expect(result.queueDays).toBe(5);
    expect(result.status).toBe("Needs Review");
  });

  it('should handle missing queueTime', () => {
    const legacy = {
      name: "Test User",
      caseId: "#TEST123",
      status: "Complete",
      progress: "3/3 Complete",
      progressPercent: 100,
      lastActivity: "1 hour ago",
      avatar: "TU"
    };

    const result = convertLegacyCase(legacy);
    expect(result.queueDays).toBe(0);
  });
});
