# Prerequisites
For all commands and scripts to work, we need some prerequisites...

## Assign static IP to Raspberry within the local Network:
For comfortable **SSH** and **VSCode Remote Explorer** access, make the IPv4 of the Raspberry Server static.
'Statisches DHCP - Heimnetzwerk' -> pi: **192.168.0.160**
> IPv6 address of the Raspberry Pi is not affected of this setting and will most likely change every 1 - 3 days!

## When cloning repo of the Website and StrapiCMS
For each of the following directories, reinstall node_modules, since they are not being tracked by git:
- website/server
- website/client
- strapiCMS

	npm i

This reinstalls the node modules based on the specified package.json file(s)

## Install nvm to manage installation of specific Node versions

## Modify Server Scripts in package.json
In the following steps we need some server scripts to start the server and the React frontend in different Modes, based on development or produciton stage. PM2 will also be using some of those.

> website/server/package.json

    "scripts": {
	    "dev": "concurrently \"npm run server:dev\"  \"npm run client:dev\"",
	    "server:dev": "node --env-file=development.env server.js",
	    "server:prod": "node --env-file=production.env server.js",
	    "client:dev": "NODE_ENV=development npm start --prefix ../client",
	    "client:prod": "NODE_ENV=production npm run build --prefix ../client"
    },

> strapiCMS/package.json

	"scripts": {
		"develop": "NODE_ENV=development strapi develop",
		"start:dev": "NODE_ENV=development strapi start",
		"start:prod": "NODE_ENV=production strapi start",
		"build": "NODE_ENV=production strapi build",
		"strapi": "strapi"
	},

# Setup Steps for Deployment

## Docs

|                  |Deployment                   |
|------------------|-----------------------------|
|React						 |https://create-react-app.dev/docs/deployment/ |
|Node.js/Express.js|https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment |
|Strapi CMS				 |https://strapi.io/blog/how-to-deploy-a-strapi-application|


  

## Set DNS Entry
This links the domain 'eisbuaba-adelberg.de' to the public IP of the router or any globally routable IPv6, like the address of the Raspberry Pi server.
> Manage the eisbuaba-adelberg.de domain under GoDaddy.com
### Manage DNS Entries
- 'A' Entry for IPv4 addresses -> public IP of Home Router
- 'AAAA' Entry for IPv6 addresses -> public IP of Raspberry Pi possible since IPv6 is globally routable
> When using IPv6 do directly link the domain to the Raspberry Pi Server: If you have a router between the internet and your Raspberry Pi, you may still need to configure the router to allow IPv6 traffic to be forwarded to your Raspberry Server. See Section: ***IPv6 Host Exposure***

## Local Router Port-Forwarding (IPv6 Host Exposure):
Incoming HTTP/HTTPS requests from the Internet to the the router (**Port 80 when HTTP**, **Port 443 when HTTPS**) are being forwarded to the Raspberry Server.
> Since the local webserver runs on a sepecific port (:3000) and is not available under just the IP address, we need a reverse proxy to refer to this specific port. See Section: ***Configuring Nginx as a reverse proxy server***
  

## Manage Rasperry Pi Firewall:

    ufw allow 80/tcp   # HTTP Requests
    ufw allow 443/tcp  # HTTPS Requests
    ufw allow 1337 		 # Strapi CMS Requests
**KEEP SSH!**

    ufw allow 22/tcp	# same as 'sudo ufw allow ssh' 
    ufw allow from 192.168.0.160 to any port 22
    ufw status

  
## Configuring Nginx as a reverse proxy server

HTTP/HTTPS requests to the Raspberry server, e.g. 192.168.0.160 (IPv4) or [2a02:8070:886:660::7044] (IPv6), are handled by the nginx server and then being proxied to localhost:3000 (where the Webserver is running on locally)

    sudo apt install nginx
    sudo nano /etc/nginx/sites-available/node-server.conf
  
For this configuration in production mode, the **Node.js Server must run on Port 3000**. Check Node.js .env files for the correct assignment for the production stage. Only in development mode the Node.js server runs on Port 3001 and the React frontend has Port 3000.

