//global vars
var workPageLoaded = false,
    workPageData   = '',
    projects = [],
    projectData = {};

var GlobalModule = {
  init: function() {
    this.preloadWorkPage(0);
    this.getUrlVars();
    this.pageNavigation();
  },

  /*------------------------------------------*\
    FUNCTION: preloadWorkPage

    Preload the work page
    
  \*------------------------------------------*/
  preloadWorkPage: function(step) {
    switch (step) {
      case 0: $.ajax({
                url    : 'work2.html',
                async  : true,
                success: function(data) {
                  $(data).find('.grid-item').each( function() {
                    var projectID = $(this).attr('id');

                    //make an array of the project IDs
                    projects.push(projectID);
                  });
                },
                complete: function(data) {
                  workPageLoaded = true;
                  workPageData = data.responseText;
                  GlobalModule.preloadWorkPage(1);
                }
              }); break;

      case 1: $.each(projects, function (index, value) {
                $.ajax({
                  url: 'work/' + value + '.html',
                  success: function(data) {
                    projectData[value] = {
                      projectHTML: data
                    };
                  },
                  complete: function () {
                    //console.log(projectData);
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
        pushHeight  = $('nav').height();

  /*------------------------------------------*\
    FUNCTION: scrollToTop
    
    Used to scroll page back
    to top after user has been
    brought to a new section
  \*------------------------------------------*/
  function scrollToTop() {
    if ($(window).scrollTop() > 100) {
      $("html, body").animate({ scrollTop: 0 }, 200);
    }
  }
  //////////////////////////////////////////////END SCROLLTOTOP FUNCTION

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

    console.log('hashed page = ' + page);
  }

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
      if ($('#'+page).length === 0) {
        var newSection  = $('<section id="'+page+'"></section>').data('pulled', 'yes');

        // if (page === 'work' && workPageLoaded) {
        //   newSection  = $('<section id="'+page+'"></section>').data('pulled', 'no');
        // }
        
        $(newSection).insertAfter('.is-active:not("nav li")');
      }

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

          console.log('using AJAX');

          $.ajax({
            url: page+'2.html',
            success: function(data) {
              console.log('AJAX success');

              $('#'+page).html(data).data('pulled', 'no');

            },
            complete: function() {
              console.log('AJAX complete');
              WorkModule.init();
              OBC.susyOffCanvasToggle.init($('.toggle-swipe'));
              initCycle();
            }
          });
        }

        else if (page === 'work' && workPageLoaded && $('#work').data('pulled') === 'yes') {
          $('#work').html(workPageData).data('pulled', 'no');
          WorkModule.init();
          OBC.susyOffCanvasToggle.init($('.toggle-swipe'));
          initCycle();
        }

      /*----------------------------------------------*\
        ...if it's there : Just use CSS & DOM manipulation
      \*----------------------------------------------*/
        else {
          //CSS: Pull it up and show it
          $('#'+page).css({
            'margin-top' : 0,
            'margin-bottom' : 0
          }).show();

          //DOM manipulation: Throw it to the end
          $('#'+page).insertAfter($('body>section').last());
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
          $('nav li:not(.home-btn)').slideDown();
        }

        // When navigating to any page that is not a homepage
        $('a[href=#'+page+']').parent().slideUp('200', function(){

          //Add a title if it isn't there
          if ($('#'+page+' .container').find('.title').length === 0) {
            $('<h1 class="title">'+page+'</h1>').prependTo('#'+page+' .container');
          }

          if(page === 'work'){
            $('a[href="#home"]').parent().slideDown();
          } else if (page === 'home'){
            $('a[href="#work"]').parent().slideDown();
          }

        });

        /*--------------------------*\
          Update states
        \*--------------------------*/
        var element = $("body"),
            classes = element.attr('class').split(/\s+/),
            pattern = /^show-page-/;

        for(var i = 0; i < classes.length; i++){
          var className = classes[i];

          if(className.match(pattern)){
            element.removeClass(className)
            .addClass('show-page-'+page)
            .find('#'+page).addClass('is-active');
          }
        }
        $('section').not('#'+page).removeClass('is-active');

        /*--------------------------*\
          Hide inactive pages
        \*--------------------------*/

        //Hide home
        if (page !== 'home'){
          $('#home').css({
            'margin-top' : homeHeight*(-1)-pushHeight,
            'margin-bottom' : pushHeight
          })
          .on('transitionEnd transitionend webkitTransitionEnd MSTransitionEnd otransitionend', function(e) {
            var transProp = e.originalEvent.propertyName;
            if (transProp === 'margin-top' || transProp === 'margin-bottom') {
              $(this).hide();
            }
            $(this).css({
              'margin-top' : 0,
              'margin-bottom' : 0
            });
            scrollToTop();
          });
        }

        //Hide work
        if (page !== 'work'){
          $('#work').css({
            'margin-top'    : workHeight*(-1)-pushHeight,
            'margin-bottom' : pushHeight
          })
          .on('transitionEnd transitionend webkitTransitionEnd MSTransitionEnd otransitionend', function(e) {
            var transProp = e.originalEvent.propertyName;
            if (transProp === 'margin-top' || transProp === 'margin-bottom') {
              $(this).hide();
            }
            scrollToTop();
          });
        }

        //Hide about
        if (page !== 'about'){
          $('#about').css({
            'margin-top'    : aboutHeight*(-1)-pushHeight,
            'margin-bottom' : pushHeight
          })
          .on('transitionEnd transitionend webkitTransitionEnd MSTransitionEnd otransitionend', function(e) {
            var transProp = e.originalEvent.propertyName;
            if (transProp === 'margin-top' || transProp === 'margin-bottom') {
              $(this).hide();
            }
            scrollToTop();
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
    if (pageTitleVar !== undefined) {
      GlobalModule.pageChange(pageTitleVar);
    }

    $('.toggle-nav').mouseenter(function(){
      $.doTimeout( 'hover', 350, function(elem){
        $('body').addClass('show-nav');
      }, this);
    });
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

    History.Adapter.bind(window,'statechange',function() {
      if (GlobalModule.getUrlVars()["page"] !== undefined) {
        GlobalModule.pageChange(GlobalModule.getUrlVars()["page"]);
      } else {
        GlobalModule.pageChange('home');
      }
    });
  }
};
/*------------------------------------*\
    FUNCTION: susyOffCanvasToggle

    Triggers states to toggle off-canvas content

    based on http://oddbird.net/demos/susy-off-canvas/
\*------------------------------------*/
var OBC = (function (OBC, $) {

  'use strict';

  OBC.susyOffCanvasToggle = {
    init: function (triggers) {
      $(triggers).click(function (e) {
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
          body.toggleClass('show-about');
      }
      return body.attr('class');
    },
    toggleText: function (triggers) {
      var right = $(triggers).filter('[href="#show-info"]');
      var body = $('body');
      if (body.hasClass('show-grid-item__info')) {
        right.text('hide right');
      }
    }
  };

  return OBC;

}(OBC || {}, jQuery));
//////////////////////////////////////////////END OFF-CANVAS STATE TOGGLING