<template>
  <div class>
    <h1>{{ players_in_room[0].room_name }}</h1>
    
    <hr>
    <h3>OR</h3>
    <hr>
    <H1>GAME START</H1>
    <div class="row">
      <div class="col s12 m7 l7">
        <div class="card">
          <div class>
            <img :src="this.$store.state.quizzes[this.index].question" alt class="img-top">
          </div>
          <div class>
            <input type="text" v-model="answerText" @keyup.enter="answer()">
            <a href="#" class="btn btn-sm ml-2 btn-primary" @click="answer()">Send</a>
          </div>
        </div>
      </div>
      <div class="col s12 m5 l5">
        <div class="card">
          <h1>Score</h1>
          <hr>
          <div class="card-body" v-for="(player, index) in players_in_room[0].players" :key="index">
            <div class="left">
              <span>PLAYER NAME : {{ player.name }}</span>
            </div><br>
            <div class="left">
              <span>SCORE : {{ player.score }}</span>
            </div>
            <div class="progress">
              <div class="determinate" style="width: 90%"></div>
            </div>
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
  data() {
    return {
      index: 0,
      answerText: "",
      players_in_room: []
    };
  },
  methods: {
    fetchPlayer() {
      db.collection("rooms").onSnapshot(querySnapshot => {
      let players_temp = [];
      let roomID = localStorage.getItem("roomId_tebakgambar");
      querySnapshot.forEach(doc => {
        if (doc.id === roomID) {
          players_temp.push({
            id: doc.id,
            ...doc.data()
          });
        }
      });
      this.players_in_room = players_temp;
      console.log("Created invoke ");
    });
    },
    leave_room() {
      db.collection("rooms")
        .doc(localStorage.getItem("roomId_tebakgambar"))
        .get()
        .then(doc => {
          let newPlayers = doc.data().players;
          newPlayers = newPlayers.filter(
            el => el.name !== localStorage.getItem("username_tebakgambar")
          );
          return db
            .collection("rooms")
            .doc(localStorage.getItem("roomId_tebakgambar"))
            .update({
              players: newPlayers
            })
            .then(() => {
              console.log("Leave Room successfully!");
              localStorage.removeItem("roomId_tebakgambar");
              this.$router.push("/rooms");
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    answer() {
      if (
        this.answerText.toLowerCase() ===
        this.$store.state.quizzes[this.index].answer
      ) {
        this.index++;
        this.answerText = "";
      }
    }
  },
  created() {
    this.fetchPlayer()
    if (localStorage.getItem("roomId_tebakgambar")) {
      this.$router.push(
        `/rooms/games/${localStorage.getItem("roomId_tebakgambar")}`
      );
    } else {
      this.$router.push("/rooms");
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
