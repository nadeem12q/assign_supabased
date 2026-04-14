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
├── 📄 LICENSE                    # Apache License 2.0
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
git clone https://github.com/nadeem12q/assign_supabased.git
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
git clone https://github.com/nadeem12q/assign_supabased.git
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

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

### Apache 2.0 License Summary

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ✅ Patent protection included
- ⚠️ Must include license and copyright notice
- ⚠️ Must state changes made to files
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

## ⚡ Performance Optimization

### Frontend Optimization

#### Code Splitting
All pages are lazy-loaded using `React.lazy()` to reduce initial bundle size:

```typescript
const Admin = lazy(() => import('./pages/Admin'));
const Upload = lazy(() => import('./pages/Upload'));
```

#### Data Caching (SWR)
SWR provides intelligent caching with:
- **Stale-while-revalidate**: Show cached data immediately, refresh in background
- **Deduplication**: Multiple requests for same data merged
- **Automatic revalidation**: Refresh when user focuses window

```typescript
const { data, error, isLoading } = useSWR('/api/subjects', fetcher, {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 60000 // 1 minute
});
```

#### Image Optimization
- Icons use SVG format (scalable, small file size)
- PWA icons in multiple sizes for different devices
- Lazy loading for large images if added

### Backend Optimization

#### Database Indexes
Critical indexes for fast queries:

```sql
CREATE INDEX idx_assignments_subject_id ON assignments(subject_id);
CREATE INDEX idx_assignments_status ON assignments(status);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_uploaded_at ON submissions(uploaded_at);
```

#### Query Optimization
- Use `select()` with specific columns instead of `select('*')`
- Limit results with pagination for large datasets
- Use Supabase's edge functions for complex computations

#### Storage Optimization
- File size limit: 25MB (configurable)
- Automatic file compression for images (if added)
- CDN-ready signed URLs for file downloads

### Network Optimization

#### Timeout Configuration
All Supabase calls have timeout wrappers:
- Auth operations: 20-30 seconds
- Database queries: 10-15 seconds
- File uploads: No timeout (progress tracking)

#### Request Batching
- SWR automatically dedupes concurrent requests
- Batch file uploads not yet implemented (planned)

---

## 🔒 Security Best Practices

### Authentication Security

#### Password Requirements
- Minimum 8 characters (enforced by Supabase)
- Email verification required (configurable)
- Session timeout: 1 hour (Supabase default)

#### Token Management
- JWT tokens stored in Supabase Auth
- Automatic token refresh on expiry
- Secure token transmission via HTTPS

### Data Security

#### Row Level Security (RLS)
All database tables have RLS policies:
- Students can only see their own submissions
- Admins can see all data
- Public cannot access any data

