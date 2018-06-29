var axios = require('axios');
var config = require('./config');

var base_url = config.API_BASE_URL

function get(token, url,params,options){

        return axios.request({
                method: 'get', 
                url: base_url + url,params,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                ...options
            }, params)
}

function getUser(token){
    return new Promise(function(resolve,reject){
        if (token){
           return get(token, '/2/users/me.json').then(function(result){
                if (result.data){
                    var record = result.data;
                    var item = record.data;
                    return resolve(item.attributes);
                } 
                return reject('Error: failed to load profile data')
            }).catch(reject)
        }
        return reject('Error: No token')    
    })    
}

module.exports = {
    get: get,
    getUser: getUser
}