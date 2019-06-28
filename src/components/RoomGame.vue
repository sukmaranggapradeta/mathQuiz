<template>
    <div class="container">
        <h1>WAITING</h1>
        <hr>
        <h3>OR</h3>
        <hr>
        <H1>GAME START</H1>
        <div class="center">
            <button @click="leave_room" class="btn danger">LEAVE ROOM</button>
        </div>
    </div>
</template>

<script>
import db from "../config/firebase";

export default {
  methods: {
    leave_room() {
      db.collection("rooms")
        .doc(localStorage.getItem('roomId'))
        .get()
        .then(doc => {
          let newPlayers = doc.data().players;
          newPlayers = newPlayers.filter(el => (el.name !== localStorage.getItem('username_tebakgambar') ))
          return db
            .collection("rooms")
            .doc(localStorage.getItem('roomId'))
            .update({
              players: newPlayers
            })
            .then(() => {
              console.log("Leave Room successfully!");
              localStorage.removeItem('roomId')
              this.$router.push('/rooms')
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style>

</style>
