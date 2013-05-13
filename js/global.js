//global vars
var workPageLoaded = false,
    workPageData   = '',
    projects = [],
    projectData = {};

/*------------------------------------*\
    FUNCTION: susyOffCanvasToggle

    Triggers states to toggle off-canvas content

    based on http://oddbird.net/demos/susy-off-canvas/
\*------------------------------------*/
var OBC = (function (OBC, $) {

  'use strict';

  OBC.susyOffCanvasToggle = {
    init: function (triggers) {
      $(triggers).on('click', function (e) {
        e.preventDefault();
        OBC.susyOffCanvasToggle.toggleClasses(this);
        OBC.susyOffCanvasToggle.toggleText(triggers);
      });
      return triggers;
    },
    toggleClasses: function (el) {
      var body = $('body');
      var show = $(el).attr('href');

      if (show === '#show-info'){
        body.toggleClass('show-grid-item__info');
      }
      if (show === '#show-nav'){
          body.toggleClass('show-nav');
      }
      if (show === '#aboutme'){
          body.toggleClass('show-about').removeClass('show-contact');
      }
      if (show === '#contactme'){
          body.toggleClass('show-contact').removeClass('show-about');
      }

      return body.attr('class');
    },
    toggleText: function (triggers) {
      var right = $(triggers).filter('[href="#show-info"]');
      var body = $('body');
    }
  };

  return OBC;

}(OBC || {}, jQuery));
//////////////////////////////////////////////END OFF-CANVAS STATE TOGGLING