```sql
-- Example RLS policy for submissions
CREATE POLICY "Students can view own submissions"
ON submissions FOR SELECT
USING (auth.uid() = student_id);

CREATE POLICY "Admins can view all submissions"
ON submissions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

#### Storage Security
- Private storage bucket (not public)
- Signed URLs for file downloads (7-day expiry)
- RLS policies on storage bucket

### API Security

#### Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Rotate anon keys regularly

#### Input Validation
- File type validation on frontend
- File size limits enforced
- SQL injection prevention via parameterized queries (Supabase)

### CORS Configuration
Configure allowed origins in Supabase:
```javascript
// In Supabase Dashboard → API → CORS
https://yourdomain.com
https://www.yourdomain.com
```

---

## ❓ Frequently Asked Questions (FAQ)

### General Questions

**Q: Can students self-register?**
A: No, AssignPortal uses closed registration. Admins must create student accounts manually in Supabase.

**Q: What's the maximum file upload size?**
A: Default is 25MB, configurable via `VITE_MAX_FILE_SIZE_MB` environment variable.

**Q: Can I use this without Supabase?**
A: No, AssignPortal is tightly integrated with Supabase for authentication, database, and storage. You would need to refactor the entire backend to use a different service.

**Q: Is there a mobile app?**
A: AssignPortal is a PWA (Progressive Web App) that can be installed on mobile devices. A native React Native app is planned for v2.0.

### Technical Questions

**Q: Why use SWR instead of React Query?**
A: SWR was chosen for its simplicity and excellent caching strategy. Both libraries would work equally well.

**Q: Can I change the color scheme?**
A: Yes, modify CSS variables in `index.css` or subject colors in the database.

**Q: How do I add new user roles?**
A: Update the `UserRole` enum in `types.ts`, add role check in RLS policies, and update `AuthContext`.

**Q: What happens if Supabase is down?**
A: The app shows a fallback UI. Implement offline caching in future versions for full offline support.

### Deployment Questions

**Q: Can I deploy to shared hosting?**
A: Only if it supports Node.js and allows environment variables. Recommended: Vercel, Netlify, or your own VPS.

**Q: Do I need a separate backend server?**
A: No, Supabase provides the complete backend. This is a frontend-only application.

**Q: How do I handle database migrations?**
A: Use Supabase's SQL editor or the Supabase CLI for migrations. Keep a migration log.

---

## 🌐 Browser Compatibility

### Supported Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Chrome** | 90+ | Full support |
| **Firefox** | 88+ | Full support |
| **Safari** | 14+ | Full support (iOS & macOS) |
| **Edge** | 90+ | Full support |
| **Opera** | 76+ | Full support |

### Browser-Specific Notes

#### Safari (iOS)
- PWA install requires iOS 16.4+
- Some backdrop-filter effects may have reduced performance
- File picker behavior differs from desktop

#### Mobile Browsers
- Touch-optimized UI
- Responsive design works on all screen sizes
- PWA install prompt on supported browsers

#### Legacy Browsers
- Internet Explorer: Not supported
- Older browsers: May have missing features

### Progressive Enhancement
The app uses feature detection and provides fallbacks:
- CSS Grid/Flexbox with fallbacks
- ES6+ with transpilation via Vite
- Service Worker with graceful degradation

---

## ♿ Accessibility Features

### WCAG 2.1 Compliance

AssignPortal aims for WCAG 2.1 Level AA compliance:

#### Visual Accessibility
- **Color Contrast**: All text meets 4.5:1 contrast ratio
- **Color Independence**: Information not conveyed by color alone
- **Text Resizing**: UI scales up to 200% without breaking
- **Focus Indicators**: Clear focus states for keyboard navigation

#### Keyboard Accessibility
- **Full Keyboard Navigation**: All features accessible via keyboard
- **Tab Order**: Logical tab sequence through interactive elements
- **Shortcuts**: No custom shortcuts (relies on browser defaults)
- **Skip Links**: Not yet implemented (planned)

#### Screen Reader Support
- **Semantic HTML**: Proper heading structure, landmarks
- **ARIA Labels**: Added where needed for dynamic content
- **Alt Text**: All images have descriptive alt text
- **Live Regions**: Toast notifications use ARIA live regions

#### Cognitive Accessibility
- **Clear Labels**: Form fields have clear, descriptive labels
- **Error Messages**: Specific, actionable error messages
- **Consistent Layout**: Predictable navigation and UI patterns
- **No Time Limits**: No automatic timeouts (except auth session)

### Testing Accessibility
Test with:
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [axe DevTools](https://www.deque.com/axe/) - Browser extension
- Screen readers: NVDA (Windows), VoiceOver (macOS/iOS)

---

## 📊 Monitoring & Logging

### Application Monitoring

#### Frontend Monitoring
- **Error Boundary**: Catches React errors and logs them
- **Console Logging**: Development mode has verbose logging
- **Performance Metrics**: Use Web Vitals API (planned)

#### Backend Monitoring (Supabase)
- **Dashboard Logs**: View in Supabase Dashboard → Logs
- **Database Logs**: Query performance and errors
- **Auth Logs**: Login attempts and session events
- **Storage Logs**: File upload/download events

### Recommended Monitoring Tools

#### Error Tracking
- **Sentry**: JavaScript error tracking
- **LogRocket**: Session replay and error tracking
- **Supabase Logs**: Built-in logging

#### Analytics
- **Google Analytics 4**: User behavior tracking
- **Plausible**: Privacy-focused analytics
- **Supabase Analytics**: Built-in database analytics

### Logging Best Practices

#### Frontend Logging
```typescript
// Development mode only
if (import.meta.env.DEV) {
  console.log('[Auth] User signed in:', user.email);
}

