#!/bin/bash

###
# create docker swarm service
###

if [[ $# -ne 3 ]];
then
  echo "invalid arguments"
	exit -1
fi

SERVICENAME="$1"

DOCKER_IMAGE="$2"

REPLICA_COUNT="$3"

NETWORK_OVERLAY="gamma-network"

sudo docker service create --replicas $REPLICA_COUNT --network $NETWORK_OVERLAY --name $SERVICENAME $DOCKER_IMAGE
