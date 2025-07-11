#!/bin/bash
echo "init new build"
# npm run build
echo 'remove old build'
rm -rf ../../builds/sale/build
echo 'create new build'
cp -rf build/ ../../builds/sale/build
echo 'end'