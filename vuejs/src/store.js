import FabLabsApi from './services/fablabs'

const SET_PROFILE='SET_PROFILE'
const SET_TOKEN='SET_TOKEN'

const fablabs = new FabLabsApi()


const state = {
    token: null,
    profile: null
}

const actions = {
    async setToken({commit,dispatch}, { token,created_at }){
        localStorage.setItem('ACCESS_TOKEN', token)
        localStorage.setItem('ACCESS_TOKEN_CREATED', created_at)
        commit(SET_TOKEN, { token, created_at})
        await dispatch('loadProfile')
    },
    async loadToken({dispatch}){
        const token = localStorage.getItem('ACCESS_TOKEN')
        const created_at = localStorage.getItem('ACCESS_TOKEN_CREATED')
        if (token){
           await dispatch('setToken', {token,created_at} )
        }
    },
    async loadProfile({state,commit}){
        if (state.token && state.token.token){
            const profile = await fablabs.getUser(state.token.token)
            if(profile){
                commit(SET_PROFILE, profile)
            }
        }
    },
    setProfile({commit}, profile){
        commit(SET_PROFILE, profile)
    },
    clearToken({commit}){
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('ACCESS_TOKEN_CREATED')
        commit(SET_TOKEN, null)
        commit(SET_PROFILE, null)
    }

}

const getters = {
    token: (state) => state.token,
    hasToken: (state) => state.token ? true : false,
    isTokenExpired: (state) => {
        const expiration_delay = 1000*30*60 // 30 minutes ?
        if (!state.token) return true
        if (state.token.created_at*1000 + expiration_delay > new Date().getTime()){
            return true
        }      
        return false
    },
    profile: (state) => state.profile
}

const mutations = {
    [SET_TOKEN](state, token_data){
        state.token = token_data
    },
    [SET_PROFILE](state, profile){
        state.profile = profile
    }
}

export default {
    actions,
    mutations,
    getters,
    state
}