pipeline {
    agent {
        docker {
            image 'php:7.3'
        }
    }
    environment {
        CI=true
    }
    stages {
        stage('Build') {
            steps {
                sh 'composer install'
            }
        }
      
    }
}
 