pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests..."
                bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Vulnerability Scan') {
            steps {
                script {

                    echo "Running npm audit..."

                    bat '''
                    npm audit --json > audit.json
                    '''

                    def audit = readJSON file: 'audit.json'

                    if (audit.metadata && audit.metadata.vulnerabilities) {
                        env.VULN_COUNT =
                            audit.metadata.vulnerabilities.critical +
                            audit.metadata.vulnerabilities.high +
                            audit.metadata.vulnerabilities.moderate +
                            audit.metadata.vulnerabilities.low
                    } else {
                        env.VULN_COUNT = "0"
                    }

                    echo "Vulnerabilities found: ${env.VULN_COUNT}"
                }
            }
        }

    }

    post {

        always {
            script {

                def branch = env.BRANCH_NAME
                def buildTime = currentBuild.duration
                def status = currentBuild.currentResult
                def vulnerabilities = env.VULN_COUNT ?: "0"

                echo "Sending pipeline metrics..."

                bat """
                curl -X POST http://localhost:5000/api/pipeline ^
                -H "Content-Type: application/json" ^
                -d "{\\"branch\\":\\"${branch}\\",\\"buildTime\\":${buildTime},\\"status\\":\\"${status}\\",\\"vulnerabilities\\":${vulnerabilities}}"
                """
            }
        }

    }
}