# setup 

1) make a .env file
2) open the .env and add these lines to it :
//
HOST=localhost
HOSTPORT=5001 (port the node server is hosted on)
DBPORT=3306 (this is the default sql port)
DBUSER=*your sql username*
PASS=*your sql user pass*
DB=*name of the database*
//

3) run 'npm i'
4) run 'node init' (this will build the tables specified inside ./database/tables.json and add the default data);
5) run 'node server' 
6) open postman and make a get request to http://localhost:5001/default/testroute with a body : { "id" : 1 }
// if it returns user data everything is working

