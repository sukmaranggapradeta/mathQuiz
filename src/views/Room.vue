<template>
  <div class="container">
        <audio loop autoplay>
      <source src="../../public/Fun-video-game-app-music.mp3" type="audio/mpeg">
    </audio>
    <RoomList></RoomList>
    <router-view/>
  </div>
</template>

<script>
import RoomList from "../components/RoomList.vue";

export default {
  components: {
    RoomList
  },
  created() {
    // console.log(localStorage.getItem('username_tebakgambar'))
    // if(localStorage.getItem('username_tebakgambar') === null){
    //   this.$router.push('/')
    // }else {
    //   this.$router.push('/rooms')
    // }
  }
};
</script>