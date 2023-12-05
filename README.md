Deployment for React/Nodejs:
https://create-react-app.dev/docs/deployment/
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment

Deployment for Strapi:
https://docs.strapi.io/dev-docs/deployment

GoDaddy DNS Entry for eisbuaba-adelberg.de:
A Entry -> public IP of Router

Assign static IP to Raspberry within the local Network:
'Statisches DHCP - Heimnetzwerk' -> pi-2: 192.168.0.150

Local Router Portforwarding (IPv6 Host Exposure):
Port 80/TCP -> 192.168.0.150
Port 443/TCP -> 192.168.0.150

Raspi Firewall:
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status

