## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Prepare environnement](#prepare-environnement)
- [Launching Project](#launching-project)
- [Proxy](#proxy)

## Introduction
This project has been developed using Angular with the goal of providing users the posibility of digitize their bills using a CaaS (Content as a Service) API. The extracted data is stored and displayed to the user inside the application. Finally, users can perform various actions on the extracted data, this can include adding a new field, updating existing values or completely removing a field if needed.

## Installation
Before using the project, a certain amount of things need to be installed.

### Node.js + NPM
(1) Download [Node.js](https://nodejs.org/en/download) installer. <br>
(2) Using **Command Prompt** or **Windows PowerShell**, check if Node.js and NPM has been successfully installed with ```node -v``` and ```npm -v```
<br> <br>
*Note: node.js installer comes with NPM installed*

### Angular CLI
(1) Install Angular CLI with ```npm install -g @angular/cli```<br>
(2) Using **Command Prompt** or **Windows PowerShell**, check if Angular CLI has been successfully installed with ```ng version```.

## Prepare environnement
When the project is cloned, the command ```npm install``` will need to be executed to import all necessary dependencies from **package.json**.

## Launching Project
To launch the project, you must run : <br>

```
ng serve (launch angular server)
node server.js (launch proxy server)
```

To note, the commands can be executed inside a CMD or a PowerShell (except **ng serve**, that command will be executed in a CMD). To open a CMD, execute the command **cmd** inside PowerShell.

In addition, the **ng serve** command should be ran inside the **readingBillsApp/** folder. The command **node server.js** will be ran inside the folder **backend-server/**. If not, the commands will not work, also meaning that the servers won't run resulting in a non functionnal application.

## Proxy
Trying to use the CaaS API without a properly configured proxy, will have you run into something called CORS (Cross-Origin Resource Sharing). When making a request to a server from a web page, the browser enforces the Same-Origin Policy which means that only requests coming from the same origin (domain, protocol and port) as the web page itself are allowed. Since we don't have access to the source code of the API, we're going to use a proxy, otherwise known as a CORS proxy or reverse proxy. The goal is to have the request sent a backend server (proxy), makes it forward the request, fetch the response, and send it back to the frontend (angular cli server). Since the frontend (angular cli) and the backend (proxy) server are from the same origin, the CORS policy does not apply.<br>

There are multiples things to be done to create this backend server. <br>

(1) Create a **proxy-config.json** file. This will contain the necessary information to forward the request to the backend server (proxy). Make note, you will need to specify on which route the proxy will be used. In this particular scenario, the proxy is only used on **/api/***<br>
(1.1) If you want, inside **package.json**, you can include this proxy config file by default when starting your server. This means that you don't have to specify the the proxy file everytime you want to start your server, a simple ```npm start``` is sufficient. <br> <br>
(2) Create the backend server. This can be done following these steps : <br>
Inside your folder of choice, run these commands : <br>
```
npm init -y
npm install express http-proxy-middleware
write server.js
```
(2.1) Run the backend server using ```node server.js```.

**To note : the proxy has already been setup. This is purely for the sake of explaining how it works.**