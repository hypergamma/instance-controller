#!/bin/bash

function exit_with_code() {
	# remove working directory
	rm -r $2
	exit $1
}

function usage() {
	echo "./build_image.sh image_name dockerfile_root code_path env env_ver"
}

### variable

current_time=$(date "+%Y.%m.%d-%H.%M.%S")
image_name=$1
dockerfile_root=$2
code_path=$3
env=$4
env_ver=$5
nuser=$6
nfunc=$7

#if [[ $PRODUCTION_GAMMA = "production" ]];
#then
    REGISTRY="52.187.69.164:5000"
    code_full_path=/mnt/functions/$code_path
#else
#    REGISTRY="0.0.0.0:5000"
#   code_full_path=/Users/miri/nginxroot/$code_path
#fi

work_dir=$dockerfile_root$image_name.$current_time

# create working directory
mkdir $work_dir
mkdir $work_dir/code

cp $dockerfile_root/Dockerfile $work_dir/Dockerfile

if [[ $# -ne 7 ]];
then
	usage;
	exit_with_code -1 $work_dir ## invalid arguments
fi

# get code
cp $code_full_path/index.js $work_dir/code/

# get user library
#cp $code_full_path/lib.zip $work_dir/code

# unpacking..
#tar -xvf $work_dir/code/lib.zip -C $work_dir/code

# check code valid
if [[ $? -ne 0 ]];
then
    exit_with_code -2 $work_dir ## get code failed
fi

# base (FROM) change
sed "s/{{env}}/$env/" $work_dir/Dockerfile > $work_dir/Dockerfile.1
sed "s/{{env_ver}}/$env_ver/" $work_dir/Dockerfile.1 > $work_dir/Dockerfile.2
sed "s/{{registry}}/$REGISTRY/" $work_dir/Dockerfile.2 > $work_dir/Dockerfile.final
rm $work_dir/Dockerfile.1
rm $work_dir/Dockerfile.2

# build image
docker build --build-arg code=code --build-arg nfunc=$nfunc --build-arg nuser=$nuser -t ${REGISTRY}/$image_name $work_dir -f $work_dir/Dockerfile.final

# check build success
if [[ $? -ne 0 ]];
then
	exit_with_code -3 $work_dir  ## build image failed
fi

# image push
docker push ${REGISTRY}/$image_name

# check push success
if [[ $? -ne 0 ]];
then
	exit_with_code -4 $work_dir  ## image push failed
fi

exit_with_code 0 $work_dir
