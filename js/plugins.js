// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*------------------------------------*\
    Slideshows for tablet/mobile
    Using Cycle with swipe plugin
\*------------------------------------*/
function initCycle() {
  var winWidth  = document.documentElement.clientWidth;
  
  if (winWidth < 1024){
    $('.grid-item__images').cycle();
  }
  else {
    $('.grid-item__images').cycle('destroy');
    $('.grid-item__images').find('img').removeAttr('style');
  }
}

initCycle();

$(window).resize(function() {
  initCycle();
}).load(function() {
  initCycle();
});


/*------------------------------------*\
    Updating URL using History API
\*------------------------------------*/
(function(window,undefined){

    // Check Location
    if ( document.location.protocol === 'file:' ) {
        alert('The HTML5 History API (and thus History.js) do not work on files, please upload it to a server.');
    }

    // Establish Variables
    var
        History = window.History, // Note: We are using a capital H instead of a lower h
        State = History.getState(),
        $log = $('#log');

    // Log Initial State
    History.log('initial:', State.data, State.title, State.url);

    // Bind to State Change
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        // Log the State
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        History.log('statechange:', State.data, State.title, State.url);
    });

    $('a[href="#home"]').on('click', function(){
        History.pushState({state:1}, "home", "?page=home");
    });

    $('a[href="#work"]').on('click', function(){
        History.pushState({state:2}, "work", "?page=work");
    });

    $('a[href="#about"]').on('click', function(){
        History.pushState({state:3}, "about", "?page=about");
    });

})(window);