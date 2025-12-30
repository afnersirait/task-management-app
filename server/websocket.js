const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer((req, res) => {
  // Health check endpoint
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'taskflow-websocket',
      connections: io.engine.clientsCount
    }))
    return
  }
  
  res.writeHead(404)
  res.end()
})

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join-project', (projectId) => {
    socket.join(`project-${projectId}`)
    console.log(`Client ${socket.id} joined project ${projectId}`)
  })

  socket.on('leave-project', (projectId) => {
    socket.leave(`project-${projectId}`)
    console.log(`Client ${socket.id} left project ${projectId}`)
  })

  socket.on('task-update', (data) => {
    const { projectId, task } = data
    socket.to(`project-${projectId}`).emit('task-updated', task)
  })

  socket.on('task-create', (data) => {
    const { projectId, task } = data
    socket.to(`project-${projectId}`).emit('task-created', task)
  })

  socket.on('task-delete', (data) => {
    const { projectId, taskId } = data
    socket.to(`project-${projectId}`).emit('task-deleted', taskId)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = process.env.WS_PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
})
