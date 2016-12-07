#!/bin/bash

###
# remove docker swarm service
###

if [[ $# -ne 2 ]];
then
  echo "invalid arguments"
	exit -1
fi

SERVICENAME="$1"

DOCKER_IMAGE="$2"

NETWORK_OVERLAY="gamma-network"

docker service rm $SERVICENAME

###
# swarm remove docker images
###
ABSPATH='/home/gamma/instance-controller/lib/controller/scripts/actions/swarm'
swarm_rmi $ABSPATH/conf/server-swarm-node.conf $DOCKER_IMAGE
swarm_rmi $ABSPATH/conf/server-swarm-manager.conf $DOCKER_IMAGE


function swarm_rmi() {
  FILEPATH="$1"
  IMAGE_NAME="$2"

  for hostname in `sed '/#.*/d' $FILEPATH  | awk '{print $2}'`
  do
    echo "get into swarm node - $hostname"
    eval "$(docker-machine env $hostname)"

    #remove image
    docker rmi $IMAGE_NAME
  done
}
