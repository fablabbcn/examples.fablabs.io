<template>
<div>
    FabLabs.io Vue.js Demo App
    <br>
    <div v-if="hasToken">
      <div v-if="profile" class="profile">
      <img :src="profile.avatar_url"/> <br>
        {{ profile.username }}
        <table>
          <tr>
            <td>First name</td><td>{{profile.first_name}}</td>
          </tr>
          <tr>
            <td>Last name</td><td>{{profile.last_name}}</td>
          </tr>
          <tr>
            <td>Email</td><td>{{profile.email}}</td>
          </tr>
        </table>
      </div>
      <div v-else>
        Loading...
      </div>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="authenticate">Login</button>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import config from '../config'
export default {
  mounted(){
    this.loadToken()
  },
  computed:{
    ...mapGetters(['hasToken','profile'])
  },

  methods: {
    logout() {
      this.clearToken()
    },
    authenticate(){      
      document.location.href=config.LOCAL_AUTH_URL
    },
    ...mapActions(['clearToken','loadToken'])
  }
}
</script>

<style>
button {
  padding: 8px;
  background-color: palegreen;
  border-radius: 8px;
  margin: 8px;
}
.profile {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}
.profile img{
  width: 128px;
  height: 128px;
  border-radius: 128px;
}
.profile table {
  border-radius: 2px;
  width: 100%;
  padding: 8px;
  border: 1px solid #dedede;
}
.profile table td{
  text-align: left;
}
.profile table td:first-child{
  font-weight: bold
}

</style>
