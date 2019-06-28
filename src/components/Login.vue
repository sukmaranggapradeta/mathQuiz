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
    <!-- <audio loop autoplay>
      <source src="../../public/Fun-video-game-app-music.mp3" type="audio/mpeg">
    </audio> -->
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
        localStorage.setItem("username_tebakgambar", this.input_user_name);
        this.input_user_name = ""
        this.$router.push('/rooms')
      } else {
        this.$refs.input_user_name.focus()
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
</style>
