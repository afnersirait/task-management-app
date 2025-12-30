# Task Management App

A modern, collaborative task management application built with Next.js, TypeScript, PostgreSQL, and WebSocket for real-time updates.

## Features

- **Authentication**: Secure user authentication with NextAuth.js
- **Task Management**: Create, update, and organize tasks with priorities and due dates
- **Team Collaboration**: Create teams, projects, and assign tasks to team members
- **Real-time Updates**: WebSocket integration for live task updates across team members
- **Analytics Dashboard**: Visual insights into task completion, priorities, and trends
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and shadcn/ui
- **Status Tracking**: Organize tasks by status (To Do, In Progress, Review, Done)
- **Priority Levels**: Set task priorities (Low, Medium, High, Urgent)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Real-time**: Socket.IO (WebSocket)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Charts**: Recharts
- **State Management**: Zustand
- **Form Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   # Remove old node_modules and package-lock.json if upgrading
   rm -rf node_modules package-lock.json
   
   # Install fresh dependencies
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/taskmanagement?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

   # WebSocket Server
   NEXT_PUBLIC_WS_URL="http://localhost:3001"
   ```

   Generate a secure NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   
   Terminal 1 - Next.js app:
   ```bash
   npm run dev
   ```

   Terminal 2 - WebSocket server:
   ```bash
   node server/websocket.js
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
task-management-app/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Dashboard pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── dashboard/           # Dashboard components
│   └── ui/                  # UI components (shadcn/ui)
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema
│   └── schema.prisma       # Prisma schema
├── server/                  # Backend servers
│   └── websocket.js        # WebSocket server
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Database Schema

The application uses the following main models:

- **User**: User accounts and authentication
- **Team**: Teams for collaboration
- **TeamMember**: Team membership and roles
- **Project**: Projects within teams
- **Task**: Individual tasks with status, priority, and assignments
- **TaskAssignment**: Task assignments to users
- **Comment**: Task comments
- **Activity**: Activity logs for tasks

## Features in Detail

### Task Board

- Kanban-style board with columns for different statuses
- Drag-and-drop functionality (can be extended)
- Color-coded priorities
- Task cards with assignees and due dates

### Analytics

- Task distribution by status (pie chart)
- Task distribution by priority (bar chart)
- Completion trend over time (line chart)
- Real-time data updates

### Team Collaboration

- Create and manage teams
- Invite team members
- Assign tasks to team members
- Real-time notifications

### Real-time Updates

- Live task updates across all connected clients
- WebSocket-based communication
- Automatic UI refresh on changes

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Teams
- `GET /api/teams` - Get user's teams
- `POST /api/teams` - Create new team

### Projects
- `GET /api/projects` - Get projects
- `POST /api/projects` - Create new project

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

### Database Migrations
```bash
npx prisma migrate dev --name migration_name
```

## Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Hosting

Consider using:
- **Vercel Postgres**
- **Supabase**
- **Railway**
- **Neon**

### WebSocket Server

Deploy the WebSocket server separately on:
- **Railway**
- **Render**
- **Heroku**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@taskflow.com or open an issue in the repository.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO](https://socket.io/)
