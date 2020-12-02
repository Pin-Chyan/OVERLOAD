# setup 

1) make a .env file
2) open the .env and add these lines to it :

HOST=localhost
HOSTPORT=5001 (port the node server is hosted on)
DBPORT=3306 (this is the default sql port)
DBUSER=*your sql username*
PASS=*your sql user pass*
DB=*name of the database*

3) run node install
4) run node init (this will build the tables specified insite the table object);