const redirect = require('micro-redirect')
const querystring = require('querystring')
const axios = require('axios')
const query = require('micro-query')

const client_id = '62e374fc7ddf2bca5a417543f9906e2e4cc24236fb2a2b5a0b1a1f58ade07347' || process.env['FABLABS_IO_API_KEY']
const client_secret = '7129e9792564fc8087b361531651f87a70c2826d017fc1d02edc17864f98ea1b'|| process.env['FABLABS_IO_API_SECRET']
const redirect_url = 'http://localhost:3001/auth/callback'
const base_url = 'http://www.fablabs.local:3000' || process.env['FABLABS_IO_WEB_HOST']
const authorize_url = '/oauth/authorize'
const token_url = '/oauth/token'

const dev_host = 'http://localhost:8080'


const app_url = (data) => {
  return dev_host + '/#/?access_token=' + data.access_token + '&created_at=' + data.created_at
}

const oauth_callback = async (request,response)=>{
  const code = query(request)['code'] || null
  if (!code){
    return { error: 'Error: code parameter missing'}
  }
  try {
    const result = await axios.post( base_url + token_url, querystring.stringify({
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirect_url
    }),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    console.log(result.data)
    return redirect(response, 302, app_url(result.data)) 
    
  } catch(error) {
    if (error.response && error.response.status == 401){
      // The code is not valid any more
      // Request a new one
      return oauth_redirect(request,response)
    }
    if (error.response) {
      return {
        error: error.response.status, 
        description: error.response.statusText, 
        headers: error.response.headers
      }   
    }
    console.log(error)
    return { error: 'Error: Unknown Error'}
  }
}




const oauth_redirect = (request,response) => {
  const location =   base_url + authorize_url + '?' + querystring.stringify({
      'client_id' : client_id,
      'redirect_uri': redirect_url,
      'response_type': 'code'
  })
  const statusCode = 302
  redirect(response, statusCode,location)
}



module.exports = (request,response) => {
  // console.log(request.url)

  if (request.url.indexOf('/auth/callback')==0){
    return oauth_callback(request,response)
  } 
  if (request.url.indexOf('/auth/fablabs')==0){
    return oauth_redirect(request,response)
  }
  
}
