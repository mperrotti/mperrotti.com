$(document).on('ready', function() {
var workPageLoaded = false,
    workPageData   = '',
    projects = [],
    projectData = {};
/*--------------------------------------------------------------*\
  BASIC PAGE SETUP:
  FUNCTIONS AND VARS
\*--------------------------------------------------------------*/
  /*------------------------------------------*\
    FUNCTION: preloadWorkPage

    Preload the work page
    
  \*------------------------------------------*/
  function preloadWorkPage (step) {
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
                  preloadWorkPage(1);
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
  }

  /*------------------------------------------*\
    FUNCTION: getUrlVars

    Read the URL vars to tell
    which page we're at.
    
    Pages: Home, Work, About
  \*------------------------------------------*/
  function getUrlVars() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars; //change to 'hash[1]' to return project ID
  }
  //////////////////////////////////////////////END READ URL VARS

  /*------------------------------------------*\
    VARS

    Used for navigation

    HTML5 History API vars and
    project ID variable
  \*------------------------------------------*/
  var History      = window.History,
      State        = History.getState(),
      pageTitle    = State.title.toLowerCase(),
      pageTitleVar = getUrlVars()["page"]; //Returns the page title from getUrlVars function
      projectID    = document.location.hash;
  //////////////////////////////////////////////END NAVIGATION VARS

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
  function pageChange(page) {
    var homeHeight  = $('#home').height(),
        workHeight  = $('#work').height(),
        aboutHeight = $('#about').height(),
        pushHeight  = $('nav').height();

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
              portfolioStuff();
              OBC.susyOffCanvasToggle.init($('.toggle-swipe'));
              initCycle();
            }
          });
        }

        else if (page === 'work' && workPageLoaded && $('#work').data('pulled') === 'yes') {
          $('#work').html(workPageData).data('pulled', 'no');
          portfolioStuff();
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

  }//////////////////////////////////////////////END PAGECHANGE FUNCTION

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
//////////////////////////////////////////////////////////////////END BASIC PAGE SETUP: VARS AND FUNCTIONS

