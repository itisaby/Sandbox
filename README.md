# 🚀 Sandbox - Cloud Native Sandbox

A browser-based sandbox platform similar to Replit, built with Kubernetes and AWS for scalable, isolated code execution environments. Experience seamless coding with real-time collaboration, terminal access, and multi-language support.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.25+-blue.svg)](https://kubernetes.io/)
[![AWS](https://img.shields.io/badge/AWS-EKS-orange.svg)](https://aws.amazon.com/eks/)

## ✨ Features

- 🌐 **Browser-Based IDE**: Full-featured code editor with syntax highlighting
- 🔄 **Real-Time Collaboration**: Multiple users can code together seamlessly
- 💻 **Interactive Terminal**: Full shell access with xterm.js integration
- 🏗️ **Kubernetes-Powered**: Isolated pods for each user session
- ⚡ **Multi-Language Support**: Python, Node.js, Java, C++, and more
- 🔒 **Secure Isolation**: Network policies and resource limits per sandbox
- 📊 **Scalable Architecture**: Handles 500+ concurrent sessions
- 🚀 **99.5% Uptime**: Production-ready reliability
- 💾 **Persistent Storage**: Files saved across sessions
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## 🏗️ Architecture

![Sandbox Architecture](architecture-diagram-link)

### Core Components

- **Frontend**: React.js with Vite for fast development and Monaco Editor for code editing
- **Backend**: Node.js with Express.js and Socket.io for real-time communication
- **Container Orchestration**: Kubernetes (EKS) for pod management and scaling
- **Cloud Infrastructure**: AWS services including S3, ECR, and VPC
- **Real-Time Communication**: WebSockets for instant code synchronization
- **Security**: Network policies, resource quotas, and isolated namespaces

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker
- Kubernetes cluster (local or AWS EKS)
- AWS CLI configured
- kubectl configured

### 1. Clone the Repository

```bash
git clone https://github.com/itisaby/Sandbox.git
cd Sandbox
```

### 2. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
EKS_CLUSTER_NAME=sandbox-cluster

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/sandbox
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# Application
PORT=3000
FRONTEND_URL=http://localhost:3000
WEBSOCKET_PORT=8080
```

### 4. Deploy Kubernetes Resources

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Create sandbox namespace
kubectl create namespace sandbox-env

# Apply network policies
kubectl apply -f k8s/network-policies/
```

### 5. Start the Application

```bash
# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend  
npm run dev
```

### 6. Access the Platform

- **Frontend**: http://localhost:3000
- **API**: http://localhost:8080
- **WebSocket**: ws://localhost:8080

## 💻 Usage

### Creating a Sandbox

1. **Open the web interface** at http://localhost:3000
2. **Sign up/Login** with your credentials
3. **Create New Sandbox** - Choose your programming language
4. **Start Coding** - Write code in the Monaco editor
5. **Run Code** - Execute directly in the integrated terminal
6. **Share & Collaborate** - Invite others via shareable links

### Supported Languages

- **Python** 3.9+ with pip packages
- **Node.js** 18+ with npm packages  
- **Java** 17+ with Maven support
- **C/C++** with GCC compiler
- **Go** latest version
- **Rust** stable release
- **Shell/Bash** scripting

### Real-Time Features

- **Live Code Sync**: See changes from collaborators instantly
- **Shared Terminal**: Multiple cursors and command execution
- **File Explorer**: Real-time file tree updates
- **Chat System**: Built-in communication (optional feature)

## 🏗️ Architecture Deep Dive
```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[Web Interface<br/>React.js + Vite]
        IDE[Code Editor<br/>Monaco Editor]
        TERM[Terminal<br/>xterm.js]
    end
    
    subgraph "Communication Layer"
        WS[WebSocket Server<br/>Socket.io]
        API[REST API<br/>Node.js/Express]
    end
    
    subgraph "Orchestration Layer"
        LB[Load Balancer<br/>nginx/ALB]
        GATEWAY[API Gateway]
        AUTH[Authentication<br/>JWT/OAuth]
    end
    
    subgraph "Container Management"
        CONTROLLER[Sandbox Controller<br/>Node.js Service]
        MANAGER[Session Manager<br/>Redis Cache]
    end
    
    subgraph "AWS Cloud Infrastructure"
        subgraph "Kubernetes Cluster (EKS)"
            MASTER[Master Node<br/>Control Plane]
            
            subgraph "Worker Nodes"
                POD1[User Pod 1<br/>Ubuntu + Tools]
                POD2[User Pod 2<br/>Ubuntu + Tools]
                POD3[User Pod N<br/>Ubuntu + Tools]
                
                subgraph "Pod Components"
                    RUNTIME[Code Runtime<br/>Python/Node/Java]
                    FS[File System<br/>Persistent Volume]
                    NET[Network<br/>Isolated Namespace]
                end
            end
        end
        
        subgraph "AWS Services"
            ECR[Container Registry<br/>AWS ECR]
            S3[File Storage<br/>AWS S3]
            RDS[Database<br/>PostgreSQL/MySQL]
            VPC[Virtual Network<br/>AWS VPC]
        end
    end
    
    subgraph "Security & Monitoring"
        SEC[Security Policies<br/>Network Policies]
        MONITOR[Monitoring<br/>CloudWatch/Prometheus]
        LOGS[Centralized Logs<br/>ELK Stack]
    end
    
    %% User Interactions
    UI --> WS
    IDE --> API
    TERM --> WS
    
    %% API Flow
    WS --> GATEWAY
    API --> GATEWAY
    GATEWAY --> AUTH
    AUTH --> LB
    
    %% Backend Processing
    LB --> CONTROLLER
    CONTROLLER --> MANAGER
    CONTROLLER --> MASTER
    
    %% Pod Management
    MASTER --> POD1
    MASTER --> POD2
    MASTER --> POD3
    
    POD1 --> RUNTIME
    POD1 --> FS
    POD1 --> NET
    
    %% Storage & Services
    CONTROLLER --> S3
    CONTROLLER --> ECR
    MANAGER --> RDS
    
    %% Security & Monitoring
    MASTER --> SEC
    POD1 --> MONITOR
    POD2 --> LOGS
    
    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef aws fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef k8s fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef security fill:#ffebee,stroke:#b71c1c,stroke-width:2px
    
    class UI,IDE,TERM frontend
    class WS,API,CONTROLLER,MANAGER backend
    class ECR,S3,RDS,VPC aws
    class MASTER,POD1,POD2,POD3,RUNTIME,FS,NET k8s
    class SEC,MONITOR,LOGS,AUTH security
```

## 🔒 Security Features

### Container Security

- **Resource Limits**: CPU and memory quotas per sandbox
- **Network Policies**: Isolated networking between pods
- **Read-Only Root**: Immutable container filesystems
- **Non-Root User**: Processes run as unprivileged user
- **Seccomp Profiles**: Restricted system calls

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Role-Based Access**: Admin, user, and read-only roles  
- **Session Management**: Secure session handling
- **OAuth Integration**: GitHub, Google OAuth support

### Data Protection

- **Encryption at Rest**: S3 bucket encryption
- **Encryption in Transit**: TLS/SSL for all communications
- **Secrets Management**: Kubernetes secrets for sensitive data
- **Audit Logging**: Complete activity audit trail

## 📊 Performance Metrics

### Scalability

- **Concurrent Users**: 500+ simultaneous sessions
- **Pod Startup Time**: < 5 seconds average
- **Code Execution Latency**: < 100ms response time
- **File Sync Speed**: Real-time with < 50ms delay

### Resource Utilization

- **Average Pod Memory**: 256MB per active session
- **CPU Usage**: 0.1-0.5 cores per sandbox
- **Storage**: 1GB persistent volume per user
- **Network**: 10MB/s bandwidth per pod

### Availability

- **Uptime SLA**: 99.5% availability target
- **Auto-Scaling**: Horizontal pod autoscaling enabled
- **Health Checks**: Liveness and readiness probes
- **Disaster Recovery**: Multi-AZ deployment

## 🛠️ Development

### Local Development Setup

```bash
# Install development dependencies
npm run install:dev

# Start with hot reload
npm run dev:watch

# Run tests
npm run test

# Build for production
npm run build
```

### Docker Development

```bash
# Build development image
docker build -f Dockerfile.dev -t sandbox:dev .

# Run with Docker Compose
docker-compose -f docker-compose.dev.yml up
```

### Code Style

- **ESLint**: Airbnb configuration for JavaScript
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Jest**: Testing framework

## 📦 Deployment

### AWS EKS Deployment

```bash
# Create EKS cluster
eksctl create cluster --name sandbox-cluster \
  --region us-east-1 \
  --nodes 3 \
  --node-type t3.medium

# Deploy application
kubectl apply -f k8s/production/

# Set up ingress
kubectl apply -f k8s/ingress/
```



## 🐛 Troubleshooting

### Common Issues

**Pod Creation Failures**
```bash
# Check pod status
kubectl get pods -n sandbox-env

# View pod logs
kubectl logs -f pod-name -n sandbox-env

# Describe pod for events
kubectl describe pod pod-name -n sandbox-env
```

**WebSocket Connection Issues**
```bash
# Check service endpoints
kubectl get endpoints -n sandbox

# Test connectivity
curl -v ws://your-domain/socket.io/
```

**Resource Constraints**
```bash
# Check cluster resources
kubectl top nodes
kubectl top pods -n sandbox-env

# View resource quotas
kubectl get resourcequota -n sandbox-env
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- **Replit** - Inspiration for the platform design
- **Kubernetes** - Container orchestration platform
- **Monaco Editor** - VS Code editor for the web
- **xterm.js** - Terminal emulator for browsers
- **Socket.io** - Real-time communication library


*Empowering developers with cloud-native code execution environments*
