#! /bin/bash
apt-get update
sudo apt install -y xfce4 xfce4-goodies tightvncserver
export USER=/root
PASSWRD=$(curl http://metadata.google.internal/computeMetadata/v1/instance/attributes/session-id -H "Metadata-Flavor: Google")
git clone https://github.com/novnc/noVNC.git
mkdir ~/.vnc
echo "$PASSWRD" | vncpasswd -f > ~/.vnc/passwd
chmod 600 ~/.vnc/passwd
HOME=~ vncserver
cd noVNC
./utils/launch.sh --vnc localhost:5901