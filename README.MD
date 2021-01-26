Ensure you have a sql instance running before starting.
I will assume node and npm is installed your machnine.

create .env file
env file contents :
`
HOST = <ip of your pc/localhost>
WEBHOSTPORT = <port to host website>
DBPORT = <database port>
DBUSER = <database username> pitsai
PASS = <database password>
DB = <database name>
SOCKETMESSAGEPORT = <port of socket> 5002
`

run : npm install
run : node init (wait for this to finish)
run : npm start

website should be up and running
