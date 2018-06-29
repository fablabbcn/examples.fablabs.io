# FabLabs.io Api Examples

This repository includes some examples for the Fablabs.io API in different programming languages. 

Feel free to add other examples sending PRs.

## Getting started

In order to use any of these examples you need an Application ID and Secret.

Follow the [Fablabs.io Developer Guide](http://docs.fablabs.io) to learn how to create one.

All examples run on port 3001, so make sure to specify **http://localhost:3001/auth/callback** as the redirect URL.

Once you have the credentials, you should set the following environment variables before running the examples

export FABLABS_IO_API_KEY='your key'
export FABLABS_IO_API_SECRET='your secret'

If you use a **local server**:

export FABLABS_IO_API_HOST='http://api.fablabs.local:3000'
export FABLABS_IO_WEB_HOST='http://www.fablabs.local:3000'

If you use the **staging server**

export FABLABS_IO_API_HOST='http://api.staging.fablabs.io:3000'
export FABLABS_IO_WEB_HOST='http://www.staging.fablabs.io:3000'

If you use the **production server**

export FABLABS_IO_API_HOST='http://api.fablabs.io:3000'
export FABLABS_IO_WEB_HOST='http://www.fablabs.io:3000'


## Examples index

### Javascript

- [Angular](./angular/README.md)
- [Vue.js](./vuejs/README.md) with zeit micro local auth server
- [Express](./express/README.md)

### Python

- [Flask](./flask/README.md)
