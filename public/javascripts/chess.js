let count = 0;
var currentFigureX;
var currentFigureY;

$( document ).ready(function() {
    console.log("Document is ready!")
    registerClickListener()
});

function submitform() {
    let playerA = document.getElementById('name1').value;
    let playerB = document.getElementById('name2').value;
    window.location.href = "/login/:" + playerA + ":" + playerB;
}

function getHighlight(x, y) {

    $.ajax({
        method: "GET",
        url: "/getMoves/:"+x+"/:"+y,
        dataType: "json",
        success: function(result) {
            if(result.moves.length != 0) {
                $('.highlighted').removeClass('highlighted');
                for(let i = 0; i < result.moves.length; i++){
                    let x = result.moves[i][0]
                    let y = result.moves[i][1]
                    $('#' + x + y).addClass("highlighted")
                }
            } else {
                count = 0;
            }
        }
    })
}
function moveFigure(cpx, cpy, x, y) {
    $.ajax({
        method: "GET",
        url: "/moveFigure/:"+ cpx + "/:" + cpy + "/:" + x + "/:" + y,
        dataType: "text",
        success: function(result) {
            console.log(result)
            $('.highlighted').removeClass('highlighted');
            $('#' + x + y + ">img").remove()
            $('#' + cpx + cpy + ">img").appendTo($('#' + x + y))
            //$('#' + x + y + ">img").attr("id", x.toString() + y.toString())
            $('#' + x + y + ">img").prop("x-coordinate", x)
            $('#' + x + y + ">img").prop("y-coordinate",  y)

            console.log("Moved the figure from " + cpx + cpy + " to " + x + y)
        }
    })
}

function registerClickListener() {
    $('.img-responsive').click(function () {

        if(count === 1 && $(this).parent().hasClass('highlighted')) {
            $('.highlighted').removeClass('highlighted');
            moveFigure(currentFigureX, currentFigureY, this["x-coordinate"], this["y-coordinate"])
            count = 0
            return;
        }
        //If figure is clicked for the first time, highlight tiles
        currentFigureX = this["x-coordinate"]
        currentFigureY = this["y-coordinate"]

        count++;
        console.log("Count wurde inkrementiert!")
        //Send data to Controller, receive possible moves
        getHighlight(this["x-coordinate"], this["y-coordinate"] )
        console.log("X: "+ this["x-coordinate"] + " Y: " + this["y-coordinate"])
        console.log("Image count: " + count);
    });
    $('.tile').click(function () {
        console.log("Tile count: " + count)
        if (count === 1 && $(this).hasClass("highlighted")) {
            console.log("Count ist 1!")
            //If coordinate is in received JSON, set Figure
            moveFigure(currentFigureX, currentFigureY, this["x-coordinate"], this["y-coordinate"])
            count = 0;
            console.log("Count wurde dekrementiert!");
        } else if (count === 0) {
            console.log("Count ist 0!")
        }
    });
}


