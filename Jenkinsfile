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
                sh 'php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"'
                sh 'php composer-setup.php --install-dir=/usr/local/bin --filename=composer'
                sh 'composer install'
            }
        }
      
    }
}
 