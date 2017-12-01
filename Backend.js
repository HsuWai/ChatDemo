import firebase from "firebase";

class Backend {
  uid = "";
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyDoUV0B2Kxmz3Vh3Wi3E8IEI1Wob1TKeRE",
      authDomain: "chatapp-b3096.firebaseapp.com",
      databaseURL: "https://chatapp-b3096.firebaseio.com",
      projectId: "chatapp-b3096",
      storageBucket: "chatapp-b3096.appspot.com",
      messagingSenderId: "57638054400"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            alert(error.message);
          });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref("messages");
    this.messagesRef.off(); //Detaches a callback previously attached with on()
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        //createdAt: new Date(message.createdAt),
        createdAt: message.createdAt,
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };

    var d = this.getLimit();
    console.log(d);
    //Generates a new Query object limited to the last specific number of children.
    //this.messagesRef.limitToLast(10).on("child_added", onReceive);
    this.messagesRef
      .orderByChild("createdAt")
      //.startAt(d)
      //.endAt("2017-11-27T06:51:47.851Z")
      .on("child_added", onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
    var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: timestamp
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

  getLimit() {
    var today = new Date();
    //var milliseconds = Date.parse(today);
    //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
    today.setDate(today.getDate() - 31); // last 30 Days
    //console.log(today);
    var changedISODate = new Date(today).toISOString();
    //var changedISODate = today.toISOString();
    console.log(changedISODate);
    return changedISODate;
  }
}

export default new Backend();