var GlobalModule = {
  init: function() {
    this.preloadWorkPage(0);
    this.getUrlVars();
    this.pageNavigation();
    this.fullHeightPage();
    // this.scrollReveal();
    // this.scrollPageChange();
    OBC.susyOffCanvasToggle.init($('.toggler'));
  },

  /*------------------------------------------*\
    FUNCTION: fullHeightPage

    Make the div the full height of the window
    
  \*------------------------------------------*/
  fullHeightPage: function() {
    $('.home').css('height', window.innerHeight); // + 1 to make sure user can actually scroll in order to fire scrollPageChange();
  },

  /*------------------------------------------*\
    FUNCTION: scrollPageChange

    Navigate pages using scroll
    
  \*------------------------------------------*/
  // scrollPageChange: function() {
  //   $(window).scroll(function() {
  //     if ($(window).scrollTop() + $(window).height() == $(document).height() && $('#home').offset().top >= 0 ) {
  //       GlobalModule.pageChange('work');
  //       console.log('changing to work');
  //       History.pushState({state:2}, "work", "?page=work"); //TODO: Move this to the pagechange function
  //     }

  //   });
  // },

  /*------------------------------------------*\
    FUNCTION: scrollReveal

    Curtain-y effect on scroll
    
  \*------------------------------------------*/
  scrollReveal: function() {
    /*  Basic vars and setup  */
    var $body = $('body'),
        $pnl1 = $('.home'),
        $pnl2 = $('.work'),
        $cntnr = $('.container'),
        pnl2fromTop = $(window).scrollTop();

    $body.css('min-height', $pnl1.outerHeight() + $pnl2.outerHeight() + 'px');

    // See where things are scrolled and toggle stuff
    function scrollCheck(pnlFromTop) {

      if(pnlFromTop >= $pnl1.outerHeight()) {
        $body.addClass('show-page-work').removeClass('show-page-home');
      } else {
        $body.removeClass('show-page-work').addClass('show-page-home');
      }

    }

    /*  Scrolly stuff  */
    $(window).scroll(function() {
      var pnl2fromTop    = $(window).scrollTop(),
          percentFromTop = parseFloat(parseInt(pnl2fromTop, 10) / parseInt($pnl1.outerHeight(), 10))*100,
          fromTop        = percentFromTop <= 100 ? parseInt(percentFromTop, 10) + parseInt(-100, 10) : 0;

      pnl2fromTop = pnl2fromTop < $pnl1.outerHeight() ? pnl2fromTop : $pnl1.outerHeight();

      $pnl2.css({
        'transform'         : 'translateY('+fromTop+'%)',
        '-moz-transform'    : 'translateY('+fromTop+'%)',
        '-ms-transform'     : 'translateY('+fromTop+'%)',
        '-webkit-transform' : 'translateY('+fromTop+'%)'
      });

      scrollCheck(pnl2fromTop);

    });

    /*  Clicky stuff  */
    $('main-nav--new-page a').on('click', function(e) {
      var whereToScroll = $('body').hasClass('show-page-work') ? 0 : $pnl1.outerHeight();
      e.preventDefault();
      //$('.panel').removeAttr('style');
      $('html, body').animate({ scrollTop: whereToScroll });
    });

  },

  /*------------------------------------------*\
    FUNCTION: preloadWorkPage

    Preload the work page
    
  \*------------------------------------------*/
  preloadWorkPage: function(step) {
    switch (step) {
      case 0: $.ajax({
                url    : 'work.html',
                async  : true,
                success: function(data) {
                  $(data).find('.grid-item').each( function() {
                    var projectID = $(this).attr('id');

                    //make an array of the project IDs
                    if ($.inArray(projectID, projects) === -1) {
                      projects.push(projectID);
                    }
                  });
                },
                complete: function(data) {
                  workPageLoaded = true;
                  workPageData = data.responseText;
                  GlobalModule.preloadWorkPage(1);
                  $('#work').html(workPageData).data('pulled', 'yes');
                  WorkModule.init();
                }
              }); break;

      case 1: $.each(projects, function (index, value) {
                $.ajax({
                  url: 'work/' + value + '.html',
                  success: function(data) {
                    projectData[value] = {
                      projectHTML: data
                    };
                  }
                });
              });
              break;
    }
  },

  getUrlVars: function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars; //change to 'hash[1]' to return project ID
  },

  /*------------------------------------------*\
    FUNCTION: pageChange

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!THIS ONE IS A BIG FUCKING DEAL!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    Controls overall site navigation

    Called when:
      -Document first loads
      -User clicks to new page
  \*------------------------------------------*/
  pageChange: function(page) {

    var homeHeight  = $('#home').height(),
        workHeight  = $('#work').height(),
        aboutHeight = $('#about').height(),
        pushHeight  = $('.main-nav li a').height();

  /*----------------------------------------------*\
    MAKE SURE PAGE VAR ISN'T USING URL HASHES

    If the URL has a hash, make an array like this:

      http://mperrotti.com/?page=pageName#hashName
      ----BECOMES----
      hashData[pageName, hashName]

    Then just set 'var page  = hashData[0]'
  \*----------------------------------------------*/
  if (window.location.hash) {
    var hashData = page.split('#'); //Make an array of the URL data

    page = hashData[0]; //Set page to be the page name without the hash
    projectID = hashData[1]; //Grab the project ID
  }

  var State = History.getState();

  console.log(page);

  console.log('PAGE STATE TITLE = ' + State.title);

  /*------------------------------------------*\
    PAGE NAVIGATION STATE CHANGES
  \*------------------------------------------*/
    /*----------------------------------------------*\
      IF page is already being shown, do nothing.
      ELSE do a bunch of shit to show the new pages
    \*----------------------------------------------*/
    if ($('#'+page).hasClass('is-active')) {
      return;
    } else {
       /*--------------------------*\
        TODO: See if I can add this under
        another section

        IF the <section> containing the
        requested page's content isn't
        already there, add it to the DOM
      \*--------------------------*/
      // if ($('#'+page).length === 0) {
      //   var newSection  = $('<section id="'+page+'" class="page '+page+'"></section>').data('pulled', 'yes');

      //   $(newSection).appendTo('body');
      // }

      /*----------------------------------------------*\
        SHOW PAGE CONTENT
          -If it's not there : Use AJAX then CSS
          -If it's there     : Just use CSS & DOM manipulation
          -Either way        : Update navigation and page headings
                               Hide inactive pages
      \*----------------------------------------------*/

      /*----------------------------------------------*\
        ...if it's not there : Use AJAX then CSS
      \*----------------------------------------------*/
        console.log('PAGE = ' + page + '; DATA PULLED = ' + $('#'+page).data('pulled'));

        if ($('#'+page).data('pulled') === 'yes' && page !== 'work' || !workPageLoaded) {

          $.ajax({
            url: page+'.html',
            success: function(data) {

              $('#'+page).html(data).data('pulled', 'no');

            },
            complete: function() {
              WorkModule.init();
            }
          });
        }

        else if (page === 'work' && workPageLoaded && $('#work').data('pulled') === 'yes') {
          $('#work').html(workPageData).data('pulled', 'no');
          WorkModule.init();
        }

      /*----------------------------------------------*\
        ...if it's there : Just use CSS & DOM manipulation
      \*----------------------------------------------*/
        else {
        }

      /*----------------------------------------------*\
        ...either way : Update navigation and page headings
                        Hide inactive pages
      \*----------------------------------------------*/

        /*--------------------------*\
          Update navigation
          and page headings
        \*--------------------------*/

        // Show all nav options on homepage
        if (page === 'home') {
          $('a[href="#home"]').parent('li').hide();
        }

        // When navigating to any page that is not a homepage
        $('nav li a[href=#'+page+']').parent().hide();

          //Add a title if it isn't there
          if ($('#'+page+' .container').find('.title').length === 0 && page !== 'work') {
            $('<h1 class="title">'+page+'</h1>').prependTo('#'+page+' .container');
          }

          if(page === 'work'){
            $('nav li a[href="#home"]').parent().show();
          } else if (page === 'home'){
            $('nav li a[href="#work"]').parent().show();
          }

        /*--------------------------*\
          Update states
        \*--------------------------*/
        var element = $("body"),
            classes = element.attr('class').split(/\s+/),
            pattern = /^show-page-/,
            pushIt = ((window.innerHeight - pushHeight)-$('.main-nav').height())*(-1);

        for(var i = 0; i < classes.length; i++){
          var className = classes[i];

          if(className.match(pattern)){
            element.removeClass(className + ' show-about show-contact')
            .addClass('show-page-'+page)
            .find('#'+page).addClass('is-active');
          }
        }
        $('section').not('#'+page).removeClass('is-active');

        /*--------------------------*\
          Hide inactive pages
          TODO: Clean this section up!
                A lot of this should be in CSS
        \*--------------------------*/

        //Hide home
        if (page !== 'home') {
          pushIt = (window.innerHeight - (pushHeight/2))*(-1);
          // resize <body> to prevent home from scrolling
          // $('body').css('max-height', 'none');

          $('.main-nav, #work').css({
            'transform'         : 'translateY(' + pushIt + 'px)',
            '-ms-transform'     : 'translateY(' + pushIt + 'px)', /* IE 9 */
            '-webkit-transform' : 'translateY(' + pushIt + 'px)', /* Safari and Chrome */
            '-o-transform'      : 'translateY(' + pushIt + 'px)', /* Opera */
            '-moz-transform'    : 'translateY(' + pushIt + 'px)' /* Firefox */
          });

          // HACK
          // Adjust position of "Home" .main-nav button 
          // on Work page after window has been resized
          // --------------------------------------------
          // waitForFinalEvent taken from: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed

          // TODO: Do this for orientationchange as well

          var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
              if (!uniqueId) {
                uniqueId = 'Wait for window resized';
              }
              if (timers[uniqueId]) {
                clearTimeout (timers[uniqueId]);
              }
              timers[uniqueId] = setTimeout(callback, ms);
            };
          })();

          $(window).resize(function () {

            waitForFinalEvent(function(){

              pushIt = (window.innerHeight - (pushHeight/2))*(-1);

              $('.show-page-work').find('.main-nav').css({
                'transform'         : 'translateY(' + pushIt + 'px)',
                '-ms-transform'     : 'translateY(' + pushIt + 'px)', /* IE 9 */
                '-webkit-transform' : 'translateY(' + pushIt + 'px)', /* Safari and Chrome */
                '-o-transform'      : 'translateY(' + pushIt + 'px)', /* Opera */
                '-moz-transform'    : 'translateY(' + pushIt + 'px)' /* Firefox */
              });
            }, 100, 'window resized');

          });
          // END HACK

          $('#work').one('transitionEnd transitionend webkitTransitionEnd MSTransitionEnd otransitionend', function(e) {
            var transProp = e.originalEvent.propertyName;
            if ((transProp === 'transform' || transProp === '-ms-transform' || transProp === '-webkit-transform' || transProp === '-o-transform' || transProp === '-moz-transform') && $('.show-page-work').length) {
              $(this).css({
                'top'                : '',
                'margin-top'         : pushIt,
                'transform'          : 'translateY(0)',
                '-ms-transform'      : 'translateY(0)',
                '-webkit-transform'  : 'translateY(0)',
                '-o-transform'       : 'translateY(0)',
                '-moz-transform'     : 'translateY(0)',
                '-webkit-transition' : 'none .65s ease-in-out',
                '-moz-transition'    : 'none .65s ease-in-out',
                '-o-transition'      : 'none .65s ease-in-out',
                'transition'         : 'none .65s ease-in-out'
              });
            }
          });
        }

        // Hide work and resize <body> to prevent home from scrolling
        if (page !== 'work') {

          // resize <body> to prevent home from scrolling
          $('body').css('max-height', window.innerHeight);

          $('.main-nav').css({
            'transform'         : 'translateY(0)',
            '-ms-transform'     : 'translateY(0)',
            '-webkit-transform' : 'translateY(0)',
            '-o-transform'      : 'translateY(0)',
            '-moz-transform'    : 'translateY(0)'
          });

          $('#work').css({
            'margin-top'         : '',
            'transform'          : 'translateY(-200%)',
            '-ms-transform'      : 'translateY(-200%)',
            '-webkit-transform'  : 'translateY(-200%)',
            '-o-transform'       : 'translateY(-200%)',
            '-moz-transform'     : 'translateY(-200%)',
            '-webkit-transition' : 'all .65s ease-in-out',
            '-moz-transition'    : 'all .65s ease-in-out',
            '-o-transition'      : 'all .65s ease-in-out',
            'transition'         : 'all .65s ease-in-out'
          });

        }
    }//end of 'else' statement to detect if page is not being shown
  },

  pageNavigation: function () {
    var pageTitleVar = GlobalModule.getUrlVars()["page"];
    /*--------------------------*\
      PAGE NAVIGATION
    \*--------------------------*/
    //On load, show the correct page...
    if (pageTitleVar === undefined) {
      GlobalModule.pageChange('home');
    }
    else if (pageTitleVar !== undefined) {
      GlobalModule.pageChange(pageTitleVar);
    }

    $('nav').mouseleave(function(){
      $.doTimeout( 'hover' );
      $.doTimeout('unhover', 500, function (elem) {
        $('body').removeClass('show-nav');
      }, this);
    });

    $('nav:not(.show-nav > nav)').on('click', function(){
      $('body').addClass('show-nav');
    });

    $('a[data-nav-type="page"]').on('click', function(e) {
      var page = $(this).attr('href').replace('#', '');

      e.preventDefault();

      GlobalModule.pageChange(page);

    });

    $(document).keydown(function (e) {

        // TODO: Make this function more robust. Right now this is not at all reusable code
        //       because I'm specificaly targetting '.show-page-work'/'.show-page-home'
        if ($('.show-page-work').length) {
          if (e.keyCode == 38) {
            History.pushState({state:2}, "home", "?page=home"); //TODO: Move this to the pagechange function
            GlobalModule.pageChange('home');
            return false;
          }
        } else if ($('.show-page-home').length) {
          if (e.keyCode == 40) {
            History.pushState({state:2}, "work", "?page=work"); //TODO: Move this to the pagechange function
            GlobalModule.pageChange('work');
            return false;
          }
        }
    });

    History.Adapter.bind(window,'statechange',function() {
      if (GlobalModule.getUrlVars()["page"] !== undefined) {
        GlobalModule.pageChange(GlobalModule.getUrlVars()["page"]);
      } else {
        GlobalModule.pageChange('home');
      }
    });
  }
};