#!/bin/bash

###
# Script for removing unused docker images
###

###
# eval docker machine
###

FILEPATH="$1"

IMAGE_NAME="$2"

while IFS=\t read -r ip hostname
do
  if [ ! -z "$ip" ]; then
    [[ "$ip" =~ ^#.*$ ]] && continue

    echo "get into swarm node - $hostname"
    eval "$(docker-machine env $hostname)"

    #remove image
    docker rmi $IMAGE_NAME

  fi
done < "$FILEPATH"
