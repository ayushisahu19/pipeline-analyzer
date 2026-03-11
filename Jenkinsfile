pipeline {
    agent any

    environment {
        API_URL = "http://localhost:5000/api/pipeline"
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
                script {

                    def branch = env.BRANCH_NAME
                    def buildTime = currentBuild.duration

                    bat """
                    curl -X POST %API_URL% ^
                    -H "Content-Type: application/json" ^
                    -d "{\\"branch\\":\\"${branch}\\",\\"buildTime\\":${buildTime},\\"status\\":\\"SUCCESS\\",\\"vulnerabilities\\":0}"
                    """

                }
            }
        }
    }

    post {
        failure {
            echo "Build Failed"
        }
    }
}