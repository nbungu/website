#!/bin/bash

echo "D1. START Website in DEVELOPMENT MODE"
echo "D2. START Strapi in DEVELOPMENT MODE"

echo "B1. BUILD Website for DEPLOYMENT"
echo "B2. BUILD Strapi for DEPLOYMENT"

echo "S. DEPLOY Website + Strapi using PM2"

read -p "Enter your choice: " choice

if [ "$choice" == "D1" ]; then
    echo "START Website in DEVELOPMENT MODE"
    cd ~/website/server || exit 1
    npm run dev
elif [ "$choice" == "D2" ]; then
    echo "START Strapi in DEVELOPMENT MODE"
    cd ~/strapiCMS || exit 1
    npm run develop
elif [ "$choice" == "B1" ]; then
    echo "BUILD Website for DEPLOYMENT"
    cd ~/website/server || exit 1
    npm run client:prod
elif [ "$choice" == "B2" ]; then
    echo "BUILD Strapi for DEPLOYMENT"
    cd ~/strapiCMS || exit 1
    npm run build
elif [ "$choice" == "S" ]; then
    echo "DEPLOY Website + Strapi using PM2"
    cd ~/website/server || exit 1
    pm2 start ecosystem.config.js && pm2 save
else
    echo "Invalid choice!"
fi
