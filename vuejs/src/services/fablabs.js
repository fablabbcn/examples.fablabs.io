import axios from 'axios'
import config from '../config'

export default class FabLabsApi {

    base_url = config.API_BASE_URL

    async get(token, url,params,options){
        const res = await axios.request({
                method: 'get', 
                url: this.base_url + url,params,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                ...options
            }, params)
        return res
    }

    async getUser(token){
        if (token){
            try {
                const result = await this.get(token, '/2/users/me.json')
                if (result.data){
                    const record = result.data
                    const item = record.data
                    return item.attributes
                } 
            } catch(error){
                console.log(error)
                return null
            }
        }
        return null
    }


}