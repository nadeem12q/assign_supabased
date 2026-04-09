import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorSpotlight from './components/CursorSpotlight';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Skeleton, { SkeletonCard } from './components/Skeleton';
import { UserRole } from './types';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Upload = lazy(() => import('./pages/Upload'));
const Admin = lazy(() => import('./pages/Admin'));
const History = lazy(() => import('./pages/History'));
const Settings = lazy(() => import('./pages/Settings'));
const Subjects = lazy(() => import('./pages/Subjects'));
const AdminCreateAssignment = lazy(() => import('./pages/admin/CreateAssignment'));
const AdminManageSubjects = lazy(() => import('./pages/admin/ManageSubjects'));
const AdminAssignmentHistory = lazy(() => import('./pages/admin/AssignmentHistory'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Support = lazy(() => import('./pages/Support'));

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center p-8">
    <div className="w-full max-w-4xl space-y-4">
      <Skeleton className="h-8 w-48 mb-8" />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CursorSpotlight />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--glass)',
              color: 'var(--text-primary)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: 'var(--accent-green)',
                secondary: 'var(--bg-primary)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--accent-red)',
                secondary: 'var(--bg-primary)',
              },
            }
          }}
        />
        <Router>
          <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <Header />
            <main className="flex-grow">
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/support" element={<Support />} />

                    {/* Settings — accessible by both Student + Admin */}
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.ADMIN]}>
                          <Settings />
                        </ProtectedRoute>
                      }
                    />

                    {/* Student Routes */}
                    <Route
                      path="/upload"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                          <Upload />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/subjects"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                          <Subjects />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/history"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                          <History />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Routes */}
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                          <Admin />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/create-assignment"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                          <AdminCreateAssignment />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/subjects"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                          <AdminManageSubjects />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/history"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                          <AdminAssignmentHistory />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;