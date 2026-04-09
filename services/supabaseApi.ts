import { supabase } from '../src/lib/supabase';
import { User, UserRole, Assignment, Subject, Submission } from '../types';

// Timeout wrapper for Supabase calls
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number = 15000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Database operation timed out')), timeoutMs)
    )
  ]);
};

// ============ AUTH FUNCTIONS ============

export const signIn = async (email: string, password: string): Promise<User> => {
  type SignInResponse = { data: { user: any; session: any } | null; error: any };
  const { data, error } = await withTimeout<SignInResponse>(
    supabase.auth.signInWithPassword({ email, password }),
    20000
  );

  if (error) throw error;
  if (!data?.user) throw new Error('No user returned');

  // Get user profile with role
  type ProfileResponse = { data: any; error: any };
  const { data: profile, error: profileError } = await withTimeout<ProfileResponse>(
    supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single(),
    15000
  );

  if (profileError) throw profileError;

  return {
    uid: data.user.id,
    username: email.split('@')[0],
    email: data.user.email || email,
    name: profile?.name || email.split('@')[0],
    role: profile?.role === 'admin' ? UserRole.ADMIN : UserRole.STUDENT,
    phone: profile?.phone,
  };
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<User | null> => {
  type UserResponse = { data: { user: any } | null; error: any };
  const { data, error: userError } = await withTimeout<UserResponse>(
    supabase.auth.getUser(),
    10000
  );
  
  if (userError || !data?.user) return null;
  const user = data.user;

  type ProfileResponse = { data: any; error: any };
  const { data: profile, error } = await withTimeout<ProfileResponse>(
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single(),
    10000
  );

  if (error) return null;

  return {
    uid: user.id,
    username: user.email?.split('@')[0] || '',
    email: user.email || '',
    name: profile?.name || user.email?.split('@')[0] || '',
    role: profile?.role === 'admin' ? UserRole.ADMIN : UserRole.STUDENT,
    phone: profile?.phone,
  };
};

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// ============ SUBJECT FUNCTIONS ============

export const getSubjects = async (): Promise<Subject[]> => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) throw error;

  return data.map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description || undefined,
    color: s.color,
    createdAt: s.created_at,
  }));
};

export const getAllSubjects = async (): Promise<Subject[]> => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('name');

  if (error) throw error;

  return data.map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description || undefined,
    color: s.color,
    createdAt: s.created_at,
  }));
};

