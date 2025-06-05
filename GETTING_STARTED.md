# Getting Started

This guide will help you set up the project and understand the codebase structure for the RevGenie assessment.

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js** 18+ installed
- **npm** or **pnpm** package manager
- **Git** for version control
- A code editor (VS Code recommended)
- Basic familiarity with **Next.js**, **React**, **TypeScript**, and **TailwindCSS**

## 🚀 Quick Setup

### 1. Fork & Clone
```bash
# Fork this repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/revgenie-candidate-assessment.git
cd revgenie-candidate-assessment
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using pnpm (recommended)
pnpm install
```

### 3. Environment Setup
```bash
# Copy the environment template
cp .env.example .env.local

# The .env.example contains mock values - no changes needed for assessment
```

### 4. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 5. Verify Setup
Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the RevGenie platform.

### 6. 🔐 Authentication

**Assessment Mode**: Authentication is bypassed via `BYPASS_AUTH=true` in your `.env.local` file.

- ✅ All dashboard routes are accessible without login
- ✅ No signup/signin required
- ✅ Focus purely on building the ABM Genie feature

**Routes you can access directly:**
- Dashboard: `http://localhost:3000/dashboard`
- Existing onboarding: `http://localhost:3000/onboarding`
- Content Manager: `http://localhost:3000/dashboard/content-manager`
- **Your target**: `http://localhost:3000/dashboard/abm-genie/onboarding`

## 🗺️ Explore the Codebase

### Key Pages to Visit
- **Homepage**: `http://localhost:3000` - Landing page
- **General Onboarding**: `http://localhost:3000/onboarding` - Main platform onboarding
- **Dashboard**: `http://localhost:3000/dashboard` - Main dashboard
- **Content Manager**: `http://localhost:3000/dashboard/content-manager` - Existing genie example
- **Content Manager Onboarding**: `http://localhost:3000/dashboard/content-manager/onboarding` - Genie-specific onboarding

### Your Target Implementation
**ABM Genie Onboarding**: `http://localhost:3000/dashboard/abm-genie/onboarding`

*This route doesn't exist yet - you'll create it!*

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── content-manager/      # Content Manager Genie
│   │   │   ├── onboarding/       # 📚 Study this pattern!
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── onboarding/               # 📚 Study this too!
│   ├── api/                      # API endpoints
│   ├── globals.css               # Global styles + theme
│   └── layout.tsx
├── components/                   # UI Components
│   ├── ui/                       # shadcn/ui base components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard-specific components
│   ├── content-manager/          # Content Manager components
│   ├── onboarding/               # 📚 Onboarding form components
│   └── [other-features]/
├── lib/                          # Utilities & configurations
│   ├── api/                      # API abstraction layers
│   ├── mock-api/                 # Mock API implementations
│   ├── utils.ts                  # Utility functions
│   └── constants.ts
├── types/                        # TypeScript type definitions
├── contexts/                     # React Context providers
├── hooks/                        # Custom React hooks
└── providers/                    # App-level providers
```

## 🎯 Understanding the Patterns

### Study These Existing Examples

#### 1. General Onboarding (`/app/onboarding/`)
- Multi-step form flow
- Progress tracking
- State management with context
- Form validation patterns

#### 2. Content Manager Genie (`/app/dashboard/content-manager/`)
- Genie-specific onboarding flow
- Dashboard implementation
- AI interaction patterns
- Component structure

### Key Files to Examine

```bash
# Onboarding Patterns
src/app/onboarding/                    # Main onboarding flow
src/components/onboarding/             # Reusable onboarding components
src/contexts/Onboarding/               # State management examples

# Content Manager Patterns (Your Reference)
src/app/dashboard/content-manager/onboarding/    # Genie onboarding example
src/components/content-manager/                  # Genie-specific components
src/contexts/content-manager-context.tsx        # Genie state management

# Design System
src/app/globals.css                    # Theme variables & styles
src/components/ui/                     # Base UI components
tailwind.config.ts                     # Tailwind configuration

# Type Definitions
src/types/                             # Existing type patterns
```

## 🎨 Design System

The project uses **TweakCN** design system with **shadcn/ui** components:

### Available Components
```typescript
// Form Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select } from "@/components/ui/select"

