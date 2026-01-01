# TaskFlow - Modern Task Management System

Built by **Afner Sirait** | A powerful collaborative task management platform with real-time capabilities

> "Simplifying team collaboration, one task at a time" - Afner Sirait

## 🎯 Why I Built This

As a developer passionate about productivity and team collaboration, I wanted to create a task management solution that combines modern web technologies with an intuitive user experience. This project showcases my expertise in full-stack development, real-time systems, and cloud-native architecture.

## 📸 Screenshots

### Dashboard
![Dashboard Overview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+Overview)

### Task Board with Drag & Drop
![Task Board](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Task+Board)

### Analytics Dashboard
![Analytics](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Analytics+Dashboard)

### Dark Mode Support
![Dark Mode](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Dark+Mode)

## 🎖️ Project Highlights

- ✅ **100% TypeScript** - Full type safety across the entire stack
- ✅ **Production-Ready** - Docker, Kubernetes, and CI/CD configured
- ✅ **Real-time Updates** - WebSocket integration for live collaboration
- ✅ **Modern Architecture** - Microservices-based design
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **Dark Mode** - Eye-friendly theme switching
- ✅ **Drag & Drop** - Intuitive task management
- ✅ **Analytics** - Visual insights into productivity

## ✨ Key Features

### 🔐 Secure Authentication
- Custom authentication system powered by NextAuth.js
- Secure session management and password hashing
- Protected routes and API endpoints

### 📋 Advanced Task Management
- Intuitive drag-and-drop task boards
- Priority levels (Low, Medium, High, Urgent)
- Due dates and deadline tracking
- Rich task descriptions and comments
- Task assignment to team members

### 👥 Team Collaboration
- Create and manage multiple teams
- Project organization within teams
- Role-based access control
- Real-time task updates across all team members

### 📊 Analytics & Insights
- Visual dashboards with interactive charts
- Task completion trends over time
- Priority distribution analysis
- Team productivity metrics

### 🎨 Modern UI/UX
- Dark and light mode support
- Responsive design for all devices
- Beautiful animations and transitions
- Accessible components following WCAG guidelines

### ⚡ Real-time Capabilities
- WebSocket integration for instant updates
- Live task status changes
- Collaborative editing experience
- No page refresh needed

## 🛠️ Technology Stack

I chose this modern tech stack for its performance, developer experience, and scalability:

### Frontend
- **Next.js 15** - React framework with App Router for optimal performance
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- **Recharts** - Composable charting library for analytics
- **next-themes** - Seamless dark/light mode implementation
- **@dnd-kit** - Modern drag-and-drop functionality

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Complete authentication solution
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Robust relational database
- **Socket.IO** - Real-time bidirectional communication

### DevOps & Deployment
- **Docker** - Containerization for consistent environments
- **GitHub Actions** - CI/CD pipeline automation
- **Kubernetes** - Container orchestration for scalability
- **Docker Compose** - Multi-container development setup

## 🚀 Getting Started

Want to run this project locally? Follow these steps:

### Prerequisites

Make sure you have these installed on your machine:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** - Comes with Node.js

### Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/afnersirait/task-management-app.git
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

### 🎮 Demo Credentials

For testing purposes, you can use these credentials:

```
Email: demo@taskflow.com
Password: demo123
```

Or create your own account through the sign-up page!

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

## 🏗️ Architecture

This application follows a microservices architecture for scalability and maintainability:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│   PostgreSQL     │     │  WebSocket      │
│   (Port 3000)   │     │   Database       │     │  Server         │
│                 │     │   (Port 5432)    │     │  (Port 3001)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                                                  │
        └──────────────────────────────────────────────────┘
                    Real-time Communication
```

### Key Design Decisions

- **Separation of Concerns**: WebSocket server runs independently for better scalability
- **Containerization**: Docker support for consistent deployment across environments
- **CI/CD**: Automated builds and deployments via GitHub Actions
- **Database**: Prisma ORM for type-safe database operations
- **Real-time**: Socket.IO for bidirectional event-based communication

## 🚢 Deployment

I've included comprehensive deployment configurations for various platforms:

### Option 1: Docker Compose (Easiest)

```bash
# Start all services with one command
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Kubernetes (Production)

```bash
# Deploy to Kubernetes cluster
kubectl apply -f kubernetes/deployment.yml

# Check status
kubectl get pods -n taskflow
```

### Option 3: Cloud Platforms

#### Vercel (Next.js App)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

#### Database Hosting
- **Vercel Postgres** - Seamless integration with Vercel
- **Supabase** - Open-source Firebase alternative
- **Railway** - Simple PostgreSQL hosting
- **Neon** - Serverless Postgres

#### WebSocket Server
- **Railway** - Easy deployment with GitHub integration
- **Render** - Free tier available
- **Fly.io** - Global edge deployment

### CI/CD Pipeline

The project includes GitHub Actions workflow that:
- Builds Docker images on release
- Pushes to GitHub Container Registry
- Supports multi-platform builds (AMD64, ARM64)
- Includes health checks and attestation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

I welcome contributions! If you'd like to improve this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## 📬 Contact

**Afner Sirait**
- GitHub: [@afnersirait](https://github.com/afnersirait)
- Email: afner.sirait@example.com
- LinkedIn: [Afner Sirait](https://linkedin.com/in/afnersirait)

Feel free to reach out if you have questions or want to discuss this project!

## 🙏 Acknowledgments

This project was built with the help of amazing open-source technologies:

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Socket.IO](https://socket.io/) - Real-time bidirectional communication

---

**Made with ❤️ by Afner Sirait**

If you found this project helpful, please consider giving it a ⭐️!
