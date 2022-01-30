import { set, ref, onValue, push, db, remove } from "./firebase.js";

const branch = ref(db, "/messages");

let userName = prompt("Please enter your name");

document.querySelector("#message").addEventListener('submit', function (e){
    e.preventDefault();

    let messagePush = push(branch);
    let message = document.querySelector("input").value;
    set(messagePush, {
        message,
        sentBy: userName
    });
});



function deleteMessage (key)
{
    
}

onValue(branch, function(snapshot){
    
    $("#chat").html("")

    for(let message of Object.entries(snapshot.val()))
    {
        let div = document.createElement("div");
        div.classList.add("message-container");

        if(message[1].sentBy != userName)
        {
            div.classList("from-opponent");
        }

        
        let del = document.createElement("button");
        del.innerText = "Del";
        $(del).on("click", () =>
        {
            remove(ref(db, "/messages/" + message[0]));
        });

        let p = document.createElement("p");
        let m = message[1].sentBy + ": " + message[1].message
        // console.log(m);
        p.innerText = m;
        
        div.append(del, p);

        document.querySelector("#chat").append(div);
        document.querySelector("#message-text").value = ""; 
    }
});