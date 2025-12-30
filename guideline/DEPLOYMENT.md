# Deployment Guide

This guide covers deploying the Task Management App in a microservices architecture using Docker and Kubernetes.

## Architecture Overview

The application consists of three main services:
1. **Next.js App** - Main web application (Port 3000)
2. **WebSocket Server** - Real-time communication (Port 3001)
3. **PostgreSQL** - Database (Port 5432)

## Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (for K8s deployment)
- GitHub account (for GitHub Actions)

## Local Development with Docker

### 1. Development Environment

```bash
# Start only the database and Redis
docker-compose -f docker-compose.dev.yml up -d

# Set up your .env file
cp .env.example .env

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://taskflow:taskflow_dev@localhost:5432/taskmanagement?schema=public"

# Run migrations
npx prisma db push

# Seed database
npm run db:seed

# Start development servers
npm run dev                    # Terminal 1: Next.js
node server/websocket.js       # Terminal 2: WebSocket
```

### 2. Full Stack with Docker Compose

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Building Docker Images

### Build App Image

```bash
docker build -t taskflow-app:latest -f Dockerfile .
```

### Build WebSocket Image

```bash
docker build -t taskflow-websocket:latest -f Dockerfile.websocket .
```

### Test Images Locally

```bash
# Run app
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  taskflow-app:latest

# Run websocket
docker run -p 3001:3001 \
  -e NEXTAUTH_URL="http://localhost:3000" \
  taskflow-websocket:latest
```

## GitHub Actions CI/CD

### Setup

1. **Enable GitHub Container Registry**
   - Go to repository Settings → Packages
   - Enable "Improved container support"

2. **Configure Secrets**
   - No additional secrets needed (uses GITHUB_TOKEN)

3. **Trigger Build**
   ```bash
   # Push to main branch
   git push origin main
   
   # Or create a tag
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Image Tags

Images are automatically tagged with:
- `latest` - Latest main branch
- `v1.0.0` - Semantic version tags
- `main-abc123` - Branch and commit SHA
- `pr-123` - Pull request number

### Pull Images

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Pull images
docker pull ghcr.io/your-org/task-management-app/app:latest
docker pull ghcr.io/your-org/task-management-app/websocket:latest
```

## Kubernetes Deployment

### Prerequisites

```bash
# Install kubectl
# Install helm (optional)

# Verify cluster connection
kubectl cluster-info
```

### Deploy to Kubernetes

1. **Update Configuration**

Edit `kubernetes/deployment.yml`:
- Replace `taskflow.example.com` with your domain
- Update image URLs with your registry
- Set proper secrets

2. **Create Secrets**

```bash
# Create namespace
kubectl create namespace taskflow

# Create secrets
kubectl create secret generic taskflow-secrets \
  --from-literal=DATABASE_URL="postgresql://..." \
  --from-literal=NEXTAUTH_SECRET="your-secret" \
  --from-literal=POSTGRES_PASSWORD="your-password" \
  -n taskflow
```

3. **Deploy Application**

```bash
# Apply all configurations
kubectl apply -f kubernetes/deployment.yml

# Check deployment status
kubectl get pods -n taskflow
kubectl get services -n taskflow
kubectl get ingress -n taskflow

# View logs
kubectl logs -f deployment/taskflow-app -n taskflow
kubectl logs -f deployment/taskflow-websocket -n taskflow
```

4. **Scale Services**

```bash
# Manual scaling
kubectl scale deployment taskflow-app --replicas=5 -n taskflow

# HPA will auto-scale based on CPU/Memory
kubectl get hpa -n taskflow
```

### Database Migration

```bash
# Run migrations in a pod
kubectl run -it --rm prisma-migrate \
  --image=ghcr.io/your-org/task-management-app/app:latest \
  --restart=Never \
  --namespace=taskflow \
  --env="DATABASE_URL=$DATABASE_URL" \
  -- npx prisma migrate deploy
```

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/db?schema=public"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# WebSocket
NEXT_PUBLIC_WS_URL="wss://your-domain.com/ws"
```

### Optional Variables

```env
# Node Environment
NODE_ENV="production"

# WebSocket Port
WS_PORT="3001"

# Redis (if using)
REDIS_URL="redis://redis:6379"
```

## Monitoring and Health Checks

### Health Endpoints

- **App**: `GET /api/health`
- **WebSocket**: `GET /health`

### Check Health

```bash
# App health
curl http://localhost:3000/api/health

# WebSocket health
curl http://localhost:3001/health

# In Kubernetes
kubectl exec -it deployment/taskflow-app -n taskflow -- \
  curl http://localhost:3000/api/health
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs taskflow-app
kubectl logs deployment/taskflow-app -n taskflow

# Check events
kubectl describe pod <pod-name> -n taskflow
```

### Database Connection Issues

```bash
# Test database connection
docker exec -it taskflow-db psql -U taskflow -d taskmanagement

# In Kubernetes
kubectl exec -it deployment/taskflow-app -n taskflow -- \
  npx prisma db pull
```

### WebSocket Connection Issues

- Ensure CORS is properly configured
- Check firewall rules for port 3001
- Verify ingress WebSocket annotations

## Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure SSL/TLS certificates
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Set resource limits and requests
- [ ] Enable horizontal pod autoscaling
- [ ] Configure ingress with rate limiting
- [ ] Set up log aggregation
- [ ] Configure persistent volumes for database
- [ ] Test disaster recovery procedures

## Scaling Considerations

### Horizontal Scaling

- App: Can scale to multiple replicas
- WebSocket: Requires sticky sessions or Redis adapter
- Database: Consider read replicas for high load

### Performance Optimization

- Enable Next.js image optimization
- Use CDN for static assets
- Implement caching strategy
- Optimize database queries
- Use connection pooling

## Support

For issues and questions:
- GitHub Issues: https://github.com/your-org/task-management-app/issues
- Documentation: https://your-docs-site.com
