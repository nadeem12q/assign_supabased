# 🎓 AssignPortal

A modern, full-featured College Assignment Submission Portal built with React, TypeScript, and Supabase. Streamlines assignment management for educational institutions with role-based access control, real-time submissions, comprehensive admin analytics, and stunning glassmorphism UI design.

## ✨ Features

### For Students
- **Assignment Dashboard**: View all active assignments with due dates and status
- **File Upload**: Submit assignments with drag-and-drop support (up to 50MB)
- **Submission History**: Track all past submissions with status (on-time, late, graded)
- **Subject Organization**: Filter assignments by subject/course
- **Real-time Updates**: Instant feedback on submission status
- **Mobile Responsive**: Fully responsive design for all devices

### For Administrators
- **Assignment Management**: Create, edit, and delete assignments
- **Subject Management**: Organize courses with custom colors and descriptions
- **Submission Tracking**: Monitor student submissions in real-time
- **Analytics Dashboard**: View submission rates, completion statistics, and activity charts
- **User Management**: Manage student and admin accounts
- **Progress Monitoring**: Track assignment completion rates per subject

### Technical Features
- **Role-Based Access Control**: Secure authentication with student/admin roles
- **Supabase Backend**: Scalable PostgreSQL database with real-time capabilities
- **Secure File Storage**: Private bucket with signed URLs for file access
- **PWA Support**: Install as a desktop/mobile app
- **Glassmorphism UI**: Modern, beautiful interface with smooth animations
- **Dark/Light Theme**: Automatic theme switching
- **Error Handling**: Comprehensive error boundaries and fallback UI
- **Code Splitting**: Lazy-loaded routes for optimal performance

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Routing**: React Router 6
- **State Management**: React Context API
- **Data Fetching**: SWR
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Animations**: Canvas Confetti
- **PWA**: Service Worker with offline support

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- A Supabase project (free tier works)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/nadeem12q/assign_supabased.git
cd assign_supabased
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
VITE_STORAGE_BUCKET=assignments
VITE_MAX_FILE_SIZE_MB=25
VITE_APP_MODE=supabase
```

4. **Set up Supabase database**

Run the SQL migration to create required tables:
```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subjects table
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#8b5cf6',
  folder_path TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assignments table
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assign_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  manual_status TEXT CHECK (manual_status IN ('active', 'inactive')),
  folder_name TEXT,
  folder_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Create submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_username TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  stored_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT,
  file_size BIGINT,
  file_type TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'late', 'graded', 'returned')),
  marks NUMERIC,
  feedback TEXT,
  graded_at TIMESTAMP WITH TIME ZONE,
  graded_by UUID REFERENCES profiles(id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('assignments', 'assignments', false);
```

5. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗 Project Structure

```
assign_supabased/
├── components/
│   ├── admin/           # Admin-specific components
│   │   ├── AssignmentHistoryModal.tsx
│   │   ├── AssignmentProgress.tsx
│   │   ├── CreateAssignmentModal.tsx
│   │   └── ...
│   ├── charts/          # Chart components
│   │   ├── ActivityLineChart.tsx
│   │   ├── OverviewCharts.tsx
│   │   └── StudentBarChart.tsx
│   ├── AssignmentSelector.tsx
│   ├── CursorSpotlight.tsx
│   ├── EmptyState.tsx
│   ├── ErrorBoundary.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── context/
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme management
├── hooks/
│   └── useAdminData.ts  # Admin data fetching hook
├── pages/
│   ├── admin/           # Admin pages
│   │   ├── AssignmentHistory.tsx
│   │   ├── CreateAssignment.tsx
│   │   └── ManageSubjects.tsx
│   ├── Admin.tsx        # Admin dashboard
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Authentication
│   ├── Upload.tsx       # Student upload page
│   ├── History.tsx      # Submission history
│   └── ...
├── services/
│   └── supabaseApi.ts   # Supabase API functions
├── src/
│   └── lib/
│       └── supabase.ts  # Supabase client
├── utils/
│   ├── adminHelpers.ts  # Admin utilities
│   └── audio.ts         # Audio utilities
├── types.ts             # TypeScript type definitions
├── config.ts            # App configuration
├── App.tsx              # Main app component
└── index.tsx            # Entry point
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Database Schema

### Profiles
User profiles with role-based access
- `id`: UUID (references auth.users)
- `email`: Unique email address
- `name`: Display name
- `role`: 'admin' or 'student'
- `phone`: Optional phone number

### Subjects
Course/subject management
- `id`: Subject code (e.g., "CS101")
- `name`: Full subject name
- `description`: Optional description
- `color`: Accent color for UI
- `is_active`: Active status

### Assignments
Assignment creation and management
- `id`: UUID
- `subject_id`: References subjects
- `title`: Assignment title
- `description`: Instructions
- `assign_date`: Date assigned
- `due_date`: Submission deadline
- `status`: 'active' or 'inactive'
- `manual_status`: Admin override
- `folder_name`: Auto-generated folder name

### Submissions
Student assignment submissions
- `id`: UUID
- `assignment_id`: References assignments
- `student_id`: References profiles
- `file_path`: Storage path
- `file_url`: Signed URL
- `status`: 'submitted', 'late', 'graded', 'returned'
- `marks`: Optional grade
- `feedback`: Optional feedback

## 🔐 Security

- **Row Level Security (RLS)**: Enabled on all tables
- **Signed URLs**: Files accessed via time-limited signed URLs
- **Private Storage Bucket**: No public file access
- **Role-Based Access**: Strict role enforcement on routes
- **Environment Variables**: Sensitive keys never committed

## 🌐 Deployment

The project is configured for easy deployment:

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import project from GitHub
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**NADEEM**

- GitHub: [@nadeem12q](https://github.com/nadeem12q)
- Repository: [assign_supabased](https://github.com/nadeem12q/assign_supabased)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons and UI components from various open-source libraries

## 📞 Support

For issues, questions, or contributions, please visit the [GitHub Issues](https://github.com/nadeem12q/assign_supabased/issues) page.