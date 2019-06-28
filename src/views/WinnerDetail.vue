<template>
  <div class="container">
    <a @click="leave_room" class="btn btn-large red left" style="margin-left: 100px;">Leave Room</a>
    <img
      src="https://img2.pngdownload.id/20180624/kue/kisspng-podium-champion-clip-art-5b2fb0068c7243.9809454615298519105753.jpg"
      alt="alternate text"
    >
    <h1>Congrats to :</h1>
    <div class="collection" style="width: 500px;margin-left: auto;margin-right: auto;">
    <a href="#" class="collection-item" style="padding: 0;margin-top:20px;">
          <div class="row">
            <div class="col s2">
              <h1  style="margin-top: 15px;margin-bottom: auto;">
                1.
              </h1>
            </div>
            <div class="col s1">
              <div class="user" :style="'background-image: url('+profilePic[0]+');'"></div>
            </div>
            <div class="col s8" style="">
              <h3>{{ champion.name }}</h3>
            </div>
        </div>
        </a>
    </div>
    <h1>
      Dont Give Up :
    </h1>
    <div class="collection" style="width: 500px;margin-left: auto;margin-right: auto;">
        <a v-for="(player,index) in players" :key="index" href="#" class="collection-item" style="padding: 0;margin-top:20px;">
          <div class="row">
            <div class="col s2">
              <h1  style="margin-top: 15px;margin-bottom: auto;">
                {{ index + 2 }}.
              </h1>
            </div>
            <div class="col s2">
              <div class="user" :style="'background-image: url('+profilePic[1]+');'"></div>
            </div>
            <div class="col s8" style="">
              <h3>{{ player.name }}</h3>
            </div>
        </div>
        </a>
        
      </div>
  </div>
</template>

<script>
import db from '../config/firebase'

export default {
  data(){
    return {
      profilePic: [
        'https://cbsnews1.cbsistatic.com/hub/i/2016/12/14/4b7e3037-b62b-4f21-9e5c-1c181da45a6a/screen-shot-2016-12-14-at-4-25-12-pm.png',
        'https://i.kym-cdn.com/photos/images/original/001/431/201/40f.png'
      ],
      players: [],
      champion: {},
      players_in_room: []
    }
  },
  created(){
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
        players_temp[0].players.sort((a,b)=> b.score-a.score)
        players_temp[0].players.forEach(obj =>{
          this.players.push(obj)
        })
        this.champion = this.players[0]
        this.players.shift()
        this.players_in_room = players_temp;
        console.log("Created invoke ");
      });
  },
  methods: {
    leave_room(){
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
    }
  }
};
</script>

<style>
.user {
  width: 100px;
  height: 100px;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

</style>