/*--------------------------------------------------------------*\
  PORTFOLIO SETUP:
  FUNCTIONS AND VARS

  Anything TODO with viewing a project goes here.
\*--------------------------------------------------------------*/

  /*------------------------------------------*\
    FUNCTION: projectNav
    
    Used to show expanded project view
  \*------------------------------------------*/
  function projectNav(project, event) {
    var projectGrid  = project.parent(),
        projectTitle = project.attr('id'),
        projectPreloaded = projectData[projectTitle] !== undefined,
        projectInDom = $.trim( project.find('.grid-item__expanded-content').html() ).length;

      //expand project and update states
      projectGrid.find('.is-expanded')
      .removeClass('is-expanded')
      .addClass('is-thumb');

      $('body').addClass('is-expanded-view');

      project.removeClass('is-thumb').addClass('is-expanded');

      //Bring it to the top
      project.prependTo(projectGrid);

      // If this was triggered by a click event,
      // make a hash in the URL
      if (event === "click") {
        window.location.hash = projectTitle;
      }

      /*--------------------------*\
        Bring in the content
      \*--------------------------*/
      // If the content isn't already there, AJAX it in
        // NOTE: Using $.trim() instead of .is(:empty) incase
        //       there ends up being whitespace for some reason

        if( !projectInDom && !projectPreloaded ) {
          $.ajax({
            url: 'work/' + projectTitle + '.html',
            success: function(data) {
              project.find('.grid-item__expanded-content').html(data);
            }
          });
        } else if (projectPreloaded) {
          project.find('.grid-item__expanded-content').html(projectData[projectTitle].projectHTML);
        }
      //////////////////////////////

  }
  //////////////////////////////////////////////END projectNav

  /*------------------------------------------*\
    FUNCTION: showAllProjects
    
    Fancier/more controlled way to show
    details than CSS :hover alone
  \*------------------------------------------*/

  function showAllProjects() {
    //Class switch-up
    $('#work').find('.is-thumb').removeClass('is-thumb').addClass('is-expanded');

    /*--------------------------*\
      Bring in the content
    \*--------------------------*/
    // If the content isn't already there, AJAX it in
      // NOTE: Using $.trim() instead of .is(:empty) incase
      //       there ends up being whitespace for some reason

      $('#work').find('.grid-item').each(function() {
        var project      = $(this),
            projectTitle = project.attr('id');

        if( !$.trim( project.find('.grid-item__expanded-content').html() ).length ) {

          $.ajax({
            url: 'work/' + projectTitle + '.html',
            success: function(data) {
              project.find('.grid-item__expanded-content').html(data);
            }
          });
        }

      });
  }//////////////////////////////////////////////END showAllProjects

  /*------------------------------------------*\
    THIS FUNCTION WAS GIVING ME TROUBLE.
    JUST USING CSS UNLESS I FEEL LIKE I REALLY NEED IT

    FUNCTION: hoverDetails
    
    Fancier/more controlled way to show
    details than CSS :hover alone
  \*------------------------------------------*/
  // function hoverDetails() {
  //   var li_cache, over = false;

  //   $('.grid')
  //     .delegate( '.grid-item.is-thumb', 'mouseenter', function ( e ) {
  //       var $info = $( this ), speed;

  //       if ( li_cache === this && over ) {
  //         $.doTimeout( 'hoverOut' );
  //         return;
  //       }

  //       if ( over ) {
  //         console.log('mouseenter - over');
  //         $.doTimeout( 'hoverOut', true );
  //         speed = 0;
  //       } else {
  //         console.log('mouseenter - !over');
  //         $.doTimeout( 'hoverOut' );
  //         speed = 500;
  //       }

  //       $.doTimeout( 'hoverIn', speed, function () {
  //         over = true;
  //         $info.find('.grid-item__info').fadeTo( 200, 1.0 );
  //       });
  //     })
  //     .delegate( '.grid-item.is-thumb', 'mouseleave', function ( e ) {
  //       var $info = $( this );

  //       $.doTimeout( 'hoverIn' );
  //       $.doTimeout( 'hoverOut', 500, function () {
  //         console.log('mouseleave');
  //         over = false;
  //         $info.find('.grid-item__info').stop( true ).fadeOut();
  //       });
  //     });
  // }
  //////////////////////////////////////////////END hoverDetails
  //////////////////////////////////////////////////////////////////WORK PORTFOLIO SETUP: VARS AND FUNCTIONS
  
