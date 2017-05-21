// Initialize app
var myApp = new Framework7({
    material: true,
    swipePanel: 'left'
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: false
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});

// Application code

// Choose page is displayed upon clicking buttons in row

myApp.onPageInit('choose', function (page) {
    // code...
    $$(".buttons-row a").on("click", function (event) {
        event.preventDefault();
        chooseSize = $$(this).text()
    });
});

// Scramble code is executed when pages is opened, therefore a ready code can be generated without the need to press button

myApp.onPageInit('stopwatch', function (page) {
    /* Scramble */
    getScramble();
    $$('.scramble-btn').on('click', function () {
        getScramble();
    })
}).trigger();


/* Scramble Code - modified from https://github.com/jnrbsn/rubiks-cube-scrambler */

function getScramble() {
    var moves = new Array();
    moves['r'] = new Array("R", "R'", "R2");
    moves['l'] = new Array("L", "L'", "L2");
    moves['u'] = new Array("U", "U'", "U2");
    moves['d'] = new Array("D", "D'", "D2");
    moves['f'] = new Array("F", "F'", "F2");
    moves['b'] = new Array("B", "B'", "B2");

    var limit = 25;
    var last = "";
    var scramble = "";
    var keys = "";

    for (var i = 1; i <= limit; i++) {
        keys = new Array("r", "l", "u", "d", "f", "b");
        shuffle(keys);
        while (last == keys[0]) {
            shuffle(keys);
        }
        shuffle(moves[keys[0]]);
        move = moves[keys[0]][0];
        scramble += move + " ";
        last = keys[0];
    } 
    
    $$('.scramble .scramble-text').html( scramble);

}

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// Side Panel closes when element from list is selected

$$(".list-block ul li a").on("click", function (event) {
    event.preventDefault();
    myApp.closePanel();
});
