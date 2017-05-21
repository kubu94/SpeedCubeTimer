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

myApp.onPageInit('choose', function (page) {
    // code...
    $$(".buttons-row a").on("click", function (event) {
        event.preventDefault();
        chooseSize = $$(this).text()
    });
});

//myApp.onPageInit('global', function (page) {
  //  getRecords();
//});

// Now we need to run the code that will be executed only for specific page.



$$(".list-block ul li a").on("click", function (event) {
    event.preventDefault();
    myApp.closePanel();
});

//function getRecords() {
//      $$.get('https://www.worldcubeassociation.org/results/events.php', 
//      function (data){
//      var table = page.find('.table-responsive');
//      });
//};
