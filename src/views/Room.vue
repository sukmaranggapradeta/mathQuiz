<template>
  <div class="container">
    <RoomList></RoomList>
    <router-view/>
  </div>
</template>

<script>
import RoomList from "../components/RoomList.vue";

export default {
  components: {
    RoomList
  }
};
</script>