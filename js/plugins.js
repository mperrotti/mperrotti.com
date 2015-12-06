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
    Updating URL using History API

    depends: js/vendor/historyAPI/jquery.history.js
             js/vendor/historyAPI/json2.js
\*------------------------------------*/
(function(window,undefined){

    // Establish Variables
    var History = window.History, // Note: We are using a capital H instead of a lower h
        State = History.getState(),
        $log = $('#log');

    /*--------------------------*\
      Good for debugging 
      History API
    \*--------------------------*/
        // // Log Initial State
        // History.log('initial:', State.data, State.title, State.url);

        // // Bind to State Change // Log the State after statechange
        // History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate       
        //     var State = History.getState(); // Note: We are using History.getState() instead of event.state
        //     History.log('statechange:', State.data, State.title, State.url);
        // });
    //-------------------------

    // $('a[href="#home"]').on('click', function(){
    //     History.pushState({state:1}, "home", "?page=home"); //TODO: Move this to the pagechange function
    // });

    // $('a[href="#work"]').on('click', function(){
    //     History.pushState({state:2}, "work", "?page=work"); //TODO: Move this to the pagechange function
    // });

})(window);