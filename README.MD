Ensure you have a sql instance running before starting. (for example: XAMPP for linux, MAMP for windows.)
I will assume node and npm is installed your machnine.
 * `sudo apt update`
 * `sudo apt install npm`

create .env file (replace the '<tags>' with your relevant information)
env file contents :
<br>
```
HOST = <ip of your pc/localhost>
WEBHOSTPORT = <port to host website>
DBPORT = <database port>
DBUSER = <database username> 
PASS = <database password>
DB = <database name>
SOCKETMESSAGEPORT = <port of socket> 
````

 * run : `npm install`
 * run : `node init` (wait for this to finish)
 * run : `npm start`

website should be up and running
