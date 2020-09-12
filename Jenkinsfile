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
                sh 'curl -sS https://getcomposer.org/installer -o composer-setup.php'
                sh 'php composer-setup.php'
                sh 'php composer.phar install'
            }
        }
      
    }
}
 