const firebaseConfig = {
    apiKey: "AIzaSyCHdAO4XBEavrxzJtuR76-B-DxwsXVylfg",
    authDomain: "twitter-do-paraguai.firebaseapp.com",
    databaseURL: "https://twitter-do-paraguai-default-rtdb.firebaseio.com",
    projectId: "twitter-do-paraguai",
    storageBucket: "twitter-do-paraguai.appspot.com",
    messagingSenderId: "486265494688",
    appId: "1:486265494688:web:73a87414817d6e713a3dc5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location.replace("index.html");
  }

  nome=localStorage.getItem("userName");
  sala=localStorage.getItem("roomName");

  function send() {
    msg=document.getElementById("msg").value;
    firebase.database().ref(sala).push({
      name:nome,
      mensage:msg,like:0
    })
  }

    function listamensagens() {
      firebase.database().ref("/" + sala).on("value", function(snapshot){
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(data){
          datakey= data.key;
          dados = data.val();
          if(datakey != "purpose") {
            mensageid = datakey;
            messagededata = dados;
            nome = messagededata["name"];
            mensagem = messagededata["mensage"];
            like = messagededata["like"];
            linha1 = "<h4>" + nome + "<img src ='tick.png'class = 'user_tick' > </h4>";
            linha2 = "<h4 class = 'message_h4 '>" + mensagem+ "</h4>";
            linha3 = "<button class = 'btn btn-warning' onclick= 'updatelike(this.id)' id = '"+ mensageid +"' value = "+like+ ">";
            linha4 = "<span class = 'glinphicon glinphicon-thumbs-up' >like:"+like+"</span> </button> <hr>";
            codigo = linha1 + linha2 + linha3 + linha4;
            document.getElementById("output").innerHTML += codigo;
          }
        })
      })
    }

    listamensagens();

    function updatelike(id) {
      like = document.getElementById(id).value;
      updatel = Number(like) + 1;
      firebase.database().ref(sala).child(id).update({
        like: updatel
      })
    }