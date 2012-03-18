#!/bin/bash
echo "Building unstable release."
pypy scriptGenerator/stage1.py -o GrEmBunstable.user.js GrEmB.plus.js unstable.env
echo -e "\nBuilding stable release."
pypy scriptGenerator/stage1.py -o GrEmB.user.js GrEmB.plus.js release.env