# Copyright (c) 2015 Animus Argentina
# Author: Tony DiCola - Ivan Roth
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
import sys
import time
import pygame
import urllib2
import os
import Adafruit_MPR121.MPR121 as MPR121

# Thanks to Scott Garner & BeetBox!
# https://github.com/scottgarner/BeetBox/

print 'Adafruit MPR121 Capacitive Touch Audio Player Test'

# Create MPR121 instance.
cap = MPR121.MPR121()

# Initialize communication with MPR121 using default I2C bus of device, and
# default I2C address (0x5A).  On BeagleBone Black will default to I2C bus 0.
if not cap.begin():
    print 'Error initializing MPR121.  Check your wiring!'
    sys.exit(1)

# Alternatively, specify a custom I2C address such as 0x5B (ADDR tied to 3.3V),
# 0x5C (ADDR tied to SDA), or 0x5D (ADDR tied to SCL).
#cap.begin(address=0x5B)

# Also you can specify an optional I2C bus with the bus keyword parameter.
#cap.begin(bus=1)

pygame.mixer.pre_init(44100, -16, 2, 512)
pygame.init()

AUDIO_MUSIC_PATH = '/home/pi/rpi-game-follow-music/app/audio'
AUDIO_MUSIC_TYPE_0 = AUDIO_MUSIC_PATH  + '/wav'
AUDIO_MUSIC_TYPE_1 = AUDIO_MUSIC_PATH  + '/banjo'
AUDIO_MUSIC_TYPE_2 = AUDIO_MUSIC_PATH  + '/cello'
AUDIO_MUSIC_TYPE_3 = AUDIO_MUSIC_PATH  + '/piano'





# SOUNDS MAPPING

# Define mapping of capacitive touch pin presses to sound files
# tons more sounds are available in / and
# /usr/share/scratch/Media/Sounds/
SOUND_MAPPING_0 = {
  0:  AUDIO_MUSIC_TYPE_0 + '/DO.wav',
  1:  AUDIO_MUSIC_TYPE_0 + '/RE.wav',
  2:  AUDIO_MUSIC_TYPE_0 + '/MI.wav',
  3:  AUDIO_MUSIC_TYPE_0 + '/FA.wav',
  4:  AUDIO_MUSIC_TYPE_0 + '/SOL.wav',
  5:  AUDIO_MUSIC_TYPE_0 + '/LA.wav',
  6:  AUDIO_MUSIC_TYPE_0 + '/SI.wav',
  7:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  8:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  9:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  10: '/opt/sonic-pi/etc/samples/perc_bell.wav',
  11: '/opt/sonic-pi/etc/samples/perc_bell.wav',
}
sounds_0 = [0,0,0,0,0,0,0,0,0,0,0,0]

for key,soundfile in SOUND_MAPPING_0.iteritems():
        sounds_0[key] =  pygame.mixer.Sound(soundfile)
        sounds_0[key].set_volume(1);



SOUND_MAPPING_1 = {
  0:  AUDIO_MUSIC_TYPE_1 +  '/DO.wav',
  1:  AUDIO_MUSIC_TYPE_1 +  '/RE.wav',
  2:  AUDIO_MUSIC_TYPE_1 +  '/MI.wav',
  3:  AUDIO_MUSIC_TYPE_1 +  '/FA.wav',
  4:  AUDIO_MUSIC_TYPE_1 +  '/SOL.wav',
  5:  AUDIO_MUSIC_TYPE_1 +  '/LA.wav',
  6:  AUDIO_MUSIC_TYPE_1 +  '/SI.wav',
  7:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  8:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  9:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  10: '/opt/sonic-pi/etc/samples/perc_bell.wav',
  11: '/opt/sonic-pi/etc/samples/perc_bell.wav',
}
sounds_1 = [0,0,0,0,0,0,0,0,0,0,0,0]

for key,soundfile in SOUND_MAPPING_1.iteritems():
        sounds_1[key] =  pygame.mixer.Sound(soundfile)
        sounds_1[key].set_volume(1);


SOUND_MAPPING_2 = {
  0:  AUDIO_MUSIC_TYPE_2 +  '/DO.wav',
  1:  AUDIO_MUSIC_TYPE_2 +  '/RE.wav',
  2:  AUDIO_MUSIC_TYPE_2 +  '/MI.wav',
  3:  AUDIO_MUSIC_TYPE_2 +  '/FA.wav',
  4:  AUDIO_MUSIC_TYPE_2 +  '/SOL.wav',
  5:  AUDIO_MUSIC_TYPE_2 +  '/LA.wav',
  6:  AUDIO_MUSIC_TYPE_2 +  '/SI.wav',
  7:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  8:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  9:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  10: '/opt/sonic-pi/etc/samples/perc_bell.wav',
  11: '/opt/sonic-pi/etc/samples/perc_bell.wav',
}
sounds_2 = [0,0,0,0,0,0,0,0,0,0,0,0]

for key,soundfile in SOUND_MAPPING_2.iteritems():
        sounds_2[key] =  pygame.mixer.Sound(soundfile)
        sounds_2[key].set_volume(1);


SOUND_MAPPING_3 = {
  0:  AUDIO_MUSIC_TYPE_3 +  '/DO.wav',
  1:  AUDIO_MUSIC_TYPE_3 +  '/RE.wav',
  2:  AUDIO_MUSIC_TYPE_3 +  '/MI.wav',
  3:  AUDIO_MUSIC_TYPE_3 +  '/FA.wav',
  4:  AUDIO_MUSIC_TYPE_3 +  '/SOL.wav',
  5:  AUDIO_MUSIC_TYPE_3 +  '/LA.wav',
  6:  AUDIO_MUSIC_TYPE_3 +  '/SI.wav',
  7:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  8:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  9:  '/opt/sonic-pi/etc/samples/perc_bell.wav',
  10: '/opt/sonic-pi/etc/samples/perc_bell.wav',
  11: '/opt/sonic-pi/etc/samples/perc_bell.wav',
}
sounds_3 = [0,0,0,0,0,0,0,0,0,0,0,0]

for key,soundfile in SOUND_MAPPING_3.iteritems():
        sounds_3[key] =  pygame.mixer.Sound(soundfile)
        sounds_3[key].set_volume(1);





# Main loop to print a message every time a pin is touched.
print 'Press Ctrl-C to quit.'
last_touched = cap.touched()

# serverIP = "192.168.0.101:2323"
serverIP = "localhost:2323"
soundtype = 3

while True:
    current_touched = cap.touched()
    # Check each pin's last and current state to see if it was pressed or released.
    for i in range(12):
        # Each pin is represented by a bit in the touched value.  A value of 1
        # means the pin is being touched, and 0 means it is not being touched.
        pin_bit = 1 << i
        # First check if transitioned from not touched to touched.
        if current_touched & pin_bit and not last_touched & pin_bit:
            from random import randint
            print soundtype
	    if soundtype == 0 :
                sounds_0[i].play()
 	    elif soundtype == 1 :
                sounds_1[i].play()
 	    elif soundtype == 2 :
                sounds_2[i].play()
            else:
                sounds_3[i].play()
            urllib2.urlopen('http://'  + serverIP  + '/touched/' +  format(i))
        # Next check if transitioned from touched to not touched.
        if not current_touched & pin_bit and last_touched & pin_bit:
             print '{0} released!'.format(i)
	     if i == 7 :
		soundtype = 0
	     if i == 8 :
		soundtype = 1
	     if i == 9 :
		soundtype = 2
	     if i == 10 :
		soundtype = 3
    # Update last state and wait a short period before repeating.
    last_touched = current_touched
    time.sleep(0.1)
