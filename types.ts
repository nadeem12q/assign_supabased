export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

export interface User {
  uid: string;
  username: string;
  email?: string;
  name: string;
  role: UserRole;
  phone?: string; // Added phone number for WhatsApp reminders
}

export interface Assignment {
  id: string;          // UUID from database
  subjectId: string;   // Subject code (e.g., HRM, CS101)
  title: string;       // Assignment title
  assignDate: string;  // Date given
  dueDate: string;     // Submission deadline
  description: string; // Instructions
  status: 'active' | 'inactive' | 'expired'; // Visibility (includes expired for display)
  folderName: string;  // Auto-generated folder name
  manualStatus?: 'active' | 'inactive' | null; // Admin override for status control
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedBy: string;
  uploadDate: string;
  assignmentId: string;
  status: 'pending' | 'graded';
  webViewLink?: string;
}

export interface Submission {
  submissionId: string;
  assignmentId?: string;
  studentUsername: string;
  studentName: string;
  subjectId: string;
  assignmentTitle: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  filePath?: string;
  uploadedAt: string;
  dueDate: string;
  status: 'submitted' | 'late' | 'graded' | 'returned';
}

export interface Subject {
  id: string;           // Subject code (e.g., "CS101", "HRM")
  name: string;         // Full subject name (e.g., "Data Structures", "HR Management")
  description?: string; // Optional description
  color?: string;       // Optional accent color for the subject
  createdAt: string;    // ISO date string
}

export interface AssignmentProgressItem {
  subjectId: string;
  title: string;
  dueDate: string;
  totalStudents: number;
  submittedCount: number;
  percentage: number;
  missingStudents: User[];
  submittedStudents: string[];
}

export interface DashboardStats {
  totalStudents: number;
  totalSubmissions: number;
  activeAssignments: number;
  submissionRate: number;
}