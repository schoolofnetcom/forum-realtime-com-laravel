pipeline {
    agent {
        docker {
            image 'php:7.3'
        }
    }
    environment {
        CI=true
        HOME='.'
    }
    stages {
        stage('Build') {
            steps {
                sh 'composer install'
            }
        }
      
    }
}
 