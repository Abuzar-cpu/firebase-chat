import { set, ref, onValue, push, db, remove } from "./firebase.js";

const branch = ref(db, "/messages");

let userName = "";

while (userName == "")
{
    userName = prompt("Please enter your name");
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function makeId() {
    let ID = "";
    for ( var i = 0; i < 12; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
}

let ID = "";

if(window.localStorage.getItem("ID") != null)
{
    ID = window.localStorage.getItem("ID");
}
else{
    ID = makeId();
    window.localStorage.setItem("ID", ID);
}


document.querySelector("#message").addEventListener('submit', function (e){
    e.preventDefault();

    let messagePush = push(branch);
    let message = document.querySelector("input").value;
    set(messagePush, {
        message,
        sentBy: userName,
        userId: ID
    });
});


onValue(branch, function(snapshot){
    
    $("#chat").html("")

    if(snapshot.val() == null)
    {
        return;
    }
    for(let message of Object.entries(snapshot.val()))
    {
        let div = document.createElement("div");
        div.classList.add("message-container");

        let del = document.createElement("button");
        del.innerText = "Del";
        $(del).on("click", () =>
        {
            remove(ref(db, "/messages/" + message[0]));
        });

        if(message[1].userId != ID)
        {
            del.classList.add("del-for-guest")
            div.classList.add("from-opponent");
        }

        else{
            div.classList.add("from-me");
        }
        let p = document.createElement("p");
        let m = message[1].sentBy + ": " + message[1].message
        // console.log(m);
        p.innerText = m;
        p.classList.add("message-from-me");
        
        div.append(del, p);

        document.querySelector("#chat").append(div);
        document.querySelector("#message-text").value = ""; 
    }

    document.getElementById("chat").scroll(0, document.getElementById("chat").scrollHeight);
});