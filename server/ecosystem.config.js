// This is the PM2 configuration file
module.exports = {
    apps: [
        // Runs Node.js server (Build frontend before!)
        {
            name: 'eisbuaba-adelberg',
            script: 'npm run server:prod',
            instances: 1,
            autorestart: true,
            watch: false,
            exec_mode: 'fork'
        },
        // Runs Strapi CMS server (Build Strapi before!)
        {
            name: 'strapi-cms',
            script: 'npm run start:prod --prefix ../../websiteCMS',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
        },
    ],
  };

// To start the NODE.js server: $ pm2 start ecosystem.config.js
// Alternative: pm2 start server.js --name eisbuaba-website -- --env-file=production.env
// the double dashes (--) before the --env-file flag passes the flag to your script rather than PM2