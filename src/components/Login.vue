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
    <audio loop autoplay>
      <!-- <source src="../../public/Fun-video-game-app-music.mp3" type="audio/ogg"> -->
      <source src="../../public/Fun-video-game-app-music.mp3" type="audio/mpeg">
      <!-- Your browser does not support the audio element. -->
    </audio>
  </div>
</template>

<script>
import db from "../config/firebase";

export default {
  data() {
    return {
      input_user_name: "",
    };
  },
  methods: {
    add_username() {
      if(this.input_user_name !== ''){
        localStorage.setItem("username", this.input_user_name);
        this.input_user_name = ""
        this.$router.push('/rooms')
      } else {
        this.$refs.input_user_name.focus()
        console.log('else')
      }
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
/* #bg {
  position: fixed; 
  top: 0; 
  left: 0; 

  /* Preserve aspet ratio */
  /* min-width: 100%;  <source src="horse.ogg" type="audio/ogg">

  min-height: 100%;
} */ 
/* #bg {
  position: fixed; 
  top: -50%; 
  left: -50%; 
  width: 100%; 
  height: 100%;
}
#bg img {
  position: inherit; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  margin: auto; 
  min-width: 100%;
  min-height: 80%;
} */
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