/*--------------------------------------------------------------*\
  FRONT-END REALNESSSS - THE JS TO MAKE IT WERK
\*--------------------------------------------------------------*/

  /*------------------------------------------*\
    GLOBAL STUFF
  \*------------------------------------------*/
    
    // Pre-load the work page with AJAX
    preloadWorkPage(0);

    //Init off-canvas toggling
    $(function () {
        OBC.susyOffCanvasToggle.init($('.toggle'));
    });

    /*--------------------------*\
      PAGE NAVIGATION
    \*--------------------------*/
    //On load, show the correct page...
    if (pageTitleVar !== undefined) {
      pageChange(pageTitleVar);
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

      pageChange(page);

    });

    History.Adapter.bind(window,'statechange',function() {
      if (getUrlVars()["page"] !== undefined) {
        pageChange(getUrlVars()["page"]);
      } else {
        pageChange('home');
      }
    });
    //////////////////////////////END PAGE NAVIGATION
  //////////////////////////////////////////////END GLOBAL STUFF

  /*------------------------------------------*\
    PORTFOLIO STUFF
  \*------------------------------------------*/
    function portfolioStuff() {
      var expandedProjIndex = 0;

      //Create array of projects
      createProjArray();

      //If the URL has a hash with the project in it, navigate to that project
      if (window.location.hash) {
        projectNav($('#'+projectID), "load");
      }

      //Expand thumb on click
      $('.is-thumb').on('click', function(e) {
        var clickedProject = $(this);

        projectNav(clickedProject, "click");

        //Update expanded project index for prev/next project nav
        var expandedProj = $('.is-expanded').attr('id');
            expandedProjIndex = $.inArray(expandedProj, projects);
      });

      /*--------------------------*\
        PREV/NEXT PROJECT NAV
      \*--------------------------*/

      //Get the index of the exapnded project
      var expandedProj = $('.is-expanded').attr('id'),
          expandedProjIndex = $.inArray(expandedProj, projects);

      //TODO: see if I can simplify these two 'on' functions
      //TODO: instead of passing in "click" as second parameter, use
      //      something like 'event.target'
      $('.expanded-Proj-Nav').on('click', 'a[href="#next-proj"]', function(e) {
        e.preventDefault();
        var nextProjIndex = expandedProjIndex + 1,
            nextProj      = projects[nextProjIndex];

        // Trigger the projectNav function to
        // show the next project
        projectNav($('#'+nextProj), "click");

        // Reset expandedProjIndex to show we've
        // moved on to the next project
        expandedProjIndex = nextProjIndex;

        hideProjArrow($(this));

      })
      .on('click', 'a[href="#prev-proj"]', function(e) {
        e.preventDefault();
        var prevProjIndex = expandedProjIndex - 1,
            prevProj      = projects[prevProjIndex];

        // Trigger the projectNav function to
        // show the previous project

        projectNav($('#'+prevProj), "click");
        
        // if (expandedProjIndex > 0) {
        //   projectNav($('#'+prevProj), "click");
        // } else {
        //   projectNav($('#'+projects[projects.length]));
        // }

        // Reset expandedProjIndex to show we've
        // moved on to the previous project
        expandedProjIndex = prevProjIndex;
        
        hideProjArrow($(this));

      });
      //////////////////////////////END PREV/NEXT PROJECT NAV

      $(document).keydown(function(e){
        var prevProjIndex = expandedProjIndex - 1,
            prevProj      = projects[prevProjIndex],
            nextProjIndex = expandedProjIndex + 1,
            nextProj      = projects[nextProjIndex];

          if (e.keyCode == 37) {
            projectNav($('#'+prevProj), "click");
            expandedProjIndex = prevProjIndex;
            return false;
          }
          if (e.keyCode == 39) {
            projectNav($('#'+nextProj), "click");
            expandedProjIndex = nextProjIndex;
            return false;
          }

      });

      /*--------------------------*\
        SHOW ALL PROJECTS?
      \*--------------------------*/
      if (window.location.hash === '#all-projects'){
        showAllProjects();
      }

      $('a[href="#all-projects"]').on('click', function() {
        showAllProjects();
      });
      /////////////////////////////

      /*--------------------------*\
        FUNCTION: expandedNav

        Navigating between expanded projects
        
        NOTE: this function could not be
              grouped in the function/var
              section above
      \*--------------------------*/
      function createProjArray() {
        //If the work section is visible...
          $('#work').find('.grid-item').each( function() {
            var projectID = $(this).attr('id');

            //make an array of the project IDs
            projects.push(projectID);
          });
      }//////////////////////////////END createProjArray

      /*--------------------------*\
        FUNCTION: hideProjArrow
        
        Show and hide prev/next arrows
        if project is first or last

        NOTE: this function could not be
              grouped in the function/var
              section above
      \*--------------------------*/

      function hideProjArrow(arrow) {
          var firstProj = projects[0],
              lastProj  = projects[projects.length];

          console.log(expandedProjIndex);

          if (expandedProjIndex === (projects.length) && arrow.attr('href') === '#next-proj') {
            projectNav($('#' + firstProj), "click"); //TODO: Pass second parameter in dynamically
            expandedProjIndex = 0;
          }
          // else if (expandedProjIndex < 0 && arrow.attr('href') === '#prev-proj') {
          //   projectNav($('#' + lastProj), "click"); //TODO: Pass second parameter in dynamically
          //   expandedProjIndex = projects.length;
          // }
      }//////////////////////////////END hideProjArrow


    }
  //////////////////////////////////////////////END PORTFOLIO STUFF

//////////////////////////////////////////////////////////////////END FRONT-END REALNESSSS
});