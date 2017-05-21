// Initialize app
var myApp = new Framework7({
    material: true,
    swipePanel: 'left'
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

//Variables

// Variables
var chooseSize;
var bestTime2;
var bestTime3;
var bestTime4;

var storage = window.localStorage;

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

myApp.onPageInit('records', function (page) {
    // code...
    var value1 = window.localStorage.getItem("2x2x2");
    var value2 = window.localStorage.getItem("3x3x3");
    var value3 = window.localStorage.getItem("4x4x4");

    $$('.bestin2').text('Best time in 2 X 2 X 2 cube: ' + (value1 / 100));
    $$('.bestin3').text('Best time in 3 X 3 X 3 cube: ' + (value2 / 100));
    $$('.bestin4').text('Best time in 4 X 4 X 4 cube: ' + (value3 / 100));

});

myApp.onPageInit('stopwatch', function (page) {

    var value11 = window.localStorage.getItem("2x2x2");
    var value22 = window.localStorage.getItem("3x3x3");
    var value33 = window.localStorage.getItem("4x4x4");

    var sessionCounter = 0;
    var bestSessionTime;
    var avgSessionTime;
    var totalSessionTime = 0;
    var currentSessionTime;
    
    /* Stopwatch */
    
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;

    buttonStart.onclick = function () {

        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        sessionCounter = sessionCounter + 1;
    }

    buttonStop.onclick = function () {
        clearInterval(Interval);
    }

    buttonReset.onclick = function () {
        currentSessionTime = seconds * 100 + (tens - 1);
        totalSessionTime = totalSessionTime + currentSessionTime;
        avgSessionTime = totalSessionTime / sessionCounter;
        if (bestSessionTime == undefined) {
            bestSessionTime = currentSessionTime;
            if (chooseSize == '2 X 2 X 2') {
                bestTime2 = bestSessionTime;
                if (value11 == null) {
                    window.localStorage.setItem("2x2x2", bestTime2);
                } else if (bestTime2 < value11) {
                    window.localStorage.setItem("2x2x2", bestTime2);
                    myApp.addNotification({
                        message: 'Congratulations you beat your best time in this cube.',
                    });
                }
            } else if (chooseSize == '3 X 3 X 3') {
                bestTime3 = bestSessionTime;
                if (value22 == null) {
                    window.localStorage.setItem("3x3x3", bestTime3);
                } else if (bestTime3 < value22) {
                    window.localStorage.setItem("3x3x3", bestTime3);
                    myApp.addNotification({
                        message: 'Congratulations you beat your best time in this cube.',
                    });
                }
            } else {
                bestTime4 = bestSessionTime;
                if (value33 == null) {
                    window.localStorage.setItem("4x4x4", bestTime4);
                } else if (bestTime4 < value33) {
                    window.localStorage.setItem("4x4x4", bestTime4);
                    myApp.addNotification({
                        message: 'Congratulations you beat your best time in this cube.',
                    });
                }
            }
        } else if (currentSessionTime < bestSessionTime) {
            bestSessionTime = currentSessionTime;
            if (chooseSize == '2 X 2 X 2') {
                bestTime2 = bestSessionTime;
                if (bestTime2 < value11) {
                    window.localStorage.setItem("2x2x2", bestTime2);
                    myApp.addNotification({
                        message: 'Congratulations you beat your best time in this cube.',
                    });
                }
            } else if (chooseSize == '3 X 3 X 3') {
                bestTime3 = bestSessionTime;
                if (bestTime3 < value22) {
                    window.localStorage.setItem("3x3x3", bestTime3);
                    myApp.addNotification({
                        message: 'Congratulations you beat your best time in this cube.',
                    });
                }
            } else {
                bestTime4 = bestSessionTime;
                if (bestTime4 < value33) {
                    window.localStorage.setItem("4x4x4", bestTime4);
                    myApp.addNotification({
                        message: 'Congratulations you beat your best time in this cube.',
                    });
                }
            }
           
        } else {
            bestSessionTime = bestSessionTime;
        }
        $$('.lasttimeinsession').text('Last time in session: ' + (currentSessionTime / 100));
        $$('.bestinsession').text('Best time in session: ' + (bestSessionTime / 100));
        $$('.averageinsession').text('Average time in session: ' + (avgSessionTime / 100).toFixed(2));
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;


    }

    function startTimer() {
        tens++;

        if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;

        }

        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }

    }

});

// Side Panel closes when element from list is selected

$$(".list-block ul li a").on("click", function (event) {
    event.preventDefault();
    myApp.closePanel();
});
