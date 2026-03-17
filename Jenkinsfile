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
               bat 'exit 1'
               //bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Vulnerability Scan') {
    steps {
        script {

            echo "Running npm audit..."

            bat 'npm audit --json > audit.json'

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
}

    }

    post {

        always {
            script {

                def branch = env.BRANCH_NAME
                def buildTime = currentBuild.duration
                def status = currentBuild.currentResult
                def vulnerabilities = env.VULN_COUNT ?: "0"

                if (status == "FAILURE") {
                    status = "FAILED"
                }

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