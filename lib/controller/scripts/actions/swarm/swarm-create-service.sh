#!/bin/bash

###
# create docker swarm service
###

if [[ $# -ne 3 ]];
then
  echo "invalid arguments"
	exit -1
fi

REGISTRY="52.187.69.164:5000"


SERVICENAME="$1"

DOCKER_IMAGE="$2"

REPLICA_COUNT="$3"

NETWORK_OVERLAY="gamma-network"

docker service create --replicas $REPLICA_COUNT --network $NETWORK_OVERLAY --name $SERVICENAME $REGISTRY/$DOCKER_IMAGE
