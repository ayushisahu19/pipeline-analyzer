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
            post {
                failure {
                    script {
                        env.ACTUAL_FAILED_STAGE = env.STAGE_NAME
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests..."
                bat 'npm test -- --passWithNoTests'
            }
            post {
                failure {
                    script {
                        env.ACTUAL_FAILED_STAGE = env.STAGE_NAME
                    }
                }
            }
        }

        stage('Vulnerability Scan') {
            steps {
                script {
                    echo "Running npm audit..."

                    bat 'npm audit --json > audit.json & exit /b 0'

                    def vulnCount = powershell(
                        returnStdout: true,
                        script: """
                        \$audit = Get-Content audit.json | ConvertFrom-Json
                        \$v = \$audit.metadata.vulnerabilities
                        (\$v.low + \$v.moderate + \$v.high + \$v.critical)
                        """
                    ).trim()

                    env.VULN_COUNT = vulnCount ?: "0"

                    echo "Total vulnerabilities: ${env.VULN_COUNT}"
                }
            }
            post {
                failure {
                    script {
                        env.ACTUAL_FAILED_STAGE = env.STAGE_NAME
                    }
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend-react') {
                    echo "Installing frontend dependencies..."
                    bat 'npm install'
                    echo "Building frontend..."
                    bat 'npm run build'
                }
            }
            post {
                failure {
                    script {
                        env.ACTUAL_FAILED_STAGE = env.STAGE_NAME
                    }
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

                def failedStage = ""
                def logExcerpt = ""

                if (status == "FAILURE") {
                    status = "FAILED"

                    failedStage = env.ACTUAL_FAILED_STAGE ?: "Unknown"

                    def rawLog = currentBuild.rawBuild.getLog(60).join("\n")

                    def sanitized = rawLog
                        .replaceAll(/(?i)(api[_-]?key|token|secret|password)\s*[:=]\s*\S+/, '$1: [REDACTED]')
                        .replaceAll(/(?i)(mongodb(\+srv)?:\/\/)[^\s]+/, '$1[REDACTED]')

                    if (sanitized.length() > 1800) {
                        sanitized = sanitized.take(1800) + "... [truncated]"
                    }
                    logExcerpt = sanitized
                }

                echo "Sending pipeline metrics..."

                def payload = groovy.json.JsonOutput.toJson([
                    branch         : branch,
                    buildTime      : buildTime,
                    status         : status,
                    vulnerabilities: vulnerabilities as Integer,
                    failedStage    : failedStage,
                    logExcerpt     : logExcerpt
                ])

                writeFile file: 'payload.json', text: payload

                bat 'curl -X POST http://localhost:5000/api/pipeline -H "Content-Type: application/json" -d @payload.json'
            }
        }

    }
}