> /etc/nginx/sites-available/node-server.conf:

    server {
        server_name 192.168.0.160 [2a02:8070:886:660::7044] eisbuaba-adelberg.de www.eisbuaba-adelberg.de;
    
	    # redirects to local server
	    location / {
		    proxy_pass http://127.0.0.1:3000;
		    proxy_set_header Host $host;
		    proxy_set_header X-Real-IP $remote_addr;
		    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		    proxy_set_header X-Forwarded-Proto $scheme;
	    }
	    # redirects /strapi to strapi server 
	    location /strapi/ {
		    proxy_pass http://127.0.0.1:1337/;
	    }
	    location /strapi/admin {
		    proxy_pass http://127.0.0.1:1337/admin;
	    }
	    location /strapi/api {
		    proxy_pass http://127.0.0.1:1337/api;
	    }
	    location /strapi/uploads {
		    proxy_pass http://127.0.0.1:1337/uploads;
	    }
		location /strapi/assets {
		    proxy_pass http://127.0.0.1:1337/assets;
	    }
		# Auto generated by Certbot
	    listen [::]:443 ssl ipv6only=on; # managed by Certbot
	    listen 443 ssl; # managed by Certbot
	    ssl_certificate /etc/letsencrypt/live/eisbuaba-adelberg.de/fullchain.pem; # managed by Certbot
	    ssl_certificate_key /etc/letsencrypt/live/eisbuaba-adelberg.de/privkey.pem; # managed by Certbot
	    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }

- listen instructs the server to listen on port 443 for incoming requests (HTTPS).
- server_name specifies the domain names to which this server block will respond.
- location defines what the server should do with each incoming request.
- proxy_pass instructs the server to forward requests to another location, in this case to http://127.0.0.1:3000/ (= http://localhost:3000/)

  

**Activate the virtual host configuration**
   
    sudo ln -s /etc/nginx/sites-available/node-server.conf /etc/nginx/sites-enabled/

**Test the configuration**

    sudo nginx -t

**Restart the Nginx server**

    sudo systemctl reload nginx

**Check if running**

    systemctl status nginx

 **Add firewall rule**

    sudo ufw allow 'Nginx Full'

**Test if it works**

    curl -I http://192.168.0.160

> Expected result:

    $
    HTTP/1.1 200 OK
    Server: nginx/1.18.0 (Ubuntu)
    Date: Thu, 07 Dec 2023 20:21:27 GMT
    Content-Type: text/html; charset=UTF-8
    Content-Length: 854
    Connection: keep-alive
    X-Powered-By: Express
    Accept-Ranges: bytes
    Cache-Control: public, max-age=0
    Last-Modified: Thu, 07 Dec 2023 20:19:42 GMT
    ETag: W/"356-18c45efa4d2"

## Strapi CORS Setup
*X-Origin-Requests or cross-origin-requests*

To allow fetching content from Strapi by different Origins/IPs.

- With X-Origin disallowed: Only **localhost**:3000 (default react frontend) can fetch from **localhost**:1337 (default strapi backend), because they both have the SAME origin: localhost.
- With X-Origin allowed: **192.168.0.160** (Server address without port after use of reverse proxy) can fetch from **localhost**:1337.

> websiteCMS/config/middlewares.js

      {
      	name:  'strapi::cors',
      	config: {
      		headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      		origin: [
      			'*',
      		],
      		methods: ['GET', 'POST', 'PUT', 'DELETE'],
      		keepHeaderOnError:  true,
      	}
      },

After development, replace **Allow-All Origins ('*')** with elements of this list:

 - 'http://localhost:3000',
 - 'http://localhost:1337',
 - 'http://127.0.0.1:3000', 
 - 'http://127.0.0.1:1337',
 - 'http://[2a02:8070:886:660::c9f8]', # IPv6 of pi server
 - 'http://[2a02:8070:886:660::c9f8]:3000',
 - 'http://[2a02:8070:886:660::c9f8]:1337',
 -  'http://192.168.0.160', # IPv4 LAN Address of pi server
 - 'http://192.168.0.160:3000',
 - 'http://192.168.0.160:1337'

> Port 3000 IPs are origins without reverse proxy or in local development.
> No Port IPs are origins after reverse proxy
> Port 1337 IPs to Allow Access to Strapi Dashboard
  
 
## Modify Strapi Base URL

By default, the Strapi Base-URL is http://localhost:1337. In production environment this does not work due to two facts:

- The Base-URL is not available from clients connection via Internet, since **localhost** refers to a relative **location on the Raspberry Server**, and not the localhost of every clients device! We need a globally available Strapi Base URL!
- The Base-URL **is not secured by HTTPS** (SSL) and therefore will be not available since our domain is HTTPS secured. Browsers will throw a **Blocked Mixed Content Error** when trying to fetch from a HTTP connection!

