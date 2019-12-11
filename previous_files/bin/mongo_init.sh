#!/bin/bash
curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.2.1.tgz
tar -xvzf mongodb-macos-x86_64-4.2.1.tgz
mv mongodb-macos-x86_64-4.2.1 mongodb
rm -rf mongodb-macos-x86_64-4.2.1.tgz
rm -rf mongodb-macos-x86_64-4.2.1