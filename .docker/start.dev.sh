#!/bin/bash

if [ ! -f "./../src/common/envs/development.env" ]; then
    cp ./../src/common/envs/.env.example ./../src/common/envs/development.env
fi
