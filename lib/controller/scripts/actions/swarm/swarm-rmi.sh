#!/bin/bash

###
# Script for removing unused docker images
###

###
# eval docker machine
###

FILEPATH="$1"

IMAGE_NAME="$2"

for hostname in `sed '/#.*/d' $FILEPATH  | awk '{print $2}'`
do
  echo "get into swarm node - $hostname"
  eval "$(docker-machine env $hostname)"

  #remove image
  docker rmi $IMAGE_NAME
done
