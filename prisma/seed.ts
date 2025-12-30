import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  console.log('✅ Created test user:', user.email)

  // Create a test team
  const team = await prisma.team.create({
    data: {
      name: 'My First Team',
      description: 'A sample team for testing',
      members: {
        create: {
          userId: user.id,
          role: 'admin',
        },
      },
    },
  })

  console.log('✅ Created test team:', team.name)

  // Create a test project
  const project = await prisma.project.create({
    data: {
      name: 'Sample Project',
      description: 'A sample project to get started',
      teamId: team.id,
      color: '#3B82F6',
    },
  })

  console.log('✅ Created test project:', project.name)

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Set up development environment',
        description: 'Install all necessary tools and dependencies',
        status: 'done',
        priority: 'high',
        projectId: project.id,
        creatorId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Design database schema',
        description: 'Create the initial database structure',
        status: 'done',
        priority: 'high',
        projectId: project.id,
        creatorId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implement authentication',
        description: 'Add user login and registration',
        status: 'in_progress',
        priority: 'high',
        projectId: project.id,
        creatorId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Create task board UI',
        description: 'Build the kanban-style task board',
        status: 'in_progress',
        priority: 'medium',
        projectId: project.id,
        creatorId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Add real-time updates',
        description: 'Implement WebSocket for live collaboration',
        status: 'todo',
        priority: 'medium',
        projectId: project.id,
        creatorId: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Build analytics dashboard',
        description: 'Create charts and statistics views',
        status: 'todo',
        priority: 'low',
        projectId: project.id,
        creatorId: user.id,
      },
    }),
  ])

  console.log(`✅ Created ${tasks.length} sample tasks`)

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📝 Test Account Credentials:')
  console.log('   Email: test@example.com')
  console.log('   Password: password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
