# Fablabs.io Express example

## Prerequisites

- node.js 10.x, yarn, npm
- [A valid fablabs.io Application id and secret](../README.md#getting-started)

## Getting started

You need to install dependencies first, we use Yarn for that, but also npm should work fine

```
cd express
yarn 
```

## Update environment variables

Edit the file config.js to reflect your settings, for local development, assuming you are running the docker environment, the only things you need to adjust are the client_id and client_secret.

```
module.exports = {
    API_BASE_URL: 'http://api.fablabs.local:3000' || process.env['FABLABS_IO_API_HOST'] ,
    LOCAL_AUTH_URL: "http://localhost:3001/auth/fablabs",
    client_id: '62e374fc7ddf2bca5a417543f9906e2e4cc24236fb2a2b5a0b1a1f58ade07347' || process.env['FABLABS_IO_API_KEY'],
    client_secret: '7129e9792564fc8087b361531651f87a70c2826d017fc1d02edc17864f98ea1b'|| process.env['FABLABS_IO_API_SECRET'],
    redirect_url:'http://localhost:3001/auth/callback',
    base_url:'http://api.fablabs.local:3000' || process.env['FABLABS_IO_WEB_HOST'],
    authorize_url:'/oauth/authorize',
    token_url:'/oauth/token',
    dev_host: 'http://localhost:8080'
}
```