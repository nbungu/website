# Deployment for React/Nodejs:
https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production 
https://create-react-app.dev/docs/deployment/
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment

# Deployment for Strapi:
https://docs.strapi.io/dev-docs/deployment

# GoDaddy DNS Entry for eisbuaba-adelberg.de:
## Forwards all requests to eisbuaba-adelberg.de to the public IP of the router
'A' Entry -> public IP of Router

# Assign static IP to Raspberry within the local Network:
'Statisches DHCP - Heimnetzwerk' -> pi: 192.168.0.150

# Local Router Portforwarding (IPv6 Host Exposure):
## Incoming HTTP/HTTPS requests to the IP of the router (e.g. 5.146.190.193:80) are being forwarded to the pi server (192.168.0.160)
### Since the local webserver runs on port 3000 and not 80, we need a reverse proxy to refer to this specific port 
Port 80/TCP -> 192.168.0.150
Port 443/TCP -> 192.168.0.150

# Raspi Firewall:
ufw allow 80/tcp
ufw allow 443/tcp
### In dev Mode
ufw allow 3000
### In Prod Mode
ufw deny 3000
### KEEP SSH!
ufw allow 22/tcp (= sudo ufw allow ssh)
ufw allow from 192.168.0.150 to any port 22
ufw allow from 192.168.0.159 to any port 22
ufw status

# Configuring Nginx as a reverse proxy server
## HTTP/HTTPS GET requests to the pi server, e.g. 192.168.0.160, are handled by the nginx server and proxied to localhost:3000 (where the Webserver is running on)
sudo apt install nginx
sudo nano /etc/nginx/sites-available/node-server.conf

express-demo.conf:
server {
     listen 80;
     server_name 192.168.0.160 eisbuaba-adelberg.de www.eisbuaba-adelberg.de;

     location / {
         proxy_pass http://127.0.0.1:3000;
     }
}

listen instructs the server to listen on port 80 for incoming requests (HTTP).
server_name specifies the domain names to which this server block will respond.
location defines what the server should do with each incoming request.
proxy_pass instructs the server to forward requests to another location, in this case to http://127.0.0.1:3000/ (= http://localhost:3000/)

### activate the virtual host configuration
sudo ln -s /etc/nginx/sites-available/node-server.conf /etc/nginx/sites-enabled/

### Test the configuration
sudo nginx -t

### Restart the Nginx server
sudo systemctl reload nginx

### Add firewall rule
sudo ufw allow 'Nginx Full'

### Test if it works
curl -I http://192.168.0.160
Expected result:
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

# Check Strapi CORS
## To allow fetching content from Strapi by different origins/IPs.
With x-origin disallowed: only localhost:3000 (default react frontend) can fetch from localhost:1337 (default strapi backend), because they both have the SAME origin.
With x-origin allowed: 192.168.0.160 (Server address without port after reverse proxy) can fetch from localhost:1337.

# Check used strapi url in React frontend code

# Set Strapi env HOST to correct value (e.g. HOST=192.168.0.160, default is 'localhost')






