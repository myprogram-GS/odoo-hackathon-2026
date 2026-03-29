# ReimbursePlus - Expense Management System

A modern, glassmorphic expense reimbursement management platform built with Next.js, React, and TypeScript. Manage employee expense submissions, approvals, and reimbursement workflows with role-based dashboards for Admins, Managers, and Employees.

## Features

- **Three Role-Based Dashboards**
  - **Admin**: Manage users, set approval rules, and view system statistics
  - **Manager**: Review and approve pending expense requests
  - **Employee**: Submit expenses, track status, and view approval history

- **Modern Design**
  - Glassmorphic UI with neon accent colors
  - Dark theme with smooth transitions and animations
  - Responsive layout optimized for all screen sizes

- **Expense Management**
  - Submit expenses with categories, amounts, and receipts
  - Real-time status tracking (Draft, Pending, Approved, Rejected)
  - Approval workflows with audit trails

## Prerequisites

Before running this project locally, ensure you have:

- **Node.js** version 18.17 or later
- **npm**, **yarn**, or **pnpm** (pnpm recommended)
- A code editor (VS Code recommended)
- Git (optional, for cloning)

## Installation & Setup

### Step 1: Extract the ZIP File

Download the project ZIP and extract it to your desired location:

```bash
unzip reimbursement-app.zip
cd reimbursement-app
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Run the Development Server

Start the development server:

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### Step 4: Login

The app uses session-based authentication (no backend required for demo). At the login page:

1. Enter any email address (e.g., `john@company.com`)
2. Enter any password (e.g., `password123`)
3. Select your role from the dropdown:
   - **Employee** - Submit and track expenses
   - **Manager** - Review and approve expenses
   - **Admin** - Manage users and approval rules
4. Click "Sign in"

You'll be redirected to your role's dashboard.

## Project Structure

```
app/
├── login/                    # Login page with role selection
├── signup/                   # Admin signup page
├── admin/                    # Admin dashboard (user management, rules)
│   ├── components/           # Admin-specific components
│   │   ├── user-management.tsx
│   │   └── approval-rules.tsx
│   └── page.tsx
├── manager/                  # Manager dashboard (approvals)
│   └── page.tsx
├── employee/                 # Employee dashboard (expense submission)
│   └── page.tsx
├── globals.css               # Glassmorphic design utilities
└── layout.tsx                # Root layout
components/
├── sidebar.tsx               # Role-aware navigation sidebar
├── status-badge.tsx          # Status display component
├── role-badge.tsx            # Role display component
├── approval-timeline.tsx      # Approval workflow timeline
├── expense-card.tsx          # Expense card component
└── summary-card.tsx          # Summary statistics card
ui/                           # shadcn/ui components (Button, Input, Card, etc.)
```

## Key Routes

- `/login` - Login page
- `/signup` - Admin registration
- `/admin` - Admin dashboard
- `/manager` - Manager dashboard
- `/employee` - Employee dashboard

## Design System

The app uses a premium glassmorphic design with:

- **Colors**: Dark background (oklch 0.11 0.01 280) with neon accents
  - Cyan (#00d9ff) for primary actions
  - Purple (#d946ef) for manager role
  - Green (#10b981) for approved status
  - Red (#ef4444) for rejected/errors

- **Components**: Semi-transparent glass cards with backdrop blur, smooth transitions, and glow effects

- **Typography**: Geist font family for consistent, modern look

## Development Tips

### Switching Roles
Log out and log back in with a different role to see different dashboards without clearing browser storage.

### Modifying Styles
All glassmorphic utilities are defined in `app/globals.css`. Update the `.glass-card`, `.glass-button`, and glow classes to customize the design.

### Adding New Pages
Create new pages in the `app/` directory following Next.js App Router conventions. Import `Sidebar` component for consistent navigation.

## Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Notes

- This is a **demo application** using sessionStorage for authentication
- All expense data is stored in-memory and resets on page refresh
- No backend API required for local testing
- For production use, implement real authentication and database persistence

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
pnpm dev -- -p 3001
```

### Dependencies Not Installing
```bash
# Clear npm cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Styles Not Loading
Clear your browser cache or restart the development server with Ctrl+C and `pnpm dev`

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, check the browser console (F12) for any error messages. The app provides detailed feedback for all interactions.