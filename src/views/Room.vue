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
    if(!localStorage.getItem('username_tebakgambar')){
      this.$router.push('/')
    }
  }
};
</script>