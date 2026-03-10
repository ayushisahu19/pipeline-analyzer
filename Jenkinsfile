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
                bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Send Metrics') {
    steps {
        bat '''
        curl -X POST http://localhost:5000/api/pipeline ^
        -H "Content-Type: application/json" ^
        -d "{\\"branch\\":\\"%BRANCH_NAME%\\",\\"buildTime\\":120,\\"status\\":\\"SUCCESS\\",\\"vulnerabilities\\":0}"
        '''
    }
}

    }
}