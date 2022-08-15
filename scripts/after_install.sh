#!/bin/bash

#give permission for everything in the next-app directory
sudo chmod -R 777 /home/ec2-user/next-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/next-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)