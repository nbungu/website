#!/bin/bash

# home dir
cd ~
# Change directory to website/server
cd websiteCMS || exit 1

echo "Select an option:"
echo "1. Start StrapiCMS in DEVELOPMENT MODE"
echo "2. BUILD + START StrapiCMS for PRODUCTION MODE"
echo "3. Only BUILD StrapiCMS for PRODUCTION MODE"

read -p "Enter your choice (1 or 2): " choice

if [ "$choice" == "1" ]; then
    echo "Start StrapiCMS in DEVELOPMENT MODE..."
    npm run develop
elif [ "$choice" == "2" ]; then
    echo "BUILD + START StrapiCMS for PRODUCTION MODE..."
    # Runs cmds sequentially
    npm run build && npm run start:prod
elif [ "$choice" == "3" ]; then
    echo "BUILD StrapiCMS for PRODUCTION MODE..."
    npm run build
else
    echo "Invalid choice. Please enter 1 or 2."
fi
