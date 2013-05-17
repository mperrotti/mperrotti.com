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
    Using PhotoSwipe

    depends: js/vendor/klass.min.js
             js/vendor/code.photoswipe-3.0.5.min.js
\*------------------------------------*/
var initPhotoSwipe = function () {

    (function (window, Util, PhotoSwipe) {
    // Util.Events.domReady(function (e) {
        var indicators, galleryInstance, $gallery, $galleryImgs,
            instances    = [],
            $expandedGallery = $('.is-expanded').find('.grid-item__images');

        $expandedGallery.each(function (n, gallery) {
            $gallery       = $(this),
            $galleryImgs   = $gallery.find('img');
            galleryOptions = {
                                target: $gallery[0],
                                preventHide: true,
                                preventDefaultTouchEvents: false,
                                enableMouseWheel: false,
                                captionAndToolbarHide: true,
                                zIndex: 1,
                                getImageSource: function(el){
                                    return el.getAttribute('src');
                                }
                            };
            instanceCode   = PhotoSwipe.attach($galleryImgs, galleryOptions);

            // Create an instance for each project gallery
            instances.push(instanceCode);

            // console.log('initing on: ' + $($gallery[0]).parents('article').attr('id'));

            //onDisplayImage - set the current indicator
            instances[n].addEventHandler(PhotoSwipe.EventTypes.onDisplayImage, function (e) {

                var i, len;
                for (i = 0, len = indicators.length; i < len; i++) {
                    indicators[i].setAttribute('class', '');
                }
                $(instances[n].carousel.el).parents('.grid-item__images')
                .find('.indicators')
                .width(
                    parseInt($(instances[n].getCurrentImage().imageEl).width()-20, 10)
                );
                indicators[e.index].setAttribute('class', 'current');
                var currentImage = instances[n].getCurrentImage();
                $(instances[n].carousel.el).parents('.grid-item__images').addClass('ps-inited');

                //TODO: Fix this ghetto-ass hack
                $('.gallery-container, .ps-carousel, .ps-carousel-content').height($(instances[n].carousel.el).find('.ps-carousel-item:first-child img').height());

            });

            instances[n].show(0);

            var imgs, lng;
            for (img = 0, lng = $(this).find('.gallery-container img').length; img < lng; img++) {
                $(this).find('.indicators').append('<span></span>');
            }

            indicators = window.document.querySelectorAll('.indicators span');


        });

    // });



    }(window, window.Code.Util, window.Code.PhotoSwipe));
};

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

    $('a[href="#home"]').on('click', function(){
        History.pushState({state:1}, "home", "?page=home"); //TODO: Move this to the pagechange function
    });

    $('a[href="#work"]').on('click', function(){
        History.pushState({state:2}, "work", "?page=work"); //TODO: Move this to the pagechange function
    });

})(window);