// Layout Components
import { Tabs } from "@/components/ui/tabs"
import { Dialog } from "@/components/ui/dialog"
import { Sheet } from "@/components/ui/sheet"

// And many more in /components/ui/
```

### Theme Variables
```css
/* Available in globals.css */
--primary: #5a17d6
--secondary: #e5e7eb
--background: #f8fafc
--foreground: #1e293b
/* Full theme in globals.css */
```

## 🔄 Development Workflow

### Recommended Development Steps

1. **Study existing patterns** (30 minutes)
   - Walk through general onboarding
   - Explore content manager genie onboarding
   - Understand component structure

2. **Design your approach** (1 hour)
   - Create Figma mockups (optional but recommended)
   - Plan component structure
   - Design data flow

3. **Set up basic structure** (1 hour)
   - Create ABM genie route structure
   - Set up basic components
   - Implement navigation

4. **Build step by step** (4-5 hours)
   - Implement each onboarding step
   - Add AI interaction patterns
   - Connect with mock APIs

5. **Polish and test** (1 hour)
   - Responsive design
   - Error handling
   - Loading states

### Where to Build Your Solution

Create your ABM Genie implementation in:
```
src/app/dashboard/abm-genie/
├── onboarding/
│   ├── page.tsx                 # Main onboarding page
│   ├── [step]/
│   │   └── page.tsx            # Individual step pages
│   └── layout.tsx              # Onboarding layout
└── page.tsx                    # ABM Genie dashboard
```

And components in:
```
src/components/abm-genie/
├── onboarding/
│   ├── step-one-form.tsx
│   ├── step-two-form.tsx
│   └── ...
├── dashboard/
└── common/
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check

# Database (if using Prisma)
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```


## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# If using pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript errors:**
```bash
# Check types
npm run type-check

# Restart TypeScript in VS Code: 
Cmd+Shift+P > "TypeScript: Restart TS Server"

# If errors persist, try:
npm run dev -- --no-cache
```

**Styling issues:**
```bash
# Restart dev server to rebuild CSS
npm run dev

# Check globals.css for theme variables
# Verify Tailwind classes in tailwind.config.ts

# If Tailwind isn't applying correctly:
npm run build:css  # If this script exists
```

**Next.js App Router issues:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# If you see hydration errors in console:
# These are often caused by server/client rendering mismatches
# Check for components using browser-only APIs without proper guards
```

**Environment variables not loading:**
```bash
# Verify .env.local exists and has correct values
cat .env.local

# Make sure you've restarted the dev server after changes
# Next.js only loads env vars at startup
```

**Mock API issues:**
```bash
# Check network tab in browser dev tools
# Verify mock API endpoints are being called correctly
# Look for errors in the console
```

## 🎥 Video Walkthroughs

Watch these videos to understand the existing patterns:
- **General Onboarding Flow**: `./videos/GeneralOnboarding.md` (Loom Video Link)
- **Content Manager Genie**: `./videos/ContentGeniWalkthrough.md` (Loom Video Link)

## 📚 Additional Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Helpful VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense  
- TypeScript Importer
- Prettier - Code formatter
- Auto Rename Tag

## ❓ Getting Help

### During Assessment
- **Questions about requirements**: Create an issue in this repository
- **Technical setup issues**: Check troubleshooting section above
- **Clarifications needed**: Email grant.crow@revgeni.ai

### Response Time
- We'll respond to questions within 24 hours on weekdays
- Check existing issues first - your question might already be answered

## 🎯 Success Criteria

You're on the right track when:
- ✅ You can run the project locally
- ✅ You understand the existing onboarding patterns
- ✅ You can navigate between different sections
- ✅ You're familiar with the component structure
- ✅ You understand the design system

## 📝 Next Steps

Once you've successfully set up the project and explored the codebase:

1. Review the [ASSESSMENT.md](./ASSESSMENT.md) for full technical requirements
2. Begin implementing your solution

---

**Technical support**: If you encounter any setup issues not covered in the troubleshooting section, please create an issue in this repository or email grant.crow@revgeni.ai.