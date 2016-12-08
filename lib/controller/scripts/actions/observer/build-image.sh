#!/bin/bash

function exit_with_code() {
	exit $1
}

function usage() {
	echo "./build_image.sh image_name dockerfile_root nfunc nuser"
}

if [[ $# -ne 4 ]];
then
	usage;
	exit_with_code -1 ## invalid arguments
fi

### variable
image_name=$1
observer_path=$2
nuser=$3
nfunc=$4

REGISTRY="52.187.69.164:5000"

# build image
docker build --build-arg observer_path=$observer_path --build-arg nfunc=$nfunc --build-arg nuser=$nuser -t ${REGISTRY}/$image_name $observer_path -f $observer_path/Dockerfile

# check build success
if [[ $? -ne 0 ]];
then
	exit_with_code -3 ## build image failed
fi

# image push
docker push ${REGISTRY}/$image_name

# check push success
if [[ $? -ne 0 ]];
then
	exit_with_code -4 ## image push failed
fi

exit_with_code 0