export const createSubject = async (subject: Omit<Subject, 'createdAt'>): Promise<Subject> => {
  const { data, error } = await supabase
    .from('subjects')
    .insert({
      id: subject.id,
      name: subject.name,
      description: subject.description || null,
      color: subject.color || '#8b5cf6',
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    name: data.name,
    description: data.description || undefined,
    color: data.color,
    createdAt: data.created_at,
  };
};

export const updateSubject = async (id: string, updates: Partial<Subject>): Promise<Subject> => {
  const { data, error } = await supabase
    .from('subjects')
    .update({
      name: updates.name,
      description: updates.description || null,
      color: updates.color,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    name: data.name,
    description: data.description || undefined,
    color: data.color,
    createdAt: data.created_at,
  };
};

export const deleteSubject = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// ============ ASSIGNMENT FUNCTIONS ============

export const getAssignments = async (): Promise<Assignment[]> => {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .order('due_date', { ascending: false });

  if (error) throw error;

  return data.map((a: any) => ({
    id: a.id,
    subjectId: a.subject_id,
    title: a.title,
    assignDate: a.assign_date,
    dueDate: a.due_date,
    description: a.description || '',
    status: a.status,
    folderName: a.folder_name || '',
    manualStatus: a.manual_status,
  }));
};

export const getAssignmentsBySubject = async (subjectId: string): Promise<Assignment[]> => {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('subject_id', subjectId)
    .order('due_date', { ascending: false });

  if (error) throw error;

  return data.map((a: any) => ({
    id: a.id,
    subjectId: a.subject_id,
    title: a.title,
    assignDate: a.assign_date,
    dueDate: a.due_date,
    description: a.description || '',
    status: a.status,
    folderName: a.folder_name || '',
    manualStatus: a.manual_status,
  }));
};

export const getAssignment = async (id: string): Promise<Assignment | null> => {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;

  return {
    id: data.id,
    subjectId: data.subject_id,
    title: data.title,
    assignDate: data.assign_date,
    dueDate: data.due_date,
    description: data.description || '',
    status: data.status,
    folderName: data.folder_name || '',
    manualStatus: data.manual_status,
  };
};

export const createAssignment = async (
  assignment: Omit<Assignment, 'id' | 'folderName'> & { subjectId: string }
): Promise<Assignment> => {
  // Generate folder name
  const sanitizedTitle = assignment.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const folderName = `${sanitizedTitle}_${assignment.assignDate}`;

  const { data, error } = await supabase
    .from('assignments')
    .insert({
      subject_id: assignment.subjectId,
      title: assignment.title,
      description: assignment.description || null,
      assign_date: assignment.assignDate,
      due_date: assignment.dueDate,
      status: assignment.status || 'active',
      folder_name: folderName,
      folder_path: `${assignment.subjectId}/${folderName}`,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    subjectId: data.subject_id,
    title: data.title,
    assignDate: data.assign_date,
    dueDate: data.due_date,
    description: data.description || '',
    status: data.status,
    folderName: data.folder_name || '',
    manualStatus: data.manual_status,
  };
};

export const updateAssignment = async (
  id: string,
  updates: Partial<Assignment>
): Promise<Assignment> => {
  const { data, error } = await supabase
    .from('assignments')
    .update({
      title: updates.title,
      description: updates.description,
      assign_date: updates.assignDate,
      due_date: updates.dueDate,
      status: updates.status,
      manual_status: updates.manualStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    subjectId: data.subject_id,
    title: data.title,
    assignDate: data.assign_date,
    dueDate: data.due_date,
    description: data.description || '',
    status: data.status,
    folderName: data.folder_name || '',
    manualStatus: data.manual_status,
  };
};

export const updateAssignmentStatus = async (
  id: string,
  status: 'active' | 'inactive'
): Promise<Assignment> => {
  return updateAssignment(id, { manualStatus: status });
};

export const deleteAssignment = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// ============ SUBMISSION FUNCTIONS ============

export const getSubmissions = async (assignmentId?: string): Promise<Submission[]> => {
  let query = supabase
    .from('submissions')
    .select(`
      *,
      assignments (
        title,
        subject_id
      )
    `);

  if (assignmentId) {
    query = query.eq('assignment_id', assignmentId);
  }

  const { data, error } = await query.order('submitted_at', { ascending: false });

  if (error) throw error;

  return data.map((s: any) => ({
    submissionId: s.id,
    assignmentId: s.assignment_id,
    studentUsername: s.student_username,
    studentName: s.student_name,
    subjectId: (s.assignments as any)?.subject_id || '',
    assignmentTitle: (s.assignments as any)?.title || '',
    fileName: s.original_filename,
    fileSize: formatFileSize(s.file_size || 0),
    fileUrl: s.file_url || '#',
    filePath: s.file_path || '',
    uploadedAt: s.submitted_at,
    dueDate: (s.assignments as any)?.due_date || '',
    status: s.status as Submission['status'],
  }));
};

export const getStudentSubmissions = async (studentId: string): Promise<Submission[]> => {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      assignments (
        title,
        subject_id,
        due_date
      )
    `)
    .eq('student_id', studentId)
    .order('submitted_at', { ascending: false });

  if (error) throw error;

  return data.map((s: any) => ({
    submissionId: s.id,
    assignmentId: s.assignment_id,
    studentUsername: s.student_username,
    studentName: s.student_name,
    subjectId: (s.assignments as any)?.subject_id || '',
    assignmentTitle: (s.assignments as any)?.title || '',
    fileName: s.original_filename,
    fileSize: formatFileSize(s.file_size || 0),
    fileUrl: s.file_url || '#',
    filePath: s.file_path || '',
    uploadedAt: s.submitted_at,
    dueDate: (s.assignments as any)?.due_date || '',
    status: s.status as Submission['status'],
  }));
};

export const getAllSubmissions = async (): Promise<Submission[]> => {
  return getSubmissions();
};

// ============ FILE UPLOAD FUNCTIONS ============

const BUCKET_NAME = import.meta.env.VITE_STORAGE_BUCKET || 'assignments';

export const uploadFile = async (
  file: File,
  subjectId: string,
  assignmentFolder: string,
  studentName: string
): Promise<{ path: string; url: string }> => {
  // Frontend already renamed file as: {studentName}_{original_filename}
  // Just sanitize spaces/special chars in the filename
  const sanitizedName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const originalFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storedFileName = `${sanitizedName}_${originalFileName}`;
  
  // Full path: subject/assignment_folder/student_filename
  // Example: HRM/HR_CaseStudy_2026-03-01/Ali_hrm_1st_task.pdf
  const filePath = `${subjectId}/${assignmentFolder}/${storedFileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  // Bucket is PRIVATE — use signed URL instead of public URL
  const { data: signedUrlData, error: signedError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(data.path, 60 * 60 * 24 * 7); // 7 days expiry

  if (signedError) throw signedError;

  return {
    path: data.path,
    url: signedUrlData.signedUrl,
  };
};

export const getSignedUrl = async (path: string, expiresIn: number = 3600): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
};

export const deleteFile = async (path: string): Promise<boolean> => {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) throw error;
  return true;
};

// ============ SUBMISSION CREATION ============

export const submitAssignment = async (
  file: File,
  assignmentId: string,
  subjectId: string,
  student: User
): Promise<Submission> => {
  // First get assignment details for folder name
  const assignment = await getAssignment(assignmentId);
  if (!assignment) throw new Error('Assignment not found');

  // Upload file
  const { path, url } = await uploadFile(
    file,
    subjectId,
    assignment.folderName,
    student.name
  );

  // Check if late
  const now = new Date();
  const dueDate = new Date(assignment.dueDate);
  const isLate = now > dueDate;

  // Create submission record
  const { data, error } = await supabase
    .from('submissions')
    .insert({
      assignment_id: assignmentId,
      student_id: student.uid,
      student_name: student.name,
      student_username: student.username,
      original_filename: file.name,
      stored_filename: path.split('/').pop(),
      file_path: path,
      file_url: url,
      file_size: file.size,
      file_type: file.type,
      status: isLate ? 'late' : 'submitted',
    })
    .select()
    .single();

  if (error) {
    // Try to clean up uploaded file
    await deleteFile(path).catch(() => {});
    throw error;
  }

  return {
    submissionId: data.id,
    studentUsername: data.student_username,
    studentName: data.student_name,
    subjectId,
    assignmentTitle: assignment.title,
    fileName: data.original_filename,
    fileSize: formatFileSize(data.file_size || 0),
    fileUrl: data.file_url || '#',
    uploadedAt: data.submitted_at,
    dueDate: assignment.dueDate,
    status: data.status as 'submitted' | 'late',
  };
};

// ============ ADMIN FUNCTIONS ============

export const getAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((p: any) => ({
    uid: p.id,
    username: p.email.split('@')[0],
    email: p.email,
    name: p.name || p.email.split('@')[0],
    role: p.role === 'admin' ? UserRole.ADMIN : UserRole.STUDENT,
    phone: p.phone,
  }));
};

export const updateUserRole = async (userId: string, role: 'admin' | 'student'): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) throw error;
};

export const getDashboardStats = async (): Promise<{
  totalStudents: number;
  totalSubmissions: number;
  activeAssignments: number;
  submissionRate: number;
}> => {
  // Get total students
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  // Get total submissions
  const { count: totalSubmissions } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true });

  // Get active assignments
  const { count: activeAssignments } = await supabase
    .from('assignments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  return {
    totalStudents: totalStudents || 0,
    totalSubmissions: totalSubmissions || 0,
    activeAssignments: activeAssignments || 0,
    submissionRate: 0, // Calculated in frontend
  };
};

// ============ STATUS HELPERS ============

export const isExpired = (assignment: Assignment): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(assignment.dueDate);
  return today > dueDate;
};

export const getDisplayStatus = (assignment: Assignment): 'active' | 'inactive' | 'expired' => {
  if (assignment.manualStatus) {
    return assignment.manualStatus;
  }
  if (isExpired(assignment)) {
    return 'expired';
  }
  return assignment.status;
};

export const getEffectiveStatus = (assignment: Assignment): 'active' | 'inactive' => {
  // If manual status is set, use it; otherwise use status (treating expired as inactive)
  const status = assignment.manualStatus || assignment.status;
  return status === 'active' ? 'active' : 'inactive';
};

export const toggleAssignmentStatus = async (assignmentId: string): Promise<Assignment | null> => {
  const assignment = await getAssignment(assignmentId);
  if (!assignment) return null;

  const currentEffective = getEffectiveStatus(assignment);
  const newStatus = currentEffective === 'active' ? 'inactive' : 'active';

  return updateAssignment(assignmentId, { manualStatus: newStatus });
};

// ============ HELPER FUNCTIONS ============

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
