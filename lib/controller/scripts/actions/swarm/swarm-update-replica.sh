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

docker service scale $SERVICENAME=$REPLICA_COUNT gamma-proxy=0
docker service scale gamma-proxy=1