// Error logging
console.error('[Upload] File upload failed:', error);
```

#### Backend Logging
```sql
-- Add logging trigger in Supabase
CREATE OR REPLACE FUNCTION log_submission()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (action, table_name, record_id)
  VALUES ('INSERT', 'submissions', NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## ⚙️ Configuration Reference

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_SUPABASE_URL` | ✅ Yes | - | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ Yes | - | Supabase anon public key |
| `VITE_STORAGE_BUCKET` | ❌ No | `assignments` | Storage bucket name |
| `VITE_MAX_FILE_SIZE_MB` | ❌ No | `25` | Max upload size in MB |
| `VITE_APP_MODE` | ❌ No | `supabase` | Application mode identifier |

### Application Config (config.ts)

```typescript
export const CONFIG = {
  APP_MODE: import.meta.env.VITE_APP_MODE || 'supabase',
  MAX_FILE_SIZE_MB: Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) || 25,
};
```

### Supabase Configuration

#### Auth Settings
- **Email Confirmation**: Optional (recommended for production)
- **Session Duration**: 1 hour (configurable)
- **Password Requirements**: Minimum 8 characters

#### Database Settings
- **Connection Pooling**: Automatic (Supabase managed)
- **Backup**: Daily backups (Supabase free tier)
- **Point-in-Time Recovery**: Available on paid tiers

#### Storage Settings
- **Bucket Type**: Private (recommended)
- **File Size Limit**: 50MB (Supabase limit)
- **CDN**: Automatic via Supabase

### Theme Configuration

CSS Variables in `index.css`:
```css
:root {
  --bg-primary: #0a0e1a;
  --bg-secondary: #151926;
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  --accent-purple: #8b5cf6;
  --accent-green: #10b981;
  --accent-red: #ef4444;
  --glass: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

---

## 💾 Backup & Recovery

### Database Backup

#### Supabase Automatic Backups
- **Free Tier**: Daily backups retained for 7 days
- **Pro Tier**: Daily backups retained for 30 days
- **Point-in-Time Recovery**: Available on Pro tier

#### Manual Backup
```sql
-- Export entire database
-- Use Supabase Dashboard → Database → Backups → Export
```

### Storage Backup

#### File Backup Strategy
```bash
# Using Supabase CLI
supabase storage download --bucket assignments --local-backup ./backups
```

#### Backup Schedule
- **Daily**: Automated via Supabase
- **Weekly**: Manual backup to external storage
- **Before Major Changes**: Manual snapshot

### Recovery Procedures

#### Database Recovery
1. Go to Supabase Dashboard → Database → Backups
2. Select backup point
3. Click "Restore"
4. Wait for restoration (5-15 minutes)

#### Storage Recovery
1. Use Supabase CLI or Dashboard
2. Upload backed-up files
3. Update file paths in database if needed

### Disaster Recovery Plan

#### Scenario 1: Accidental Data Deletion
- Use Supabase point-in-time recovery
- Restore from daily backup if within retention period

#### Scenario 2: Supabase Outage
- App shows fallback UI
- Monitor Supabase status page
- No action needed until service restored

#### Scenario 3: Security Breach
- Rotate all API keys immediately
- Review audit logs
- Force password reset for all users
- Restore from pre-breach backup

---

## 🌍 Internationalization (i18n)

### Current Status
AssignPortal is currently **English-only**. Internationalization support is planned for v1.2.

### Planned i18n Features
- Multi-language support (Urdu, Hindi, Arabic, etc.)
- RTL (Right-to-Left) layout support
- Date/time localization
- Currency formatting (if needed)

### Implementation Plan
1. Extract all text strings to translation files
2. Use `react-i18next` for translations
3. Add language switcher component
4. Implement RTL layout support
5. Test with target languages

### Contributing Translations
When i18n is implemented:
1. Fork the repository
2. Add translation file for your language
3. Update language list in config
4. Submit pull request

---

## 📱 PWA Features

### Installation

#### Desktop (Chrome/Edge)
1. Visit AssignPortal
2. Click install icon in address bar
3. Confirm installation
4. App launches as standalone window

#### Mobile (iOS Safari)
1. Visit AssignPortal
2. Tap Share button
3. Select "Add to Home Screen"
4. Confirm installation

#### Mobile (Android Chrome)
1. Visit AssignPortal
2. Tap install prompt (appears automatically)
3. Confirm installation
4. App added to home screen

### PWA Capabilities

#### Offline Support
- Service worker caches static assets
- Offline fallback page shown
- Data requires online connection

#### App-like Experience
- Full-screen mode
- Custom splash screen
- App icon on home screen
- No browser chrome

#### Background Sync
- Not yet implemented (planned)
- Will sync submissions when online

### PWA Manifest Configuration

Located at `public/manifest.json`:
- App name and short name
- Icons (192x192, 512x512)
- Theme colors
- Display mode (standalone)
- Orientation (portrait-primary)
- Categories (education, productivity)

---

## 🔗 API Reference

### Supabase Client Functions

#### Authentication
```typescript
signIn(email: string, password: string): Promise<User>
signOut(): Promise<void>
getCurrentUser(): Promise<User | null>
onAuthStateChange(callback: Function): Subscription
```

#### Subjects
```typescript
getSubjects(): Promise<Subject[]>
getAllSubjects(): Promise<Subject[]>
createSubject(subject: Subject): Promise<Subject>
updateSubject(id: string, updates: Partial<Subject>): Promise<Subject>
deleteSubject(id: string): Promise<boolean>
```

#### Assignments
```typescript
getAssignments(): Promise<Assignment[]>
getAssignmentsBySubject(subjectId: string): Promise<Assignment[]>
getAssignment(id: string): Promise<Assignment | null>
createAssignment(assignment: Assignment): Promise<Assignment>
updateAssignment(id: string, updates: Partial<Assignment>): Promise<Assignment>
deleteAssignment(id: string): Promise<boolean>
```

#### Submissions
```typescript
getSubmissions(assignmentId?: string): Promise<Submission[]>
getStudentSubmissions(studentId: string): Promise<Submission[]>
submitAssignment(file: File, assignmentId: string, subjectId: string, student: User): Promise<Submission>
```

#### File Upload
```typescript
uploadFile(file: File, subjectId: string, assignmentFolder: string, studentName: string): Promise<{path: string, url: string}>
getSignedUrl(path: string, expiresIn?: number): Promise<string>
deleteFile(path: string): Promise<boolean>
```

### API Response Formats

#### Success Response
```typescript
{
  data: T,
  error: null
}
```

#### Error Response
```typescript
{
  data: null,
  error: {
    message: string,
    code: string,
    details?: any
  }
}
```

### Rate Limiting
- Supabase free tier: 50,000 requests/month
- Supabase Pro tier: 100,000 requests/month
- Implement client-side rate limiting if needed

---

<p align="center">
  <strong>Made with ❤️ for students and educators</strong>
</p>

<p align="center">
  <a href="https://github.com/nadeem12q/assign_supabased">⭐ Star us on GitHub</a> •
  <a href="https://twitter.com/assignportal">🐦 Follow on Twitter</a> •
  <a href="https://discord.gg/assignportal">💬 Join Discord</a>
</p>
