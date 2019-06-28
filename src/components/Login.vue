<template>
  <div class="home">
    <img src="https://images.typeform.com/images/2SbQ46yAjx4Z/image/default"
style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-5000;">
    <div class="row">
      <form @submit.prevent="add_username()" class="col s12">
        <div class="row">
          <div class="input-field col s3 center">
            <i class="material-icons prefix">account_circle</i>
            <input v-model="input_user_name" :ref="input_user_name" id="icon_prefix" type="text" class="validate">
            <label for="icon_prefix">Type Your Name Here</label>
            <button type="submit" class="btn-floating pulse red">GO</button>
          </div>
        </div>
      </form>
    </div>
    <!-- {{ members }} -->
    <!-- <audio loop autoplay>
      <source src="../../public/Fun-video-game-app-music.mp3" type="audio/mpeg">
    </audio> -->
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import db from "../config/firebase";
import { truncate, truncateSync } from 'fs';

export default {
  data() {
    return {
      input_user_name: "",
      members: []
    };
  },
  methods: {
    fetchPlayer() {
      db.collection("userstebakgambar").onSnapshot(querySnapshot => {
      let players_temp = [];
      querySnapshot.forEach(doc => {
          players_temp.push({
            id: doc.id,
            ...doc.data()
          });
      });
      this.members = players_temp;
      console.log(players_temp)
      console.log("Created invoke ");
    });
    },
    add_username() {
      if(this.input_user_name !== ''){
        let isNameUsed = false
        for (let i = 0 ; i < this.members.length ; i++){
          if(this.members[i].name === this.input_user_name){
            Swal.fire({
              type: 'info',
              title: 'Oops...',
              text: `Username already taken by another player`
            })
            isNameUsed = true
          }
        }
        if (!isNameUsed){
          console.log("add users");
          db.collection("userstebakgambar")
            .add({
              name: this.input_user_name,
            })
            .then(docRef => {
              this.input_user_name = "";
              console.log("user created", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding Room: ", error);
            });
          //kondisi
          localStorage.setItem("username_tebakgambar", this.input_user_name);
          this.input_user_name = ""
          this.$router.push('/rooms')
        }
      } else {
        Swal.fire({
          type: 'info',
          title: 'Oops...',
          text: `Please input your username`
        })
      }
    }
  },
  created () {
    this.fetchPlayer()
    console.log(localStorage.getItem('username_tebakgambar'))
    if(localStorage.getItem('username_tebakgambar') == null){
      console.log('masuk belum login')
      this.$router.push('/')
    }else {
      console.log('sudah login')
      this.$router.push('/rooms')
    }
  }
}
</script>

<style scoped>
body{
    width:100%;
    height: 100%;
    background-image: url("https://images.typeform.com/images/2SbQ46yAjx4Z/image/default");
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
