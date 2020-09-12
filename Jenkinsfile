pipeline {
    agent {
        docker {
            image 'composer:2.0'
            args  ''
        }
    }
    environment {
        CI=true
        HOME='.'
    }
    stages {
        stage('Build') {
            steps {
                sh 'composer installl'
            }
        }
      
    }
}
 