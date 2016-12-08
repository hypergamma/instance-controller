#!/bin/bash

###
# update docker swarm replica
###

if [[ $# -ne 2 ]];
then
  echo "invalid arguments"
	exit -1
fi

SERVICENAME="$1"

REPLICA_COUNT="$2"

REGISTRY="52.187.69.164:5000"
NETWORK_OVERLAY="gamma-network"

docker service rm $SERVICENAME

docker service create --replicas $REPLICA_COUNT --network $NETWORK_OVERLAY --name $SERVICENAME $REGISTRY/$SERVICENAME



# docker service scale $SERVICENAME=$REPLICA_COUNT
