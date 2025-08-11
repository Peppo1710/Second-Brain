we are using nginx for load balancing and also setting up multiple instance of this project 
pm2 start server.js -i 2 we are using this for running multiple instance 

pm2 start server.js --name server1 --env PORT=3001
pm2 start server.js --name server2 --env PORT=3002
# Add more as needed

btw pm2 can be a load balancing itself if it is launched in cluster . 
but still we are gonna use nginx

pm2 start ecosystem.config.js
 we are putting this in this file 