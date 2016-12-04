#!/bin/bash
# 
# ubuntu 14.04 lts
# 
# prerequisitions
sudo apt-get install htop
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get update

# install docker engine, compose, swarm
sudo apt-get install -y docker-engine=1.12.3-0~trusty
sudo service docker start
sudo curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo  chmod +x /usr/local/bin/docker-compose
sudo docker run swarm --help

# install telegraf
wget https://dl.influxdata.com/telegraf/releases/telegraf_1.1.1_amd64.deb
sudo dpkg -i telegraf_1.1.1_amd64.deb