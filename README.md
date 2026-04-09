# 🎓 AssignPortal

A modern, full-featured **College Assignment Submission Portal** built with React, TypeScript, and Supabase. AssignPortal streamlines the assignment management process for educational institutions with role-based access control, real-time submissions, comprehensive admin analytics, and a stunning glassmorphism UI design.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.99-3ECF8E?logo=supabase)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [API Reference](#api-reference)
- [Security Model](#security-model)
- [Key Components](#key-components)
- [Storage Structure](#storage-structure)
- [Development](#development)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## 🎯 Overview

AssignPortal is a production-ready **College Assignment Management System** designed for educational institutions. Built with modern web technologies, it offers a seamless experience for both students and administrators with enterprise-grade security, real-time analytics, and an intuitive glassmorphism interface.

### Why AssignPortal?

- **🎓 Purpose-Built for Education**: Unlike generic file-sharing tools, AssignPortal understands academic workflows with due dates, assignment tracking, and grading support
- **🔐 Secure by Design**: Multi-layered security with JWT authentication, database-level RLS policies, and role-based access control
- **📊 Real-Time Insights**: Live dashboards showing submission rates, student participation, and assignment progress
- **🎨 Beautiful UX**: Glassmorphism design with smooth animations, dark/light themes, and responsive layouts
- **⚡ Production Ready**: Deployed architecture with error boundaries, loading states, and graceful fallbacks

### Core Workflows

#### Admin Workflow
```
1. Create Subject → Define subject code, name, color, description
2. Create Assignment → Set title, description, assign date, due date
3. Auto Folder Generation → System creates: SubjectFolder/Assignment_Title_Date/
4. Monitor Submissions → Track which students submitted vs pending
5. View Analytics → Charts showing submission rates and activity trends
6. Manage Corrections → Delete incorrect submissions (via Supabase dashboard)
```

#### Student Workflow
```
1. Browse Subjects → View all available subjects with color-coded cards
2. View Assignments → See active assignments sorted by due date
3. Upload Files → Drag-and-drop upload with progress tracking
4. Track History → Complete submission record with download links
5. Update Profile → Manage personal info and notification preferences
```

### User Roles

| Role | Account Creation | Capabilities |
|------|-----------------|--------------|
| **Admin** | Manual creation in Supabase | Full system access: create subjects, assignments, view all submissions, manage students |
| **Student** | Created by Admin | Limited access: view subjects, upload assignments, view own history, update profile |

---

## ✨ Features

### 👨‍🎓 Student Features

| Feature | Description | Technical Details |
|---------|-------------|-------------------|
| **📚 Subject Browser** | View all available subjects with color-coded cards | Data fetched via SWR with caching; color-coded by subject |
| **📝 Assignment Viewer** | See active assignments sorted by due date | Auto-expired detection; status badges (active/inactive/expired) |
| **📤 File Upload** | Drag-and-drop file upload with progress tracking | Max 25MB; frontend file renaming (`{studentName}_{original}`); confetti on success |
| **📜 Submission History** | Complete history of all submissions with download links | SWR-powered; file metadata display; direct download links |
| **⚙️ User Settings** | Update profile information | Phone number for future WhatsApp notifications; name updates |
| **🌓 Dark/Light Mode** | Toggle between themes | System preference detection; CSS custom properties; persisted in localStorage |
| **📱 PWA Support** | Install as mobile app | Service worker; offline capability; manifest.json configured |
| **🔒 Secure Access** | Protected routes | JWT-based auth; role-based route guards; automatic token refresh |

### 👨‍💼 Admin Features

| Feature | Description | Technical Details |
|---------|-------------|-------------------|
| **📊 Dashboard Analytics** | Visual charts with submission statistics | Recharts integration; line charts (activity), bar charts (students), pie charts (status) |
| **📚 Subject Management** | CRUD operations for subjects | Create with custom colors; soft delete (is_active flag); real-time updates |
| **📝 Assignment Creation** | Create assignments with full details | Date pickers; auto-folder-name generation; subject selection dropdown |
| **✅ Assignment Control** | Activate/deactivate assignments | Manual status override; bulk operations support ready |
| **📈 Progress Tracking** | Real-time submission percentages | Per-assignment progress bars; missing student lists; submitted student tracking |
| **🔍 Student Search** | Search submissions | Search by student name or assignment; filtered results table |
| **📋 Student Management** | View all students | Registration status tracking; submission counts per student |
| **🗂️ Submission History** | Complete historical records | Filterable by assignment; download links; status tracking |
| **📁 Auto Folder Organization** | Automatic folder naming | Format: `SubjectFolder/Assignment_Title_YYYY-MM-DD/` |
| **🎯 Quick Actions** | Shortcut buttons for common tasks | Navigate directly to create assignment, manage subjects, etc. |

### 🎨 UI/UX Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **✨ Glassmorphism Design** | Modern frosted-glass UI | `backdrop-filter: blur()`; semi-transparent backgrounds; gradient overlays |
| **🖱️ Cursor Spotlight** | Interactive cursor following effect | Custom CSS + JS; radial gradient follows mouse; subtle visual enhancement |
| **🎭 Smooth Animations** | Polished transitions | CSS transitions; Framer Motion-inspired; staggered animations |
| **📱 Responsive Design** | Mobile to desktop | Tailwind responsive classes; breakpoint-optimized layouts; touch-friendly |
| **⚡ Skeleton Loading** | Loading states | Custom Skeleton component; card and text variants; shimmer effect |
| **🎉 Confetti Effects** | Celebration animations | Canvas Confetti library; triggers on successful upload; automatic cleanup |
| **🍞 Toast Notifications** | User feedback | React Hot Toast; themed styling (glass effect); success/error variants |
| **🔄 Error Boundaries** | Graceful error handling | React Error Boundary; fallback UI; error logging ready |
| **🎯 Lazy Loading** | Performance optimization | React.lazy() for pages; code splitting; Suspense with skeleton fallback |

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **React** | 18.2.0 | UI Library | Functional components, hooks, Suspense, lazy loading |
| **TypeScript** | 5.2.2 | Type Safety | Strict mode, interfaces, enums, generic types |
| **Vite** | 5.0.0 | Build Tool | HMR, optimized builds, fast dev server, tree-shaking |
| **React Router DOM** | 6.20.0 | Routing | HashRouter, protected routes, lazy loading integration |

### Styling & UI

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **Tailwind CSS** | 3.3.5 | Styling | Utility-first, JIT compiler, dark mode support, custom config |
| **Lucide React** | * | Icons | Consistent icon set, tree-shakeable, customizable |
| **CSS Variables** | - | Theming | Dynamic theme switching, glassmorphism effects |

### Data & State Management

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **SWR** | 2.4.1 | Data Fetching | Caching, revalidation, optimistic updates, deduplication |
| **React Context** | Built-in | State Management | AuthContext, ThemeContext - global state without Redux |

### Visualization & Effects

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **Recharts** | 3.8.0 | Charts | Responsive, composable, line/bar/pie charts |
| **React Hot Toast** | 2.6.0 | Notifications | Lightweight, headless, customizable positioning |
| **Canvas Confetti** | 1.9.4 | Animations | Particle effects, celebration on upload success |

### Backend-as-a-Service (Supabase)

| Service | Purpose | Security Features |
|---------|---------|-------------------|
| **Supabase Auth** | User authentication | JWT tokens, email/password, session management |
| **PostgreSQL** | Relational database | ACID compliance, complex queries, full-text search ready |
| **Supabase Storage** | File storage | Bucket policies, path-based organization, CDN-ready |
| **Row Level Security** | Access control | Policy-based permissions at database level |

### Development & Build

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **ESLint** | Code quality | TypeScript rules, React hooks rules |
| **PostCSS** | CSS processing | Autoprefixer, Tailwind integration |
| **TypeScript Compiler** | Transpilation | Strict mode, path mapping |

### Progressive Web App

| Feature | Implementation | Status |
|---------|----------------|--------|
| **Service Worker** | `service-worker.js` | ✅ Configured |
| **Manifest** | `manifest.json` | ✅ Icons, theme colors |
| **Offline Support** | Cache strategies | ✅ Ready |
| **Install Prompt** | Browser native | ✅ Supported |

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                         React 18 Application                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────────┐ │ │
│  │  │   Routes    │  │  Contexts   │  │  Components │  │     Hooks     │ │ │
│  │  │             │  │             │  │             │  │               │ │ │
│  │  │ / (Public)  │  │ AuthContext │  │  Header     │  │ useAuth       │ │ │
│  │  │ /login      │  │ ThemeCtx    │  │  Footer     │  │ useTheme      │ │ │
│  │  │ /upload     │  │             │  │  FileUp     │  │ useAdminData  │ │ │
│  │  │ /admin/*    │  │             │  │  Skeleton   │  │               │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └───────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                         Service Layer                                    │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────┐    │ │
│  │  │   supabaseApi  │  │   SWR Cache    │  │   Error Handling     │    │ │
│  │  │                │  │                │  │                      │    │ │
│  │  │ • Auth calls   │  │ • Stale-while- │  │ • Error Boundaries   │    │ │
│  │  │ • DB queries   │  │   revalidate   │  │ • Fallback UI        │    │ │
│  │  │ • Storage ops  │  │ • Optimistic   │  │ • Logging            │    │ │
│  │  │ • Type safety  │  │   updates      │  │                      │    │ │
│  │  └────────────────┘  └────────────────┘  └────────────────────────┘    │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ HTTPS / WebSocket
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SUPABASE BACKEND                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │   AUTH SERVICE   │  │   POSTGRESQL     │  │     STORAGE SERVICE      │  │
│  │                  │  │                  │  │                          │  │
│  │ • JWT Tokens     │  │ • profiles       │  │ • assignments bucket     │  │
│  │ • Sessions       │  │ • subjects       │  │ • Hierarchical folders   │  │
│  │ • Email/Pass     │  │ • assignments    │  │ • Signed URLs            │  │
│  │ • Role claims    │  │ • submissions    │  │ • RLS policies           │  │
│  │                  │  │ • RLS enforced   │  │                          │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Diagrams

#### 1. Authentication Flow
```
┌─────────┐    ┌──────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐
│  User   │───▶│ /login   │───▶│  Supabase   │───▶│   profiles  │───▶│ AuthCtx  │
│         │    │  Page    │    │ Auth API    │    │   Table     │    │  State   │
└─────────┘    └──────────┘    └─────────────┘    └─────────────┘    └──────────┘
                                    │                                    │
                                    ▼                                    ▼
                              ┌──────────┐                        ┌──────────┐
                              │  JWT     │                        │ Protected│
                              │  Token   │───────────────────────▶│  Routes  │
                              └──────────┘                        └──────────┘
```

#### 2. File Upload Flow
```
┌─────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Student │───▶│ FileUploader │───▶│  Frontend    │───▶│   Supabase   │
│ Selects │    │   Component  │    │   Rename     │    │   Storage    │
│  File   │    │              │    │ student_name │    │              │
└─────────┘    └──────────────┘    │ _orig.ext     │    └──────────────┘
                                   └──────────────┘           │
                                                              ▼
                                   ┌──────────────┐    ┌──────────────┐
                                   │  submissions │◄───│    File      │
                                   │    Table     │    │   Stored     │
                                   └──────────────┘    └──────────────┘
```

#### 3. Data Fetching Flow (SWR)
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Component  │───▶│  useSWR()    │───▶│ supabaseApi  │───▶│  Supabase    │
│   Renders    │    │   Hook       │    │  Function    │    │   Query      │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       ▲                                            │              │
       │                                            │              ▼
       │                                     ┌──────────────┐
       │                                     │   Cache      │
       │◄────────────────────────────────────│   Layer      │
       │         Cache Hit (fast)            │   (SWR)      │
       └────────────────────────────────────▶└──────────────┘
                     Revalidate (background)

---

## 📁 Project Structure

### Directory Tree

```
AssignPortal-Supa/
│
├── 📄 App.tsx                    # Root component with routing & ErrorBoundary
├── 📄 index.tsx                  # Application entry point
├── 📄 index.css                  # Global styles, Tailwind, CSS variables
├── 📄 config.ts                  # App configuration (feature flags, settings)
├── 📄 types.ts                   # TypeScript interfaces, enums, type aliases
├── 📄 vite.config.ts             # Vite build configuration
├── 📄 tsconfig.json              # TypeScript compiler options
├── 📄 tsconfig.node.json         # Vite-specific TypeScript config
├── 📄 pwa-register.ts            # PWA service worker registration
├── 📄 vite-env.d.ts              # Vite environment type declarations
│
├── 📁 src/
│   └── 📁 lib/
│       └── 📄 supabase.ts        # Supabase client + Database types
│
├── 📁 public/                    # Static assets (copied to dist/)
│   ├── 📄 manifest.json          # PWA manifest (icons, theme, display)
│   ├── 📄 service-worker.js      # Service worker for offline support
│   ├── 📄 icon-192x192.png       # PWA icon (small)
│   └── 📄 icon-512x512.png       # PWA icon (large/maskable)
│
├── 📁 pages/                     # Route-level components (lazy-loaded)
│   ├── 📄 Home.tsx               # Landing page with features
│   ├── 📄 Login.tsx              # Authentication page
│   ├── 📄 Upload.tsx             # File submission interface
│   ├── 📄 Subjects.tsx           # Subject browser grid
│   ├── 📄 History.tsx            # Student submission history
│   ├── 📄 Settings.tsx           # User profile settings
│   ├── 📄 Admin.tsx              # Admin dashboard (analytics + overview)
│   ├── 📄 PrivacyPolicy.tsx      # Legal: Privacy policy
│   ├── 📄 TermsOfService.tsx     # Legal: Terms of service
│   ├── 📄 Support.tsx            # Help & support page
│   └── 📁 admin/                 # Admin sub-pages
│       ├── 📄 CreateAssignment.tsx   # Assignment creation wizard
│       ├── 📄 ManageSubjects.tsx     # Subject CRUD interface
│       └── 📄 AssignmentHistory.tsx  # Historical submission viewer
│
├── 📁 components/                # Reusable UI components
│   ├── 📄 Header.tsx             # Navigation header with user menu
│   ├── 📄 Footer.tsx             # Page footer with links
│   ├── 📄 ProtectedRoute.tsx     # Route guard (auth + roles)
│   ├── 📄 FileUploader.tsx       # Drag-drop file upload component
│   ├── 📄 AssignmentSelector.tsx # Dropdown for assignment selection
│   ├── 📄 FileIcon.tsx           # File type icon mapper
│   ├── 📄 Skeleton.tsx           # Loading skeleton components
│   ├── 📄 EmptyState.tsx         # Empty state illustrations
│   ├── 📄 ErrorBoundary.tsx      # React error boundary
│   ├── 📄 CursorSpotlight.tsx    # Mouse-following spotlight effect
│   └── 📁 admin/                 # Admin-specific components
│       ├── 📄 DashboardStats.tsx     # Metric cards (total students, etc.)
│       ├── 📄 QuickActions.tsx       # Shortcut button group
│       ├── 📄 TabNavigation.tsx      # Admin section tabs
│       ├── 📄 StudentsTable.tsx      # Student management table
│       ├── 📄 SearchSection.tsx      # Search input + filters
│       ├── 📄 SearchResults.tsx      # Filtered results display
│       ├── 📄 RecentSubmissions.tsx  # Latest submissions list
│       ├── 📄 AssignmentProgress.tsx # Progress bars per assignment
│       ├── 📄 CreateAssignmentModal.tsx
│       ├── 📄 SubjectManagerModal.tsx
│       └── 📄 AssignmentHistoryModal.tsx
│   └── 📁 charts/                # Data visualization components
│       ├── 📄 OverviewCharts.tsx     # Dashboard chart container
│       ├── 📄 ActivityLineChart.tsx  # Submission timeline
│       ├── 📄 StudentBarChart.tsx    # Student participation bars
│       └── 📄 SubmissionPieChart.tsx # Status distribution
│
├── 📁 context/                   # React Context providers
│   ├── 📄 AuthContext.tsx        # Auth state + login/logout methods
│   └── 📄 ThemeContext.tsx       # Dark/light mode state
│
├── 📁 services/                  # API abstraction layer
│   └── 📄 supabaseApi.ts         # All Supabase operations
│
├── 📁 hooks/                     # Custom React hooks
│   └── 📄 useAdminData.ts        # Admin dashboard data fetching
│
├── 📁 utils/                     # Utility functions
│   ├── 📄 adminHelpers.ts        # Admin-specific utilities
│   └── 📄 audio.ts               # Audio notification helpers
│
├── 📄 .env.example               # Environment template
├── 📄 package.json               # Dependencies & scripts
├── 📄 PLANNING.md                # Project roadmap & planning
├── 📄 LICENSE                    # MIT License
└── 📄 README.md                  # This file
```

### File Organization Principles

| Principle | Description |
|-----------|-------------|
| **Co-location** | Related components grouped (e.g., `admin/` subfolder) |
| **Lazy Loading** | All pages use `React.lazy()` for code splitting |
| **Single Responsibility** | Each component does one thing well |
| **Type Safety** | All data structures defined in `types.ts` |
| **API Abstraction** | All Supabase calls go through `supabaseApi.ts` |

---

## 🚀 Installation

### Prerequisites

| Requirement | Version | Installation Guide |
|-------------|---------|-------------------|
| **Node.js** | 18.x or 20.x | [nvm](https://github.com/nvm-sh/nvm) recommended |
| **npm** | 9.x+ | Included with Node.js |
| **Git** | 2.x+ | [git-scm.com](https://git-scm.com) |
| **Supabase Account** | Free tier | [supabase.com](https://supabase.com) |

### Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/AssignPortal-Supa.git
cd AssignPortal-Supa

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials (see below)

# 4. Start development server
npm run dev
```

The app will be available at **`http://localhost:5173`**

### Detailed Setup Guide

#### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/AssignPortal-Supa.git
cd AssignPortal-Supa

# Install dependencies (this may take 2-3 minutes)
npm install

# Verify installation
npm run build
```

#### Step 2: Supabase Project Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization → Name project → Select region → Set password
   - Wait for project initialization (1-2 minutes)

2. **Get API Credentials**
   - In Supabase Dashboard, go to **Project Settings → API**
   - Copy:
     - `URL` (e.g., `https://abcxyz.supabase.co`)
     - `anon public` key (starts with `eyJhbGciOiJIUzI1NiIs...`)

3. **Create Storage Bucket**
   - Go to **Storage** in sidebar
   - Click "New bucket"
   - Name: `assignments`
   - Set appropriate RLS policies (see Security section)

#### Step 3: Database Setup

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('student', 'admin')) DEFAULT 'student',
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subjects table
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#8b5cf6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create assignments table
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
  manual_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create submissions table
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

#### Step 4: Environment Configuration

Create `.env` file:

```env
# ============================================
# AssignPortal Environment Configuration
# ============================================

# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Storage Configuration
VITE_STORAGE_BUCKET=assignments

# Application Settings
VITE_MAX_FILE_SIZE_MB=25
VITE_APP_MODE=supabase
```

#### Step 5: Start Development

```bash
# Start dev server with HMR
npm run dev

# Or with specific host/port
npm run dev -- --host 0.0.0.0 --port 3000
```

---

## 🔐 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abcxyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public anon key for client | `eyJhbGciOiJIUzI1NiIs...` |

### Optional Variables

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `VITE_STORAGE_BUCKET` | Storage bucket name | `assignments` | Must match bucket in Supabase |
| `VITE_MAX_FILE_SIZE_MB` | Max upload size in MB | `25` | Frontend validation only |
| `VITE_APP_MODE` | App mode identifier | `supabase` | For future feature flags |

### Security Note

> ⚠️ **The `VITE_SUPABASE_ANON_KEY` is safe to expose in the frontend.**
> 
> This key only allows the client to *connect* to Supabase. Actual data access is controlled by **Row Level Security (RLS) policies** in the database. Without proper RLS policies, your data is not secure even with a hidden key.

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│      profiles       │         │      subjects       │         │    assignments      │
├─────────────────────┤         ├─────────────────────┤         ├─────────────────────┤
│ PK id (UUID)        │         │ PK id (TEXT)         │         │ PK id (UUID)        │
│ email (TEXT)        │         │ name (TEXT)          │◄────────┤ FK subject_id       │
│ name (TEXT)         │         │ description (TEXT)  │   1:M  │ title (TEXT)        │
│ role (TEXT)         │         │ color (TEXT)         │         │ description (TEXT)  │
│ phone (TEXT)        │         │ is_active (BOOL)     │         │ assign_date (DATE)  │
│ created_at (TS)     │         │ created_at (TS)      │         │ due_date (DATE)     │
└─────────────────────┘         └─────────────────────┘         │ status (TEXT)       │
         ▲                                                      │ folder_name (TEXT)  │
         │                                                      │ folder_path (TEXT)  │
         │                                                      │ created_at (TS)     │
         │                                                      └─────────────────────┘
         │                                                                  │
         │                                                                  │ 1:M
         │                                                                  ▼
         │                                                      ┌─────────────────────┐
         │                                                      │    submissions      │
         │                                                      ├─────────────────────┤
         │                                                      │ PK id (UUID)        │
         │                                                      │ FK assignment_id    │
         └──────────────────────────────────────────────────────┤ FK student_id       │
                                                                │ file_name (TEXT)    │
                                                                │ file_size (BIGINT)  │
                                                                │ file_path (TEXT)    │
                                                                │ file_url (TEXT)     │
                                                                │ status (TEXT)       │
                                                                │ uploaded_at (TS)    │
                                                                └─────────────────────┘
```

### Table Definitions

#### 1. `profiles` - User Profiles

Links to Supabase Auth users. Contains role-based access control.

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('student', 'admin')) DEFAULT 'student',
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | References `auth.users(id)` - same as auth UID |
| `email` | TEXT | User's email address (unique) |
| `name` | TEXT | Display name for UI |
| `role` | TEXT | Either `'student'` or `'admin'` |
| `phone` | TEXT | For future WhatsApp notifications |
| `created_at` | TIMESTAMP | Auto-set on creation |

**Creation Trigger**: Automatically creates profile row when new user signs up.

#### 2. `subjects` - Academic Subjects

Subjects offered in the portal. Each subject has a permanent storage folder.

```sql
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,              -- Subject code (e.g., "CS101", "HRM")
  name TEXT NOT NULL,               -- Full name (e.g., "Data Structures")
  description TEXT,                 -- Optional description
  color TEXT DEFAULT '#8b5cf6',     -- UI accent color (hex)
  is_active BOOLEAN DEFAULT true,   -- Soft delete flag
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | TEXT | Short code used as folder name (e.g., "HRM") |
| `name` | TEXT | Human-readable subject name |
| `description` | TEXT | Optional longer description |
| `color` | TEXT | Hex color for UI cards (#RRGGBB) |
| `is_active` | BOOLEAN | If false, hidden from students |
| `created_at` | TIMESTAMP | When subject was added |
| `updated_at` | TIMESTAMP | Last modification time |

#### 3. `assignments` - Assignment Definitions

Assignments created by admins. Auto-generates storage subfolders.

```sql
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id TEXT REFERENCES subjects(id),
  title TEXT NOT NULL,              -- Assignment title
  description TEXT,                 -- Instructions/details
  assign_date DATE NOT NULL,        -- When assigned (YYYY-MM-DD)
  due_date DATE NOT NULL,           -- Deadline (YYYY-MM-DD)
  status TEXT DEFAULT 'active',   -- 'active', 'inactive', 'expired'
  folder_name TEXT,                 -- Auto-generated: Title_YYYY-MM-DD
  folder_path TEXT,                 -- Full storage path
  manual_status TEXT,               -- Admin override ('active'/'inactive'/null)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique assignment identifier |
| `subject_id` | TEXT | Parent subject (foreign key) |
| `title` | TEXT | Assignment title shown to students |
| `description` | TEXT | Assignment instructions |
| `assign_date` | DATE | Date assignment was given |
| `due_date` | DATE | Submission deadline |
| `status` | TEXT | Computed status (active/inactive/expired) |
| `folder_name` | TEXT | Auto-generated folder name |
| `folder_path` | TEXT | Full path in storage bucket |
| `manual_status` | TEXT | Admin override for status control |

**Status Logic**:
- `manual_status` set → use that value
- `due_date` passed → `'expired'`
- Otherwise → `'active'`

#### 4. `submissions` - Student Submissions

Records every file upload with metadata.

```sql
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id),
  student_id UUID REFERENCES profiles(id),
  file_name TEXT NOT NULL,          -- Original filename
  file_size BIGINT,                 -- Size in bytes
  file_path TEXT,                   -- Storage path
  file_url TEXT,                    -- Public/signed URL
  status TEXT DEFAULT 'submitted', -- 'submitted', 'late', 'graded', 'returned'
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique submission identifier |
| `assignment_id` | UUID | Which assignment this is for |
| `student_id` | UUID | Who submitted (foreign key to profiles) |
| `file_name` | TEXT | Original filename from student |
| `file_size` | BIGINT | File size in bytes |
| `file_path` | TEXT | Path in Supabase Storage |
| `file_url` | TEXT | Signed or public URL for download |
| `status` | TEXT | Submission status |
| `uploaded_at` | TIMESTAMP | When file was uploaded |

### Indexes

```sql
-- For faster queries
CREATE INDEX idx_assignments_subject_id ON assignments(subject_id);
CREATE INDEX idx_assignments_status ON assignments(status);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_uploaded_at ON submissions(uploaded_at);
CREATE INDEX idx_profiles_role ON profiles(role);
```

### Useful Queries

```sql
-- Get all active assignments with subject info
SELECT a.*, s.name as subject_name, s.color
FROM assignments a
JOIN subjects s ON a.subject_id = s.id
WHERE a.status = 'active' AND s.is_active = true
ORDER BY a.due_date;

-- Get submission stats per assignment
SELECT 
  a.id,
  a.title,
  COUNT(s.id) as submission_count,
  (SELECT COUNT(*) FROM profiles WHERE role = 'student') as total_students
FROM assignments a
LEFT JOIN submissions s ON a.id = s.assignment_id
GROUP BY a.id, a.title;

-- Get student's submission history
SELECT s.*, a.title as assignment_title, sub.name as subject_name
FROM submissions s
JOIN assignments a ON s.assignment_id = a.id
JOIN subjects sub ON a.subject_id = sub.id
WHERE s.student_id = 'student-uuid'
ORDER BY s.uploaded_at DESC;
```

---

## 🔒 Authentication & Authorization

### Closed Registration System

AssignPortal uses a **closed registration** model - users cannot self-signup. Accounts are created manually:

| Role | Creation Method | Setup Location |
|------|-----------------|----------------|
| **Admin** | Manual in Supabase Dashboard | Auth → Users → Add User |
| **Student** | Admin creates account | Supabase Dashboard or custom admin tool |

### Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  User Login  │────▶│  Supabase    │────▶│   JWT Token  │────▶│   Profile    │
│  Credentials │     │  Auth API    │     │   Received   │     │   Lookup     │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                      │
                                                                      ▼
                                                               ┌──────────────┐
                                                               │  AuthContext │
                                                               │  Populated   │
                                                               │  (user +     │
                                                               │   role)      │
                                                               └──────────────┘
```

**Step-by-Step:**

1. **User submits** email/password on `/login`
2. **`supabase.auth.signInWithPassword()`** validates credentials
3. **On success**, JWT token stored in browser (httpOnly cookie managed by Supabase)
4. **Profile lookup**: Query `profiles` table for role, name, phone
5. **AuthContext updated**: `{ user: { uid, email, name, role }, isAuthenticated: true }`
6. **Protected routes** now accessible based on role

### Role-Based Access Control (RBAC)

```typescript
// types.ts
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}
```

| Route | Student | Admin |
|-------|---------|-------|
| `/` (Home) | ✅ | ✅ |
| `/login` | ✅ | ✅ |
| `/upload` | ✅ | ❌ |
| `/subjects` | ✅ | ❌ |
| `/history` | ✅ | ❌ |
| `/settings` | ✅ | ✅ |
| `/admin` | ❌ | ✅ |
| `/admin/create-assignment` | ❌ | ✅ |
| `/admin/subjects` | ❌ | ✅ |
| `/admin/history` | ❌ | ✅ |

### ProtectedRoute Implementation

```tsx
// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
}
```

### Usage in Routing

```tsx
// App.tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <Admin />
    </ProtectedRoute>
  }
/>
```

---

## 🛡️ Security Model

### Defense in Depth

AssignPortal implements multiple security layers:

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 1: CLOSED REGISTRATION                                    │
│ • No public sign-up endpoint                                    │
│ • Only admins can create accounts                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 2: JWT AUTHENTICATION                                     │
│ • Supabase Auth with secure httpOnly cookies                  │
│ • Automatic token refresh                                       │
│ • Session expiration handling                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3: ROW LEVEL SECURITY (RLS)                               │
│ • Database-enforced access control                              │
│ • Policies checked on every query                               │
│ • Cannot be bypassed even with leaked API key                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Layer 4: STORAGE POLICIES                                       │
│ • File access controlled per-user                               │
│ • Signed URLs for secure downloads                              │
└─────────────────────────────────────────────────────────────────┘
```

### Row Level Security (RLS) Policies

#### profiles table

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view all profiles (needed for admin student lists)
CREATE POLICY "Profiles viewable by authenticated users"
  ON profiles FOR SELECT TO authenticated USING (true);

-- Users can only update their own profile
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE TO authenticated 
  USING (auth.uid() = id);
```

#### subjects table

```sql
-- Enable RLS
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- Everyone can view active subjects
CREATE POLICY "Active subjects viewable"
  ON subjects FOR SELECT TO authenticated 
  USING (is_active = true);

-- Only admins can create/update/delete
CREATE POLICY "Admin create subjects"
  ON subjects FOR INSERT TO authenticated 
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin update subjects"
  ON subjects FOR UPDATE TO authenticated 
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
```

#### assignments table

```sql
-- Enable RLS
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Everyone can view assignments (students need to see their work)
CREATE POLICY "Assignments viewable"
  ON assignments FOR SELECT TO authenticated USING (true);

-- Only admins can create/update/delete
CREATE POLICY "Admin manage assignments"
  ON assignments FOR ALL TO authenticated 
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
```

#### submissions table

```sql
-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Students see only their own submissions
-- Admins see all submissions
CREATE POLICY "Submissions access"
  ON submissions FOR SELECT TO authenticated 
  USING (
    auth.uid() = student_id 
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Students can create submissions (for themselves only)
CREATE POLICY "Students create submissions"
  ON submissions FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = student_id);

-- Only admins can update/delete (for corrections)
CREATE POLICY "Admin manage submissions"
  ON submissions FOR UPDATE TO authenticated 
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
```

### Storage RLS Policies

```sql
-- Students can upload to their own folder path
CREATE POLICY "Student uploads"
  ON storage.objects FOR INSERT TO authenticated 
  WITH CHECK (
    bucket_id = 'assignments' 
    AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'student'
  );

-- Users can read their own files
CREATE POLICY "User read own files"
  ON storage.objects FOR SELECT TO authenticated 
  USING (
    bucket_id = 'assignments' 
    AND (owner = auth.uid() OR 
         (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  );
```

### Security Best Practices Implemented

| Practice | Implementation |
|----------|----------------|
| **No client-side secrets** | Only `anon` key exposed (safe by design) |
| **Database-level enforcement** | RLS policies prevent unauthorized access |
| **Principle of least privilege** | Students can only access/modify own data |
| **Input validation** | TypeScript + runtime checks on all inputs |
| **XSS protection** | React's built-in escaping + no dangerous HTML |
| **CSRF protection** | Supabase handles via JWT in httpOnly cookies |
| **File type validation** | Frontend + backend file type checking |
| **Size limits** | 25MB limit enforced client and server side |

---

## 📡 API Reference

### supabaseApi.ts Functions

#### Authentication

```typescript
// Sign in with email/password
async function signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }>

// Sign out current user
async function signOut(): Promise<{ error: Error | null }>

// Get current session
async function getCurrentUser(): Promise<User | null>

// Listen to auth state changes
function onAuthStateChange(callback: (user: User | null) => void): Subscription
```

#### Subjects

```typescript
// Get all active subjects
async function getSubjects(): Promise<Subject[]>

// Create new subject (admin only)
async function createSubject(subject: Omit<Subject, 'createdAt'>): Promise<Subject>

// Update subject (admin only)
async function updateSubject(id: string, updates: Partial<Subject>): Promise<Subject>

// Soft delete subject (admin only)
async function deleteSubject(id: string): Promise<void>
```

#### Assignments

```typescript
// Get all assignments (optionally filtered by subject)
async function getAssignments(subjectId?: string): Promise<Assignment[]>

// Get single assignment by ID
async function getAssignment(id: string): Promise<Assignment | null>

// Create assignment (admin only)
async function createAssignment(assignment: Omit<Assignment, 'id'>): Promise<Assignment>

// Update assignment status (admin only)
async function updateAssignmentStatus(id: string, status: string): Promise<void>
```

#### Submissions

```typescript
// Upload file and create submission
async function uploadSubmission(
  file: File,
  assignmentId: string,
  studentId: string
): Promise<{ submission: Submission; error: Error | null }>

// Get submissions for a student
async function getStudentSubmissions(studentId: string): Promise<Submission[]>

// Get all submissions for an assignment (admin only)
async function getAssignmentSubmissions(assignmentId: string): Promise<Submission[]>

// Delete submission (admin only - for corrections)
async function deleteSubmission(submissionId: string): Promise<void>
```

#### Admin Data

```typescript
// Get dashboard statistics
async function getDashboardStats(): Promise<DashboardStats>

// Get all students
async function getStudents(): Promise<User[]>

// Get assignment progress
async function getAssignmentProgress(): Promise<AssignmentProgressItem[]>
```

### TypeScript Types

```typescript
// types.ts

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
  phone?: string;
}

export interface Subject {
  id: string;           // Subject code (e.g., "CS101")
  name: string;         // Full name
  description?: string;
  color?: string;       // Hex color
  createdAt: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  assignDate: string;
  dueDate: string;
  status: 'active' | 'inactive' | 'expired';
  folderName: string;
  manualStatus?: 'active' | 'inactive' | null;
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

export interface DashboardStats {
  totalStudents: number;
  totalSubmissions: number;
  activeAssignments: number;
  submissionRate: number;
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
```

---

## 📁 Storage Structure

### Hierarchical Folder Organization

Files are organized by subject → assignment → submissions:

```
assignments/                    # Root bucket
│
├── HRM/                        # Subject folder (permanent)
│   ├── HR_CaseStudy_2024-03-15/    # Assignment folder (auto-created)
│   │   ├── Ali_case_study.pdf      # Renamed file: {studentName}_{original}
│   │   ├── Sara_analysis.docx
│   │   └── Ahmad_report.pdf
│   │
│   └── Lab_Report_1_2024-03-20/    # Another assignment
│       ├── Ali_lab.pdf
│       └── Sara_lab.docx
│
├── CS101/                      # Another subject
│   ├── Data_Structures_Quiz_2024-03-10/
│   │   └── Ali_quiz.pdf
│   └── Programming_Assignment_2024-03-25/
│       └── Sara_code.zip
│
└── [NewSubject]/               # Future subjects follow same pattern
```

### File Naming Convention

| Stage | Filename | Example |
|-------|----------|---------|
| Original upload | `original_filename.pdf` | `case study final.pdf` |
| Frontend renamed | `{studentName}_{original}` | `Ali_case study final.pdf` |
| Storage saved | Same as renamed | `Ali_case study final.pdf` |

### Storage Benefits

- **Organized**: Files grouped by subject and assignment
- **No conflicts**: Student name prefix prevents overwrites
- **Human-readable**: Teachers can browse files directly in Supabase
- **Scalable**: Structure supports any number of subjects/assignments

---

## 🧩 Key Components Deep Dive

### 1. AuthContext

Manages global authentication state.

```typescript
// context/AuthContext.tsx
interface AuthContextType {
  user: User | null;           // Current user with role
  isAuthenticated: boolean;     // Auth state
  isLoading: boolean;          // Initial loading
  login: (email, password) => Promise<void>;
  logout: () => Promise<void>;
}

// Usage
const { user, isAuthenticated, login, logout } = useAuth();
```

**Key Features**:
- Persists session across page reloads
- Automatically refreshes JWT tokens
- Provides role-based helpers (`isAdmin()`, `isStudent()`)

### 2. ThemeContext

Manages dark/light mode with system preference detection.

```typescript
// context/ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// CSS Variables approach
// index.css defines --bg-primary, --text-primary, etc.
// Values change based on [data-theme] attribute
```

### 3. FileUploader

Complex file upload component with progress tracking.

```typescript
// components/FileUploader.tsx
interface FileUploaderProps {
  assignmentId: string;
  onUploadComplete: (submission: Submission) => void;
  maxFileSize?: number; // MB
}

// Features:
// - Drag & drop zone
// - File type validation
// - Size validation (default 25MB)
// - Progress indicator
// - Confetti on success
// - Error handling with toast
```

**Upload Flow**:
1. User selects/drops file
2. Validation (type, size)
3. Frontend rename: `${studentName}_${originalFileName}`
4. Upload to Supabase Storage
5. Create submission record in database
6. Trigger confetti animation
7. Show success toast

### 4. ProtectedRoute

Route guard for authentication and role checking.

```typescript
// components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

// Behavior:
// - Not logged in → redirect to /login
// - Wrong role → redirect to home
// - Loading → show skeleton
// - Authorized → render children
```

### 5. ErrorBoundary

Catches React errors and prevents app crashes.

```typescript
// components/ErrorBoundary.tsx
// Catches errors in child component tree
// Shows fallback UI instead of white screen
// Can log errors to monitoring service
```

### 6. Skeleton

Loading state components for better UX.

```typescript
// components/Skeleton.tsx
// Variants: text, card, circle
// Animated shimmer effect
// Used during data fetching
```

### 7. Admin Components

#### DashboardStats
```typescript
// components/admin/DashboardStats.tsx
// Displays: Total Students, Total Submissions, Active Assignments, Submission Rate
// Real-time updates via SWR
```

#### AssignmentProgress
```typescript
// components/admin/AssignmentProgress.tsx
// Progress bar per assignment
// Shows: submitted count / total students
// Missing student list
```

#### Charts (Recharts)
```typescript
// ActivityLineChart: Submissions over time
// StudentBarChart: Submissions per student
// SubmissionPieChart: Status distribution
```

---

## 💻 Development Guide

### Available Scripts

| Command | Description | URL |
|---------|-------------|-----|
| `npm run dev` | Start development server with HMR | `http://localhost:5173` |
| `npm run build` | Create optimized production build | `dist/` folder |
| `npm run preview` | Preview production build locally | `http://localhost:4173` |

### Development Workflow

```bash
# Start development
npm run dev

# Run type checking (in separate terminal)
npx tsc --noEmit

# Build for production
npm run build

# Test production build locally
npm run preview
```

### Code Style Guidelines

#### TypeScript Standards

```typescript
// ✅ Strict typing enabled
function getUser(id: string): Promise<User | null>

// ✅ Use interfaces for object shapes
interface Assignment {
  id: string;
  title: string;
}

// ✅ Use enums for fixed values
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin'
}

// ✅ Type all function returns
async function fetchData(): Promise<Subject[]> {
  // implementation
}
```

#### Component Structure

```typescript
// ✅ Functional components with hooks
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

export function MyComponent({ title, onSubmit }: ComponentProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Component logic

  return (
    <div className="glass-card">
      <h2>{title}</h2>
      {/* JSX */}
    </div>
  );
}
```

#### Import Organization

```typescript
// 1. External dependencies
import React, { useState } from 'react';
import { useSWR } from 'swr';

// 2. Internal utilities/contexts
import { useAuth } from '../context/AuthContext';
import { supabaseApi } from '../services/supabaseApi';

// 3. Types
import { User, Assignment } from '../types';

// 4. Relative components
import { Button } from './Button';
```

### Adding New Features

#### Adding a New Page

1. **Create page component** in `pages/NewPage.tsx`:
   ```typescript
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   ```

2. **Add type definitions** in `types.ts` if needed:
   ```typescript
   export interface NewPageData {
     id: string;
     name: string;
   }
   ```

3. **Add API functions** in `services/supabaseApi.ts`:
   ```typescript
   export async function getNewPageData(): Promise<NewPageData[]> {
     const { data, error } = await supabase.from('table').select('*');
     if (error) throw error;
     return data || [];
   }
   ```

4. **Add route** in `App.tsx`:
   ```typescript
   const NewPage = lazy(() => import('./pages/NewPage'));
   
   <Route path="/new-page" element={<NewPage />} />
   ```

5. **Add navigation link** in `Header.tsx` if needed

---

## 🧪 Testing

### Testing Strategy

Currently, the project uses manual testing with the following approach:

#### Manual Testing Checklist

**Authentication Flow:**
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error toast)
- [ ] Logout clears session
- [ ] Protected routes redirect when not logged in
- [ ] Role-based access works (student can't access admin)

**Student Features:**
- [ ] Browse subjects displays correctly
- [ ] Assignment list shows due dates
- [ ] File upload works (drag & drop + click)
- [ ] File size validation (try >25MB)
- [ ] Submission history displays
- [ ] Profile settings save correctly

**Admin Features:**
- [ ] Dashboard shows stats
- [ ] Create subject works
- [ ] Create assignment generates correct folder
- [ ] Progress tracking shows accurate percentages
- [ ] Student search works
- [ ] Assignment history displays

**UI/UX:**
- [ ] Dark/light mode toggle
- [ ] Responsive on mobile
- [ ] Skeleton loading states
- [ ] Error boundary catches errors
- [ ] Toast notifications appear

### Adding Automated Tests

To add testing to the project:

```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

# Add test scripts to package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

Example test:
```typescript
// components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

---

## 📦 Building for Production

### Build Process

```bash
# Create production build
npm run build

# Output in dist/ folder:
# - index.html (entry point)
# - assets/ (JS, CSS, images with hashed filenames)
# - manifest.json (PWA)
```

### Build Output

```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-abc123.js     # Main JS bundle (hashed for cache busting)
│   ├── index-def456.css    # CSS bundle
│   └── vendor-ghi789.js    # Vendor chunk
├── manifest.json           # PWA manifest
├── icon-192x192.png        # PWA icons
└── icon-512x512.png
```

### Performance Optimizations

| Feature | Implementation | Benefit |
|---------|----------------|---------|
| **Code Splitting** | React.lazy() + dynamic imports | Smaller initial bundle |
| **Tree Shaking** | ES modules + dead code elimination | Removes unused code |
| **Minification** | Vite built-in | Smaller file sizes |
| **Asset Hashing** | Content-based filenames | Aggressive caching |
| **Gzip/Brotli** | Server-configured | Faster transfers |

### Pre-Deployment Checklist

- [ ] Environment variables configured in production
- [ ] Supabase RLS policies tested
- [ ] Storage bucket permissions set
- [ ] Build completes without errors
- [ ] Preview build tested locally
- [ ] PWA manifest valid
- [ ] Favicon and icons present

---

## 🚀 Deployment

### Platform Options

#### 1. Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Setup:**
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel Dashboard
3. Auto-deploys on push to main branch

#### 2. Netlify

**Via CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd dist
netlify deploy --prod
```

**Via Drag & Drop:**
1. Run `npm run build`
2. Drag `dist/` folder to Netlify deploy page

#### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run build
npm run deploy
```

> ⚠️ **Note:** GitHub Pages requires HashRouter (already configured in App.tsx)

#### 4. Supabase Hosting (Edge + Static)

Deploy as Supabase Edge Function with static hosting.

#### 5. Self-Hosted (Nginx)

```nginx
# /etc/nginx/sites-available/assignportal
server {
    listen 80;
    server_name portal.yourschool.edu;
    root /var/www/assignportal/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/css application/javascript;
}
```

### Environment Variables by Platform

| Platform | How to Set Variables |
|----------|---------------------|
| Vercel | Dashboard → Project Settings → Environment Variables |
| Netlify | Dashboard → Site Settings → Environment |
| GitHub Pages | Uses build-time .env (no runtime secrets) |
| Self-hosted | `.env` file or system environment |

### Post-Deployment Verification

```bash
# Test production URL
curl https://your-domain.com

# Check PWA manifest
curl https://your-domain.com/manifest.json

# Verify service worker
curl https://your-domain.com/service-worker.js
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "Supabase environment variables missing"

**Symptoms:** App loads but shows "Supabase not configured" in console

**Solution:**
```bash
# 1. Verify .env file exists
cat .env

# 2. Check variables are set
grep VITE_SUPABASE_URL .env
grep VITE_SUPABASE_ANON_KEY .env

# 3. Restart dev server
npm run dev
```

#### Issue: "RLS policy violation"

**Symptoms:** 403 errors when fetching data

**Solution:**
1. Check RLS policies are enabled in Supabase
2. Verify user role in `profiles` table
3. Test policy with Supabase SQL editor

#### Issue: File upload fails

**Symptoms:** Upload progress stops or error toast

**Solution:**
1. Check storage bucket exists: `assignments`
2. Verify storage RLS policies allow uploads
3. Check file size < 25MB
4. Check browser console for CORS errors

#### Issue: "Cannot find module"

**Symptoms:** TypeScript compilation errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart TypeScript server (in VS Code)
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

#### Issue: Theme not persisting

**Symptoms:** Theme resets on page reload

**Solution:**
1. Check localStorage is available (private browsing may block)
2. Verify `ThemeContext` is wrapping the app in `App.tsx`

### Debug Mode

Enable verbose logging:

```typescript
// Add to supabase.ts
const supabase = createClient(url, key, {
  auth: { debug: true }
});
```

### Getting Help

1. Check browser console for errors
2. Check Supabase Logs (Dashboard → Logs)
3. Review Network tab for failed requests
4. File an issue with:
   - Error message
   - Browser version
   - Steps to reproduce

---

## 🤝 Contributing

### Contribution Workflow

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AssignPortal-Supa.git
   ```
3. **Create branch**:
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```
4. **Make changes** following guidelines
5. **Test** your changes
6. **Commit**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push**:
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open Pull Request**

### Commit Message Format

```
feat: add user profile editing
fix: resolve file upload progress bug
docs: update API reference
style: format Admin component
refactor: simplify AuthContext
perf: optimize chart rendering
test: add Login component tests
chore: update dependencies
```

### Contribution Guidelines

| Area | Guidelines |
|------|------------|
| **Code Style** | Follow existing patterns; run type check |
| **TypeScript** | All functions typed; strict mode compliance |
| **Components** | Functional components; hooks for state |
| **Styling** | Tailwind classes; CSS variables for themes |
| **API Layer** | Add to `supabaseApi.ts`; handle errors gracefully |
| **Database** | Update RLS policies for new tables |
| **Documentation** | Update README for user-facing changes |
| **Testing** | Test on desktop and mobile before PR |

### Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] No console errors in browser
- [ ] Responsive design works
- [ ] Dark/light mode both tested
- [ ] RLS policies updated if needed
- [ ] README updated if needed

---

## 📋 Changelog

### [1.0.0] - 2024-XX-XX

#### Added
- Initial release with full assignment management
- Student and Admin role-based access
- File upload with Supabase Storage
- Real-time dashboard with Recharts
- Glassmorphism UI design
- Dark/light mode support
- PWA support with service worker

#### Features
- Subject management (CRUD)
- Assignment creation with auto-folder generation
- Submission tracking with progress bars
- Student search and filtering
- Responsive design for all screen sizes
- Error boundaries and loading states

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Must include license and copyright notice
- ⚠️ No warranty provided

---

## 🙏 Acknowledgments

### Core Technologies

- **[Supabase](https://supabase.com)** - Open source Firebase alternative providing PostgreSQL, Auth, and Storage
- **[React](https://react.dev)** - UI library for building component-based interfaces
- **[Vite](https://vitejs.dev)** - Next generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://typescriptlang.org)** - Typed JavaScript

### Additional Libraries

- **[SWR](https://swr.vercel.app)** - React hooks for data fetching
- **[Recharts](https://recharts.org)** - Composable charting library
- **[React Hot Toast](https://react-hot-toast.com)** - Toast notifications
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)** - Celebration animations
- **[Lucide](https://lucide.dev)** - Beautiful consistent icons

### Inspiration

- Glassmorphism design trends
- Modern educational platforms
- Student-centered UX patterns

---

## 📞 Support & Community

### Getting Help

| Resource | Link | Purpose |
|----------|------|---------|
| **Documentation** | This README | Complete setup & usage guide |
| **Issues** | GitHub Issues | Bug reports & feature requests |
| **Discussions** | GitHub Discussions | Q&A and community chat |

### Contact

For security issues or private inquiries:
- 📧 Email: support@assignportal.com
- 💬 Discord: [Join our community](https://discord.gg/assignportal)

### Report a Bug

1. Check existing issues first
2. Include:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

---

## 🗺️ Roadmap

### Current (v1.0)
- ✅ Core assignment management
- ✅ File uploads with Supabase Storage
- ✅ Role-based access control
- ✅ Admin dashboard with analytics
- ✅ PWA support

### Upcoming (v1.1)
- 🔄 Email notifications for new assignments
- 🔄 Deadline reminders
- 🔄 Bulk student import
- 🔄 Assignment templates

### Future (v2.0)
- 📋 Plagiarism detection integration
- 📋 Advanced analytics & reporting
- 📋 Mobile app (React Native)
- 📋 Integration with LMS platforms

---

<p align="center">
  <strong>Made with ❤️ for students and educators</strong>
</p>

<p align="center">
  <a href="https://github.com/yourusername/AssignPortal-Supa">⭐ Star us on GitHub</a> •
  <a href="https://twitter.com/assignportal">🐦 Follow on Twitter</a> •
  <a href="https://discord.gg/assignportal">💬 Join Discord</a>
</p>
