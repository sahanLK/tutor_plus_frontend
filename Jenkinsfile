// TutorPlus frontend demo deployment. Non-Persistent

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ghcr.io/sahanlk/tutor_plus_frontend'
        DOCKER_REGISTRY = 'https://ghcr.io'
        GITHUB_CRED = 'GITHUB_CRED'
        VIRTUALENV_DIR = '.venv'
    }

    stages{
        stage("Checkout the Repository") {
            steps {
                script {
                    sh 'mkdir -p config'
                    sh 'mkdir -p app'
                
                    dir('config') {
                        sh 'pwd'
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: '*/main']],
                            userRemoteConfigs: [[
                                url: 'https://github.com/sahanLK/config_tutor_plus.git',
                                credentialsId: 'GITHUB_REPO_CRED'
                            ]]
                        ])
                    }

                    dir('app/frontend') {
                        sh 'pwd'
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: '*/development']],
                            userRemoteConfigs: [[
                                url: 'https://github.com/sahanLK/tutor_plus_frontend.git',
                                credentialsId: 'GITHUB_REPO_CRED'
                            ]]
                        ])
                    }

                    env.COMMIT_ID = sh(script: 'cd app/frontend && git rev-parse HEAD', returnStdout: true).trim()
                }
            }
        }

        stage("Provisioning Infrastructure") {
            steps {
                script {
                    dir('config/demo/terraform') {
                        withCredentials([string(credentialsId: 'TERRAFORM-CRED', variable: 'TF_API_TOKEN')]) {
                            withEnv(["TF_TOKEN_app_terraform_io=${TF_API_TOKEN}"]) {
                                sh 'terraform init'
                                sh 'terraform apply --auto-approve'
                                sh 'terraform output'
                                env.INSTANCE_PUBLIC_IP = sh(script: 'terraform output -raw instance_public_ip', returnStdout: true).trim()
                                echo "Instance Created: ${env.INSTANCE_PUBLIC_IP}"
                            }
                        }
                    }
                }
            }
        }

        stage("Build Dokcer image") {
            steps {
                dir('app/frontend') {
                    script {
                        if (env.COMMIT_ID == '') {
                            error("Could not fetch COMMIT_ID: ${env.COMMIT_ID}")
                        } else {
                            echo "Building image: ${IMAGE_NAME}:${env.COMMIT_ID}"
                            sh 'pwd'
                            sh 'ls'
                            docker.build("${IMAGE_NAME}:${env.COMMIT_ID}")
                        // sh "sudo docker build -t ${IMAGE_NAME}:${env.COMMIT_ID}"
                        }
                    }
                }
            }
        }

        stage("Push Docker Image") {
            steps {
                script {
                    def buildTag = "${env.BUILD_NUMBER}"

                    docker.withRegistry(DOCKER_REGISTRY, GITHUB_CRED) {
                        docker.image("${IMAGE_NAME}:${env.COMMIT_ID}").push()
                    }
                }
            }
        }

        stage('Setup Virtualenv and Install Ansible') {
            steps {
                script {
                    sh '''
                    if [ ! -d "$VIRTUALENV_DIR" ]; then
                        python3 -m venv $VIRTUALENV_DIR
                    fi
                    '''

                    sh '''
                    . $VIRTUALENV_DIR/bin/activate
                    pip install --upgrade pip
                    pip install --upgrade ansible
                    '''
                }
            }
        }

        stage("Deploying Container") {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'AWS-SSH-KEY', keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                            . $VIRTUALENV_DIR/bin/activate
                            ansible-playbook \
                                -i "${INSTANCE_PUBLIC_IP}," \
                                -u ubuntu \
                                --private-key "$SSH_KEY" \
                                --ssh-extra-args "-o StrictHostKeyChecking=no" \
                                -e "docker_image_id=${COMMIT_ID}" \
                                config/demo/ansible/playbook-frontend.yaml
                        '''
                    }

                }
            }
            
        }
    }

}
