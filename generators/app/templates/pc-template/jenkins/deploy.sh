#!/bin/sh

if [ ! -d $1 ]; then
    mkdir $1
    echo 'created web dir'
fi
cd $1/
if [ `ls |wc -w` > 0 ]; then
    echo 'clean web dir'
    rm -r *
fi