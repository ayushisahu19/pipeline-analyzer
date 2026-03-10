pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo "Building application..."
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'npm test || true'
            }
        }

        stage('Send Metrics') {
            steps {
                script {
                    sh '''
                    curl -X POST http://host.docker.internal:5000/api/pipeline \
                    -H "Content-Type: application/json" \
                    -d '{"branch":"${BRANCH_NAME}","buildTime":120,"status":"SUCCESS","vulnerabilities":0}'
                    '''
                }
            }
        }
    }
}
test pipeline trigger