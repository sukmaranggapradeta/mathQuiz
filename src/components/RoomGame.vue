<template>
  <div class="container">
    <h1>WAITING</h1>
    <hr>
    <h3>OR</h3>
    <hr>
    <H1>GAME START</H1>
    <div class="row">
      <div class="col m6 l6">
        <div class="card">
          <div class="card-body">
            <img :src="this.$store.state.quizzes[this.index].question" alt class="img-top">
          </div>
          <div class="card-footer">
            <input type="text" v-model="answerText" @keyup.enter="answer()">
            <a href="#" class="btn btn-sm ml-2 btn-primary" @click="answer()">Send</a>
          </div>
        </div>
      </div>
      <div class="col m6 l6">
        <div class="card">
          <div class="card-header">
            <h1>Score Board</h1>
          </div>
          <div class="card-body">
            <h3>Player List:</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <button @click="leave_room" class="btn danger">LEAVE ROOM</button>
    </div>
  </div>
</template>

<script>
import db from "../config/firebase";

export default {
  data () {
    return {
      index: 0,
      answerText: ''
    }
  },
  methods: {
    leave_room() {
      db.collection("rooms")
        .doc(localStorage.getItem("roomId"))
        .get()
        .then(doc => {
          let newPlayers = doc.data().players;
          newPlayers = newPlayers.filter(
            el => el.name !== localStorage.getItem("username_tebakgambar")
          );
          return db
            .collection("rooms")
            .doc(localStorage.getItem("roomId"))
            .update({
              players: newPlayers
            })
            .then(() => {
              console.log("Leave Room successfully!");
              localStorage.removeItem("roomId");
              this.$router.push("/rooms");
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    answer () {
      if (this.answerText.toLowerCase() === this.$store.state.quizzes[this.index].answer) {
        this.index++
        this.answerText = ''
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
}
</style>
