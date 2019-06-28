<template>
  <div class>
      <div class="col m12 l12">
        <img src="../../public/banner2.png" style="width:100%;" alt="">
      </div>
    <div class="row">
      <div class="col m6 l6">
          <form @submit.prevent="add_room" class="col s12">
            <div class="row">
              <div class="input-field">
                <i class="material-icons prefix">home</i>
                <input v-model="input_room_name" id="room_name" type="text" class="validate">
                <label for="room_name">Create Room</label>
                <button type="submit" class="btn">CREATE</button>
              </div>
            </div>
          </form>
      </div>
      <div class="col m6 l6">
        <button class="btn right" @click="exit_game">EXIT GAME</button>
      </div>
    </div>
        <div class="row">
            <div class="col s12 m6">
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
                      <i class="material-icons">exit_to_app
</i>
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
            <div class="s12 col m6 l6">
<div class="">
	<div class="card message-card">
			<div class="card-title">
				<h5>Chat Globals</h5>
			</div>
			<div class="card-content message-content" id="content_messages" style="max-height: 400px; overflow-y: scroll;">
        <div class="" v-for="(chat, index) in data_chats_global[0].message" :key="index">
				<div class="message"
        :class="{'message-support': chat.owner == room_owner }">
					<div class="">
						<p class="message-title">
							<span>
							</span>
							<span class="message-title-support">{{ chat.owner }}
								<i class="material-icons">face</i>
							</span>
						</p>
						<p class="message-text">{{ chat.pesan }}</p>
					</div>
            <span></span>
				</div>

        </div>

			</div>
			<div class="card-footer bottom" id="bottom">
				<form @submit.prevent="chats_global" >
					<div class="row" style="margin: 0px;">
						<div class="input-field col s10" style="margin: 0px;">
              <input v-model="input_chat_global" type="text"> 
	          				<label>Message</label>
						</div>
						<div class="input-field col s1" style="margin: 0px;">
				    		<button type="submit" class="btn btn-floating waves-effect waves-light">
				    			<i class="material-icons">send</i>
				    		</button>
						</div>
					</div>
				</form>
		  	</div>
		</div>
</div>
            </div>
          </div>
    </div>
</template>

<script>
import db from "../config/firebase";
import { firestore } from 'firebase';

export default {
  data() {
    return {
      quiz_rooms: [],
      input_user_name: "",
      input_room_name: "",
      room_owner: localStorage.getItem("username_tebakgambar"),
      input_chat_global: '',
      data_chats_global: []
    };
  },
  methods: {
    fetch_chat_global(){
      db.collection("chatsglobal").onSnapshot(querySnapshot => {
        let chats_temp = [];
        querySnapshot.forEach(doc => {
          chats_temp.push({
            id: doc.id,
            ...doc.data()
          });
        });
        this.data_chats_global = chats_temp;
        console.log(chats_temp)
        console.log("fetch chats invoke ");
      });
    },
    chats_global(){
      db.collection("chatsglobal")
        .doc('wBiDED2n0YjZafiNWiCS')
        .get()
        .then(doc => {
          let newMessage = doc.data().message;
          newMessage.push({ pesan: this.input_chat_global, owner: localStorage.getItem("username_tebakgambar")});
          return db
            .collection("chatsglobal")
            .doc('wBiDED2n0YjZafiNWiCS')
            .update({
              message: newMessage
            })
            .then(() => {
              console.log("Chat successfully!");
              this.input_chat_global= ""
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    this.fetch_chat_global()
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
.card-title{
    padding: 10px;
}
.card-title{
	min-height: 57px;
}
.message-content{
	border: 1px solid #dcdada;
	background: #f9f9f9;
}
.message{
	background: #f1f0f0;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
}
.message-support{
	background: #448AFF;
	color: #fff;
}
p.message-title{
	font-size: 18px;
}
p.message-date{
	font-size: 10px;
    font-weight: bold;
}
.message-title-support{
	font-size: 12px;
	float: right;
}
h5{
	display: inline-block;
}
</style>
