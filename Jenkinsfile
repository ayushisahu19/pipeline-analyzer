pipeline {
    agent any

    environment {
        NODE_ENV = "test"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Installing dependencies..."
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Send Metrics') {
            steps {
                echo "Sending metrics to analyzer API..."
                bat '''
                curl -X POST http://localhost:5000/api/pipeline ^
                -H "Content-Type: application/json" ^
                -d "{\\"branch\\":\\"%BRANCH_NAME%\\",\\"status\\":\\"SUCCESS\\"}"
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully"
        }

        failure {
            echo "Pipeline failed"
        }
    }
}