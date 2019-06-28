<template>

  <div>
    <audio id="correct-sound">
      <source src="../../public/Quiz-correct-sound-with-applause.mp3" type="audio/mpeg">
    </audio>
    <audio id="false-sound">
      <source src="../../public/Family-feud-buzzer.wav" type="audio/mpeg">
    </audio>
    <div v-if="players_in_room[0].status == 'waiting'" class="center">
      <h1>{{ status }}</h1>
      <div class="col s12 m6">
        <div :class="['card', isFull ? 'blue' : 'grey']">
          <div class="card-content white-text">
            <span class="card-title">{{ players_in_room[0].room_name }}</span>
            <div class="collection">
              <a
                href="#"
                v-for="player in players_in_room[0].players"
                :key="player"
                :class="['collection-item',player.name == whoAmI ? 'active' : '']"
              >{{ player.name }}</a>
            </div>
          </div>
          <div class="row">
            <a @click="leave_room" class="btn btn-large red left" style="margin-left: 100px;">Leave Room</a>
            <a
              v-if="isFull && players_in_room[0].owner == whoAmI"
              @click="start_game"
              class="btn btn-large cyan pulse right"
              style="margin-right: 100px;"
            >Start Game</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="players_in_room[0].status == 'playing'" class="row">
      <!-- <a @click="start_game" class="btn btn-large cyan pulse">Start Game</a>
      <h1 v-show="!started">Ready?</h1>
      <h1>{{ countDown }}</h1> -->
      <div class="col s12 m7 l7">
        <div class="card">
          <h1>{{ index + 1 }} / 10 </h1>
          <div class>
            <img :src="$store.state.quizzes[index].question" alt class="img-top">
          </div>
          <div class="input-field">
            <input
            :class="['validate', isCorrect == false ? 'invalid' : '']"
              placeholder="Your Answer"
              type="text"
              v-model="answerText"
              @keyup.enter="answer()"
              autofocus
            >
            <span class="helper-text" data-error="Wrong Answer, try again"></span>
            <!-- <a href="#" class="btn btn-sm ml-2 btn-primary" @click="answer()">Send</a> -->
          </div>
        </div>
      </div>
      <div class="col s12 m5 l5">
        <div class="card">
          <h1>Score</h1>
          <div class="card-body">
            <div
              class="collection"
            >
              <a href="#" :class="['collection-item',player.name == whoAmI ? 'active blue lighten-2' : '']" v-for="(player, index) in players_in_room[0].players"
              :key="index"
              style="margin: 0;">
                <div class="left">
                  <span>{{ player.name }}</span>
                </div>
                <br>
                <div class="left">
                  <span>{{ player.score }}</span>
                </div>
                <div class="progress">
                  <div class="determinate" :style="{'width': progressBar(player.score)}"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../config/firebase";
import { setInterval, clearInterval, setTimeout } from 'timers';

export default {

  data() {
    return {
      index: 0,
      answerText: "",
      players_in_room: [],
      playing: false,
      isCorrect: null,
      timer: 30,
      count: 3,
      started: false
    };
  },
  computed: {
    countDown(){
      if(this.started)
        return this.timer
      else
        return this.count
    },
    whoAmI() {
      return localStorage.getItem("username_tebakgambar");
    },
    isFull() {
      return (
        this.players_in_room[0] && this.players_in_room[0].players.length >= 2
      );
    },
    status() {
      if (this.isFull) {
        return "Ready";
      } else return "Waiting";
    },
  },
  methods: {
    progressBar(score){
      return score + '%'
    },
    start_game(){
      db
        .collection("rooms")
        .doc(localStorage.getItem("roomId_tebakgambar"))
        .update({
          status: 'playing'
        })
        .then(() => {
          console.log('status playing')
        })
        .catch(err => {
          console.log(err);
        });
    },
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
        const sound = document.getElementById('correct-sound')
        sound.play()
        this.answerText = "";

        db.collection("rooms")
        .doc(localStorage.getItem('roomId_tebakgambar'))
        .get()
        .then(doc => {
          let players = doc.data().players
          let idx = doc.data().players.findIndex(i => i.name === localStorage.getItem('username_tebakgambar'))
          players[idx].score += 10;

          return db.collection("rooms")
          .doc(localStorage.getItem('roomId_tebakgambar'))
          .update({ players: players })
        })
        .then(() => {
            console.log('Success update score')
            if (this.$store.state.quizzes.length - 1 === this.index) {
              
            }
            setTimeout(() => {
              this.isCorrect = null
              this.index++;
            }, 5000)
          })
        .catch(err => console.log(err))
      }
      else {
        this.isCorrect = false
        const sound = document.getElementById('false-sound')
        sound.play()
        this.answerText = "";
      }
    }
  },
  created() {

    this.fetchPlayer();
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
