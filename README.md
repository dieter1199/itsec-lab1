# JavaScript Express Web Server

## General

This template consists of a NodeJS web server running a sample web application based on the [Express](https://expressjs.com/) framework, the HTML templating engine [Handlebars](https://handlebarsjs.com/), and the module [express-session](https://expressjs.com/en/resources/middleware/session.html) for the management of user sessions.

The MySQL user is root
The MySQL user password is "" (empty)

Do not touch the `mariadb-data` folder if you run the project in a development container, as Docker uses this folder to store the data from the database.


## Running in a container

This template supports development containers.
This means, all dependencies and required applications are set up automatically and run inside one or more container(s) instead of directly on your machine.
This has the advantage that you don't need to install additional software (except Docker and Visual Studio Code) and you have a predefined environment, preventing unexpected behavior.
In this case, two containers are created and started: the development container and a container for the MariaDB database.
Visual Studio Code natively supports development containers.

As a requirement, you need:

- Visual Studio Code (VS Code)
- The "Remote Development" extension pack in VS Code (install it in the extensions menu in VS Code)

If you **do not** use the IT Security Lab Infrastructure, you also need:
- Docker (e.g., Docker Desktop on Windows and macOS or only docker on Linux-based distributions)

To start working, open the downloaded template as a folder in VS Code (so that the .devcontainer folder is located inside the opened folder) and follow the recommendation to open the workspace in a container.
In case you missed the recommendation, open the command palette (F1) and type "Open Folder in Container" and choose the first suggestion.

First steps (run all commands in the container using the terminal in VS Code; if it is not already visible at the bottom of the window, open it using the menu at the top):

- Only if you're **not on the IT Security Lab infrastructure**: run `npm install`
- Create a database (e.g., "ponyfarm")
  - Connect to the MariaDB server: `mariadb -h db -u root`
  - Create the database: `CREATE DATABASE ponyfarm;`
  - Select the database using the command `USE ponyfarm`
  - Create the users table (optional): `CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), name VARCHAR(255));`
  - Insert some data into the users table (optional): `INSERT INTO users (email, password, name) VALUES ('admin@example.com', 'password', 'Admin');`
  - Exit the MariaDB console by typing `exit`
- Run the NodeJS server (must be closed and opened after each change):
  - Run the command `npm run start`
  - VS Code should automatically forward the web server on the container to your machine (usually port 3000. If it does not work, look it up in VS Code)
  - You can access your website on `localhost:3000` (or another port as mentioned above)
