pipeline {
    agent any

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
                script {
                    bat """
                    curl -X POST http://localhost:5000/api/pipeline ^
                    -H "Content-Type: application/json" ^
                    -d "{\\"branch\\":\\"${env.BRANCH_NAME}\\",\\"buildTime\\":120,\\"status\\":\\"SUCCESS\\",\\"vulnerabilities\\":0}"
                    """
                }
            }
        }

    }

    post {
        success {
            echo "Pipeline Success"
        }
        failure {
            echo "Pipeline Failed"
        }
    }
}