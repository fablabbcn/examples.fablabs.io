# Fablabs.io Vue.js example

## Prerequisites

- node.js 10.x, yarn, npm
- [A valid fablabs.io Application id and secret](../README.md#getting-started)

## Getting started

You need to install dependencies first, we use Yarn for that, but also npm should work fine

```
cd vuejs
yarn 
```

## Update environment variables

Edit the file config.js to reflect your settings, for local development, assuming you are running the docker environment, the only things you need to adjust are the client_id and client_secret.

## Start your local server for authentication

```
yarn local-auth 
```

## Start the vuejs server

```
yarn serve
```

Browse http://localhost:8080

