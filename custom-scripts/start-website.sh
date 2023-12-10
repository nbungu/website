#!/bin/bash

# home dir
cd ~
# Change directory to website/server
cd website/server || exit 1

echo "1. START Website in DEVELOPMENT MODE"
echo "2. BUILD + START Website for PRODUCTION MODE"
echo "3. Only BUILD Website for PRODUCTION MODE"
echo "S. START Website + START Strapi with PM2"

read -p "Enter your choice (1 or 2 or 3): " choice

if [ "$choice" == "1" ]; then
    echo "START Website in DEVELOPMENT MODE"
    npm run dev
elif [ "$choice" == "2" ]; then
    echo "BUILD + START Website for PRODUCTION MODE without PM2"
    npm run client:prod && npm run server:prod
    # Use 'serve' as static server to serve frontend code from React (from ../client/build)
    # OR: use the expressjs server (server.js) to serve the static files in the 'build' folder.
    # npm run build && serve -s ../client/build -l 3000
elif [ "$choice" == "3" ]; then
    echo "BUILD Website for PRODUCTION MODE"
    npm run client:prod
elif [ "$choice" == "S" ]; then
    echo "START Website + START Strapi with PM2"
    pm2 start ecosystem.config.js && pm2 save
else
    echo "Invalid choice. Please enter 1,2,3 or 4."
fi