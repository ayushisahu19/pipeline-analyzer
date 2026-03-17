📄 Multi-Branch Pipeline Analyzer

Student Name: Ayushi Sahu
Registration No: 23FE10CSE00744
Course: CSE3253 DevOps [PE6]
Semester: VI (2025–2026)
Project Type: CI/CD Pipeline + DevOps Analytics
Difficulty: Intermediate

📌 Project Overview
Problem Statement:
In DevOps workflows, it is difficult to track pipeline performance across different branches. There is no simple system to collect metrics like build time, success rate, and vulnerabilities in one place.

Objectives:
✔ Analyze CI/CD pipeline performance
✔ Track build success/failure across branches
✔ Capture vulnerabilities using automated scanning
✔ Implement Jenkins-based CI/CD pipeline
✔ Visualize pipeline data

Key Features:
Jenkins CI/CD pipeline with multiple stages
Automated vulnerability detection using npm audit
Pipeline metrics collection (branch, build time, status)
Backend API to store pipeline data
Frontend dashboard for visualization (charts)
Docker-based containerized setup

🛠️ Technology Stack:
Core Technologies
Frontend: React.js + Chart.js
Backend: Node.js + Express.js
Database: MongoDB

DevOps Tools
Version Control: Git
CI/CD: Jenkins
Containerization: Docker
Monitoring: Basic custom metrics (via API)

🚀 Getting Started
Prerequisites:
Docker Desktop
Git
Node.js
Jenkins (running locally)

Installation:
git clone https://github.com/ayushisahu19/pipeline-analyzer.git
cd pipeline-analyzer
Run using Docker
docker-compose up --build
Access Application

Backend API → http://localhost:5000
Frontend → http://localhost:3000

📂 Project Structure
pipeline-analyzer/
│
├── docs/                      # Project documentation
│
├── frontend-react/           # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Charts & UI (BuildChart, StatusChart, etc.)
│   │   ├── services/         # API calls (api.js)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
├── src/                      # Backend (Node.js + Express)
│   │
│   ├── config/               # Configuration files
│   │   └── db.js             # MongoDB connection setup
│   │
│   ├── models/               # Database schemas (Mongoose)
│   │   └── PipelineRun.js    # Defines pipeline data structure:
│   │                         # branch, buildTime, status, vulnerabilities
│   │
│   ├── controllers/          # Business logic layer
│   │   └── pipelineController.js  
│   │                         # Handles:
│   │                         # - Saving pipeline data (POST)
│   │                         # - Fetching pipeline runs (GET)
│   │
│   ├── routes/               # API route definitions
│   │   └── pipelineRoutes.js # Defines endpoints:
│   │                         # /api/pipeline (POST, GET)
│   │
│   ├── app.js                # Express app setup
│   │                         # - Middleware
│   │                         # - Routes integration
│   │
│   └── server.js             # Entry point
│                             # - Starts server
│                             # - Connects to DB
│
├── monitoring/               # Monitoring configs (placeholder)
│
├── tests/                    # Test folder (not actively used)
│
├── Jenkinsfile               # CI/CD pipeline (Checkout → Install → Test → Scan → Send Metrics)
├── docker-compose.yml        # Multi-container setup (backend + MongoDB)
├── dockerfile                # Backend container config
├── package.json              # Backend dependencies
├── .gitignore
└── README.md

⚙️ Configuration
Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string

🔄 CI/CD Pipeline
Pipeline Stages (Actual Implementation)

Checkout
Fetches code from GitHub

Install Dependencies
Runs npm install

Run Tests
Executes npm test
Uses --passWithNoTests (no test cases implemented yet)

Vulnerability Scan
Runs npm audit
Extracts total vulnerabilities (low + moderate + high + critical)

Post Stage (VERY IMPORTANT)
Collects:
Branch name
Build duration
Build status
Vulnerability count
Sends data to backend API:
POST /api/pipeline

🔥 Pipeline Output Flow
    Jenkins → Runs Pipeline → Collects Metrics → Sends to Backend → Stored in MongoDB → Displayed in Frontend

🧪 Testing
Jenkins test stage implemented
No actual test cases written yet
Pipeline does not fail due to --passWithNoTests

📊 Monitoring & Logging
Custom pipeline metrics stored in database
Console-based logging used

🐳 Docker
docker build -t pipeline-analyzer .
docker run -p 5000:5000 pipeline-analyzer

📊 Performance Metrics
Metric	Description
Build Time	Captured from Jenkins
Status	SUCCESS / FAILED
Vulnerabilities	From npm audit
Branch Performance	Compared in frontend

🎥 Demo
--

🔄 Development Workflow
Git Branching Strategy
main
 └── feature/test-feature
🔐 Security
✔ Vulnerability scanning using npm audit
✔ Environment variable configuration

⚠️ Project Challenges
Handling merge conflicts between branches
Integrating Jenkins with local backend API
Extracting vulnerability data from npm audit JSON
Sending pipeline metrics dynamically to backend

📚 Learnings
Hands-on experience with Jenkins pipelines
CI/CD workflow implementation
Docker containerization
Full-stack DevOps integration
Real-time pipeline data tracking

Acknowledgments
Course Instructor: Mr. Jay Shankar Sharma
Open-source tools (Jenkins, Docker, MongoDB)

📬 Contact
Ayushi Sahu
GitHub: https://github.com/ayushisahu19
