var playername
$(document).ready(function(){
    playername = $('#fullname').text()
    $('#start').click(function(){
        connectSessionSocket()
    })
})

function connectSessionSocket() {
    socket = new WebSocket("wss://de-chess-htwg.herokuapp.com/SessionSocket");
    socket.onopen = function () {
        console.log("Open to connect SessionSocket ...");
        socket.send(playername)
    }
    socket.onmessage = function (e) {
        if (typeof e.data === "string" && e.data === "READY") {
            //.. start game
            window.location.replace("http://de-chess-htwg.herokuapp.com/game");
        } else if(typeof e.data === "string" && e.data === "WAIT"){
            console.log("waiting ...") //TODO: Give feedback to user
        }
    }
    socket.onerror = function (error) {
        console.log("Error in SessionSocket occured: " + error)
    }
    socket.onclose = function () {
        console.log("Bye bye SessionSocket!")
    }


}