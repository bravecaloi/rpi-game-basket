Game 1
===================

#RUN
- Terminal 1: sudo python rpi-game-1/app/python/sound.py
- Terminal 2: sudo nw rpi-game-1/


#INSTALL
- sudo apt-get install curl
- curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -

- sudo apt-get install --yes nodejs

- npm install -g --ignore-scripts nw@0.12.0
- sudo su
- export NWJS_URLBASE=https://github.com/jtg-gg/node-webkit/releases/download/nw-v
- nw
- exit


#PYTHON
- sudo apt-get install build-essential python-dev python-smbus python-pip git
- git clone https://github.com/adafruit/Adafruit_Python_MPR121.git
- cd Adafruit_Python_MPR121
- sudo python setup.py install

- sudo python rpi-adafruit-listener.py


#LESS
- lessc --clean-css app/less/template.less app/css/styles.min.css
