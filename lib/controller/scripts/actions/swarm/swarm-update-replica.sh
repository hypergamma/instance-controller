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

docker service update --replicas $REPLICA_COUNT $SERVICENAME
