pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo "Building application..."
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                bat 'exit 1'
                //bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Send Metrics') {
    steps {
        script {

            def branch = env.BRANCH_NAME
            def buildTime = currentBuild.duration
            def status = currentBuild.currentResult

            bat """
            curl -X POST http://localhost:5000/api/pipeline ^
            -H "Content-Type: application/json" ^
            -d "{\\"branch\\":\\"${branch}\\",\\"buildTime\\":${buildTime},\\"status\\":\\"${status}\\",\\"vulnerabilities\\":0}"
            """

        }
    }
}

    }
}