Put the Strapi CMS behind the SSL secured HTTPS connection of *https://eisbuaba-adelberg.de*. Otherwise Browsers will **block Mixed Content** due to the static content of the Website being loaded via **HTTPS** and database queries being loaded via **HTTP**.
> websiteCMS/config/server.js

    module.exports  = ({ env }) => ({
		host:  env('HOST', '0.0.0.0'),
		port:  env.int('PORT', 1337),
		url:  env('NODE_ENV') === 'development' ? '' : 'https://eisbuaba-adelberg.de/strapi', // for generating absolute URLs for content based on this URL
		app: {
			keys:  env.array('APP_KEYS'),
		},
		webhooks: {
			populateRelations:  env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
		},
	});

...retrieve the value of the 'HOST' environment variable. If the 'HOST' environment variable is not set, it defaults to '0.0.0.0'

It's important to note that this configuration (url etc.) is used by Strapi internally
and does not affect the reverse proxy configuration in Nginx directly.

The Nginx reverse proxy configuration, as mentioned in the previous response,
determines how requests to https://eisbuaba-adelberg.de/strapi and its subpaths are handled
by forwarding them to the specified backend server, in this case, http://127.0.0.1:1337.
The Strapi url property is more about how Strapi itself constructs URLs for its resources.

Don't add *BASE_URL=https://eisbuaba-adelberg.de/strapi* to the .env file in the websiteCMS root dir.

We are adding **/strapi** to avoid conflicts with requests to the main domain at **/**

> For the added routing rules, see added nginx reverse proxy entry for strapi API calls. All requests to
eisbuaba-adelberg.de/strapi/... will be proxied to localhost:1337/... on the Raspberry Server.

## Adapt Strapi Base URL used in React frontend

In production environment, every client will fetch data from the *STRAPI_CMS_URL/generated-content-url*
For example:

    http://eisbuaba-adelberg.de/strapi/api/posts/1

>website/client/src/utils/Utils.js

    # In Production/Deployment
    STRAPI_CMS_URL = 'http://eisbuaba-adelberg.de/strapi'
    
    # In Development
    STRAPI_CMS_URL = 'http://192.168.0.160:1337';


## Obtain SSL Certificate for nginx

Previously, all requests to eisbuaba-adelberg.de were blocked due to the http insecure connection

    sudo apt-get install certbot
    sudo apt-get install python3-certbot-nginx
    sudo certbot --nginx -d eisbuaba-adelberg.de -d www.eisbuaba-adelberg.de

> Let's Encrypt certificates are valid for 90 days, so it's important to set up automatic renewal

**Test the renewal process**

    sudo certbot renew --dry-run

  
## PM2 for Node server and strapi CMS
https://pm2.keymetrics.io/docs/usage/quick-start/

The ProcessManager keeps the server running even when the console is closed and restarts the server when crashed automatically.

Setup a PM2 Configuration file:
> /website/server/ecosystem.config.js

    module.exports  = {
	    apps: [
		    // Runs Node.js server (Build frontend before!)
		    {
			    name:  'eisbuaba-adelberg',
			    script:  'npm run server:prod',
			    instances:  1,
			    autorestart:  true,
			    watch:  false,
			    exec_mode:  'fork'
		    },
		    // Runs Strapi CMS server (Build Strapi before!)
		   {
			    name:  'strapi-cms',
			    script:  'npm run start --prefix ../../websiteCMS',
			    instances:  1,
			    autorestart:  true,
			    watch:  false,
			    max_memory_restart:  '1G',
			    env: {
				    NODE_ENV:  'production',
				    // Add other environment variables specific to your Strapi CMS server
			    }
		    },
	    ],
    };

**Once before starting the Website + Strapi, we need to build the static files which are being served by the Raspberry Pi Server**

- **Build** Website for Production Mode:

	    cd ~website/server/
	    npm run client:prod

- **Build** StrapiCMS for Production Mode:

	    cd ~websiteCMS/
	    NODE_ENV=production  npm  run  build

**To start the Website + Strapi run:**

    cd ~website/server/
    pm2 start ecosystem.config.js
    pm2 save

**To stop the Website + Strapi run:**

    pm2 stop all
    pm2 delete all

**Auto launches website when booting the server**

    pm2 startup

# Additional Stuff

## Optimize Metadata

>website/client/public/index.html

- Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/): to check how your link will appear when shared. WhatsApp often uses the same metadata as Facebook for link previews.

