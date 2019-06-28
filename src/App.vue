<template>
  <div id="app">
    <!-- <audio loop autoplay>
      <source src="../public/Fun-video-game-app-music.mp3" type="audio/mpeg">
    </audio> -->
    <div id="nav">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push('/rooms')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
