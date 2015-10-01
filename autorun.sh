#!/bin/sh

GAME_PATH=/home/pi/rpi-game-basket

cd $GAME_PATH
git pull
nw $GAME_PATH &
sudo python $GAME_PATH/app/python/dynamicSound.py &
