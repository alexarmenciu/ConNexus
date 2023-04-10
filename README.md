# COMP 555 Project Group 8

This is the repository for COMP 555 Project Group 8. The project is a web contact manager. The project uses a React frontend, Node.js backend, and MongoDB database.

## Project Structure

The project is structured as follows:

- `Backend` - The backend code for the project. This is a Node.js project.
- `Frontend` - The frontend code for the project. This is a React project.

## Setup

- Install [Node.js](https://nodejs.org/en/download/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/). This is for running the database locally. If you want to use a remote database, you can skip this step.

Run the following commands in the `Backend` directory:

```bash
npm install
npm start
```

Run the following commands in the `Frontend` directory:

```bash
npm install
npm start
```

Since all the data in the database is encrypted, you will need to create a master key to encrypt the data. To do this, run the following command in the `Backend` directory:

```bash
node createMasterKey.js
```

If you want to run the server using our remote database, you will need to create the .encryption.key file in the `Backend` directory. This file contains the master key for the remote database. You can ask [wassim](#authors-and-acknowledgment) for the master key.

## Code Documentation

For the jsdoc documentation, please refer to the [backend docs](BackEnd/doc/index.html) and [frontend docs](FrontEnd/doc/index.html).
As Gitlab Pages are not enabled for this repository, the best way to view the documentation is to clone the repository and open the index.html files in a browser.

## Authors and acknowledgment

- Wassim Wazzi: wassim.wazzi@mail.mcgill.ca
- Leo Chen: leo.chen@mail.mcgill.ca
- Alex Armenciu: alexandru.armenciu@mail.mcgill.ca
- Dijian Guo: dijian.guo@mail.mcgill.ca
