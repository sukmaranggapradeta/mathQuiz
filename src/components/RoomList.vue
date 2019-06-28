<template>
  <div class>
    <div class="row">
      <form @submit.prevent="add_room" class="col s12">
        <div class="row">
          <div class="input-field col s3 center">
            <i class="material-icons prefix">room</i>
            <input v-model="input_room_name" id="room_name" type="text" class="validate">
            <label for="room_name">Create Room</label>
            <button type="submit" class="btn">CREATE</button>
          </div>
        </div>
      </form>
      <button class="btn" @click="exit_game">EXIT</button>
      <div class="col s8">
        <ul class="collection with-header">
          <li class="collection-header">
            <h4>ROOMS</h4>
          </li>
          <li class="collection-item" v-for="(quiz_room, index) in quiz_rooms" :key="index">
            <div>
              {{ quiz_room.room_name }} | {{ quiz_room.players.length }} players
              <span
                @click="join_room(quiz_room.id)"
                class="secondary-content"
              >
                <i class="material-icons">send</i>
              </span>
              <span
                v-if="quiz_room.owner == room_owner"
                @click="delete_room(quiz_room.id)"
                class="secondary-content left"
              >
                <i class="material-icons">delete_forever</i>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../config/firebase";

export default {
  data() {
    return {
      quiz_rooms: [],
      input_user_name: "",
      input_room_name: "",
      room_owner: localStorage.getItem("username_tebakgambar")
    };
  },
  methods: {
    join_room(id) {
      db.collection("rooms")
        .doc(id)
        .get()
        .then(doc => {
          let newPlayers = doc.data().players;
          newPlayers.push({ name: localStorage.getItem("username_tebakgambar"), score: 0 });
          return db
            .collection("rooms")
            .doc(id)
            .update({
              players: newPlayers
            })
            .then(() => {
              console.log("Join Room successfully!", id);
              localStorage.setItem('roomId_tebakgambar', id)
              this.$router.push(`/rooms/games/${id}`);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    delete_room(id) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Room successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing Room: ", error);
        });
    },
    add_username() {
      localStorage.setItem("username_tebakgambar", this.input_user_name);
      this.input_user_name = "";
    },
    add_room() {
      console.log("add room");
      db.collection("rooms")
        .add({
          room_name: this.input_room_name,
          owner: localStorage.getItem("username_tebakgambar"),
          players: [
            // {
            //   name: 'tono',
            //   score: 10
            // },
            // {
            //   name: 'tini',
            //   score: 50
            // }
          ],
          status: "waiting"
        })
        .then(docRef => {
          this.input_room_name = "";
          console.log("Room created", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding Room: ", error);
        });
    },
    exit_game() {
      localStorage.removeItem('username_tebakgambar')
      this.$router.push('/')
    }
  },
  created() {
    db.collection("rooms").onSnapshot(querySnapshot => {
      var rooms_temp = [];
      querySnapshot.forEach(doc => {
        rooms_temp.push({
          id: doc.id,
          ...doc.data()
        });
      });
      this.quiz_rooms = rooms_temp;
      console.log("Created invoke ");
    });
    if (localStorage.getItem('roomId_tebakgambar')){
      this.$router.push(`/rooms/games/${localStorage.getItem('roomId_tebakgambar')}`)
    } else {
      this.$router.push('/rooms')
    }
  }
};
</script>

<style scope>
span {
  cursor: pointer;
}
</style>
