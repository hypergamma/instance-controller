#!/bin/sh

function exit_with_code() {
	exit $1
}

function usage() {
	echo "./build_image.sh image_name dockerfile_root"
}

if [[ $# -ne 2 ]];
then
	usage;
	exit_with_code -1 ## invalid arguments
fi

### variable
image_name=$1
dockerfile_root=$2

REGISTRY="52.187.69.164:5000"

# build image
docker build -t ${REGISTRY}/$image_name $dockerfile_root -f $dockerfile_root/Dockerfile

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