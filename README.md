# 🎓 AssignPortal

A modern **College Assignment Submission Portal** built with React, TypeScript, and Supabase. Features role-based access control, real-time submissions, admin analytics, and a glassmorphism UI.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.99-3ECF8E?logo=supabase)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)

---

## ✨ Features

**Students:** Browse subjects, view assignments, upload files (max 25MB), track submission history  
**Admins:** Create subjects/assignments, monitor submissions, view analytics dashboard, manage students  
**UI:** Glassmorphism design, dark/light mode, PWA support, responsive layout

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (Auth + PostgreSQL + Storage)
- **Libraries:** SWR, Recharts, Lucide React

---

## 🚀 Quick Start

```bash
# 1. Clone & install
git clone https://github.com/nadeem12q/assign_supabased.git
cd AssignPortal-Supa
npm install

# 2. Set up Supabase project & copy credentials
#    - Create project at supabase.com
#    - Create storage bucket: "assignments"
#    - Run database schema (see below)

# 3. Configure environment
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# 4. Start dev server
npm run dev
```

App runs at `http://localhost:5173`

---

## 🗄️ Database Schema

```sql
-- Profiles (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('student', 'admin')) DEFAULT 'student',
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#8b5cf6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignments
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id TEXT REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT,
  assign_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'active',
  folder_name TEXT,
  folder_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id),
  student_id UUID REFERENCES profiles(id),
  file_name TEXT NOT NULL,
  file_size BIGINT,
  file_path TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'submitted',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Auto-create profile on signup:**
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role, created_at)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), 
          COALESCE(NEW.raw_user_meta_data->>'role', 'student'), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon public key |
| `VITE_STORAGE_BUCKET` | ❌ | Storage bucket name (default: `assignments`) |
| `VITE_MAX_FILE_SIZE_MB` | ❌ | Max upload size (default: `25`) |

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # Auth & Theme contexts
├── hooks/          # Custom React hooks
├── pages/          # Route pages
├── services/       # Supabase API functions
├── lib/            # Supabase client config
└── types.ts        # TypeScript types
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/amazing-feature`
3. Make changes & test
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

---

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file.
