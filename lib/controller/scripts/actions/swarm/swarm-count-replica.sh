#!/bin/bash

###
# count current docker swarm replicas
###

if [[ $# -ne 1 ]];
then
  echo "invalid arguments"
	exit -1
fi

SERVICENAME="$1"

docker service inspect $SERVICENAME -f "{{ .Spec.Mode.Replicated.Replicas }}"
