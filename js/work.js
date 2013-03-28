/*--------------------------------------------------------------*\
  PORTFOLIO SETUP:
  FUNCTIONS AND VARS

  Anything to do with viewing a project goes here.
\*--------------------------------------------------------------*/
<<<<<<< HEAD

=======
>>>>>>> Basic layout and functionality updates
  var WorkModule = {
    init: function() {
      this.createProjArray();
      this.showAllProjects();
      this.workNavigation();
<<<<<<< HEAD
    },

    testertwo: function() {
      console.log('testertwo');
=======
      this.moveWithScroll();
      OBC.susyOffCanvasToggle.init($('a[href="#show-info"]'));
>>>>>>> Basic layout and functionality updates
    },

    createProjArray: function() {
      $('#work').find('.grid-item').each( function() {
<<<<<<< HEAD
        var projectID = $(this).attr('id');

        //make an array of the project IDs
        projects.push(projectID);
      });
    },

    // projectNav: function(project, event) {
    // var projectGrid  = project.parent(),
    //     projectTitle = project.attr('id'),
    //     projectPreloaded = projectData[projectTitle] !== undefined,
    //     projectInDom = $.trim( project.find('.grid-item__expanded-content').html() ).length;

    //   //expand project and update states
    //   projectGrid.find('.is-expanded')
    //   .removeClass('is-expanded')
    //   .addClass('is-thumb');

    //   $('body').addClass('is-expanded-view');

    //   project.removeClass('is-thumb').addClass('is-expanded');

    //   //Bring it to the top
    //   project.prependTo(projectGrid);

    //   // If this was triggered by a click event,
    //   // make a hash in the URL
    //   if (event === "click") {
    //     window.location.hash = projectTitle;
    //   }

    //   /*--------------------------*\
    //     Bring in the content
    //   \*--------------------------*/
    //   // If the content isn't already there, AJAX it in
    //     // NOTE: Using $.trim() instead of .is(:empty) incase
    //     //       there ends up being whitespace for some reason

    //     if( !projectInDom && !projectPreloaded ) {
    //       $.ajax({
    //         url: 'work/' + projectTitle + '.html',
    //         success: function(data) {
    //           project.find('.grid-item__expanded-content').html(data);
    //         }
    //       });
    //     } else if (projectPreloaded) {
    //       project.find('.grid-item__expanded-content').html(projectData[projectTitle].projectHTML);
    //     }
    //   //////////////////////////////      
    // },

    showAllProjects: function() {

      var showAllProjects = function showAllProjects() { 
        //Class switch-up
        $('#work').find('.is-thumb').removeClass('is-thumb').addClass('is-expanded');
=======
        var projectID      = $(this).attr('id');

        // If the projects aren't pre-loaded,
        // push the IDs into the array.
        if ($.inArray(projectID, projects) === -1) {
          projects.push(projectID);
        }

      });
    },

    showAllProjects: function() {

      var showAllProjectsView = function showAllProjectsView() {
        //Class switch-up
        $('#work').find('.is-thumb').toggleClass('is-thumb').toggleClass('is-expanded');
        $('body').addClass('is-expanded-view');
>>>>>>> Basic layout and functionality updates
        $('#work').find('.grid-item').each(function() {
          var project      = $(this),
              projectTitle = project.attr('id');


          /*--------------------------*\
          Bring in the content
          \*--------------------------*/
          // If the content isn't already there, AJAX it in

          // NOTE: Using $.trim() instead of .is(:empty) incase
          //       there ends up being whitespace for some reason
          if( !$.trim( project.find('.grid-item__expanded-content').html() ).length ) {

            $.ajax({
              url: 'work/' + projectTitle + '.html',
              success: function(data) {
                project.find('.grid-item__expanded-content').html(data);
              }
            });
          }

        });
      };

<<<<<<< HEAD
=======
      var collapseAllProjects = function collapseAllProjects() {
        $('#work').find('.is-expanded').removeClass('is-expanded').addClass('is-thumb');
        $('body').removeClass('is-expanded-view');
      };

>>>>>>> Basic layout and functionality updates
      /*--------------------------*\
        SHOW ALL PROJECTS?
      \*--------------------------*/
      if (window.location.hash === '#all-projects'){
<<<<<<< HEAD
        showAllProjects();
      }

      $('a[href="#all-projects"]').on('click', function() {
        showAllProjects();
      });
    },

    workNavigation: function() {
      var expandedProjIndex = 0;

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

      //If the URL has a hash with the project in it, navigate to that project
      if (window.location.hash) {
        projectNav($('#'+projectID), "load");
      }

      //Expand thumb on click
      $('.is-thumb').on('click', function(e) {
        var clickedProject = $(this);

        projectNav(clickedProject, "click");
=======
        showAllProjectsView();
      }

      $('a[href="#all-projects"]').on('click', function() {
        showAllProjectsView();
      });

      $('a[href="#collapse-projects"]').on('click', function(e) {
        e.preventDefault();
        collapseAllProjects();
      });

      $(document).keydown(function (e) {
        if (e.keyCode === 27) {
          e.preventDefault();
          collapseAllProjects();
        }
      });

    },

    moveWithScroll: function() {
      $('.grid-item__expanded-content').each(function() {
        var expandedProj  = $(this);

        $(window).scroll( function() {
          var info          = expandedProj.find('.grid-item__info'),
              infoHeight    = info.height(),
              projectHeight = expandedProj.find('.grid-item__images').length > 0 ? expandedProj.find('.grid-item__images').height() : 0, //TODO: take ternary off of this, won't need it after all content is in

              docViewTop    = $(window).scrollTop(),
              docViewBottom = docViewTop + $(window).height(),
              elemTop       = expandedProj.offset().top - docViewTop,
              elemBottom    = expandedProj.offset().top + projectHeight,

              fromTop       = $(window).scrollTop() - expandedProj.offset().top;

          if ((elemBottom + (infoHeight*2) >= docViewBottom) && (elemTop <= docViewTop)) {
            fromTop = fromTop < 0 ? 0 : fromTop;
            // console.log(expandedProj.parent().attr('id'));
            // console.log('window scrolltop' + $(window).scrollTop());
            // console.log('fromTop= ' + fromTop);
            // console.log('elemTop= ' + elemTop);
            info.css('top', fromTop);
            expandedProj.parent().find('a[href="#show-info"]').css('top', fromTop > 20 ? (fromTop + 100) : 0);
          }

          // TODO: Delete original check and original fromTop when I'm sure I don't need it anymore
          // ORIGINAL CHECK: console.log((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
          // ORIGINAL fromTop: fromTop       = projectHeight - infoHeight < $(window).scrollTop() ? infoHeight < $(window).scrollTop() : $(window).scrollTop();
          // SECONDARY fromTop: fromTop       = projectHeight - infoHeight < $(window).scrollTop() ? $(window).scrollTop() - expandedProj.offset().top : $(window).scrollTop();

        });

      });

    },

    workNavigation: function() {
      var expandedProjIndex = 0;

      function projectNav(project, event) {
        var projectGrid  = project.parent(),
            projectTitle = project.attr('id'),
            projectPreloaded = projectData[projectTitle] !== undefined,
            projectInDom = $.trim( project.find('.grid-item__expanded-content').html() ).length;

          // expand project and update states
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

      //If the URL has a hash with the project in it, navigate to that project
      if (window.location.hash) {
        projectNav($(window.location.hash), "load");
      }

      $(window).on('hashchange', function() {
        projectNav($(window.location.hash), "load");
        expandedProjIndex = $.inArray(window.location.hash.replace('#',''), projects);
      });

      //Expand thumb on click
      $('.grid-item').on('click', function(e) {
        var clickedProject = $(this);

        if (clickedProject.is('.is-thumb')) {
          projectNav(clickedProject, "click");
        }
>>>>>>> Basic layout and functionality updates

        //Update expanded project index for prev/next project nav
        var expandedProj = $('.is-expanded').attr('id');
            expandedProjIndex = $.inArray(expandedProj, projects);
      });

      /*--------------------------*\
        PREV/NEXT PROJECT NAV
<<<<<<< HEAD
=======
        TODO: Clean this up, it's sloppy
>>>>>>> Basic layout and functionality updates
      \*--------------------------*/

      //Get the index of the exapnded project
      var expandedProj = $('.is-expanded').attr('id'),
          expandedProjIndex = $.inArray(expandedProj, projects);

      //TODO: see if I can simplify these two 'on' functions
      //TODO: instead of passing in "click" as second parameter, use
      //      something like 'event.target'
<<<<<<< HEAD
      $('.expanded-Proj-Nav').on('click', 'a[href="#next-proj"]', function(e) {
        e.preventDefault();
        var nextProjIndex = expandedProjIndex + 1,
=======
      $('.expanded-Proj-Nav[href="#next-proj"]').on('click', function(e) {
        e.preventDefault();
        var nextProjIndex = (expandedProjIndex !== (projects.length - 1)) ? expandedProjIndex + 1 : 0,
>>>>>>> Basic layout and functionality updates
            nextProj      = projects[nextProjIndex];

        // Trigger the projectNav function to
        // show the next project
        projectNav($('#'+nextProj), "click");

        // Reset expandedProjIndex to show we've
        // moved on to the next project
<<<<<<< HEAD
        expandedProjIndex = nextProjIndex;

        hideProjArrow($(this));

      })
      .on('click', 'a[href="#prev-proj"]', function(e) {
        e.preventDefault();
        var prevProjIndex = expandedProjIndex - 1,
=======
        expandedProjIndex = (expandedProjIndex !== (projects.length - 1)) ? nextProjIndex : 0;

      });
      $('.expanded-Proj-Nav[href="#prev-proj"]').on('click', function(e) {
        e.preventDefault();
        var prevProjIndex = (expandedProjIndex !== 0) ? (expandedProjIndex - 1) : (projects.length - 1),
>>>>>>> Basic layout and functionality updates
            prevProj      = projects[prevProjIndex];

        // Trigger the projectNav function to
        // show the previous project

        projectNav($('#'+prevProj), "click");
<<<<<<< HEAD
        
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

  };

  // /*------------------------------------------*\
  //   FUNCTION: projectNav
    
  //   Used to show expanded project view
  // \*------------------------------------------*/
  // function projectNav(project, event) {
  //   var projectGrid  = project.parent(),
  //       projectTitle = project.attr('id'),
  //       projectPreloaded = projectData[projectTitle] !== undefined,
  //       projectInDom = $.trim( project.find('.grid-item__expanded-content').html() ).length;

  //     //expand project and update states
  //     projectGrid.find('.is-expanded')
  //     .removeClass('is-expanded')
  //     .addClass('is-thumb');

  //     $('body').addClass('is-expanded-view');

  //     project.removeClass('is-thumb').addClass('is-expanded');

  //     //Bring it to the top
  //     project.prependTo(projectGrid);

  //     // If this was triggered by a click event,
  //     // make a hash in the URL
  //     if (event === "click") {
  //       window.location.hash = projectTitle;
  //     }

  //     /*--------------------------*\
  //       Bring in the content
  //     \*--------------------------*/
  //     // If the content isn't already there, AJAX it in
  //       // NOTE: Using $.trim() instead of .is(:empty) incase
  //       //       there ends up being whitespace for some reason

  //       if( !projectInDom && !projectPreloaded ) {
  //         $.ajax({
  //           url: 'work/' + projectTitle + '.html',
  //           success: function(data) {
  //             project.find('.grid-item__expanded-content').html(data);
  //           }
  //         });
  //       } else if (projectPreloaded) {
  //         project.find('.grid-item__expanded-content').html(projectData[projectTitle].projectHTML);
  //       }
  //     //////////////////////////////

  // }
  // //////////////////////////////////////////////END projectNav

  /*------------------------------------------*\
    FUNCTION: showAllProjects
    
    Fancier/more controlled way to show
    details than CSS :hover alone
  \*------------------------------------------*/

  // function showAllProjects() {
  //   //Class switch-up
  //   $('#work').find('.is-thumb').removeClass('is-thumb').addClass('is-expanded');

  //   /*--------------------------*\
  //     Bring in the content
  //   \*--------------------------*/
  //   // If the content isn't already there, AJAX it in
  //     // NOTE: Using $.trim() instead of .is(:empty) incase
  //     //       there ends up being whitespace for some reason

  //     $('#work').find('.grid-item').each(function() {
  //       var project      = $(this),
  //           projectTitle = project.attr('id');

  //       if( !$.trim( project.find('.grid-item__expanded-content').html() ).length ) {

  //         $.ajax({
  //           url: 'work/' + projectTitle + '.html',
  //           success: function(data) {
  //             project.find('.grid-item__expanded-content').html(data);
  //           }
  //         });
  //       }

  //     });
  // }//////////////////////////////////////////////END showAllProjects

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
  // /*------------------------------------------*\
  //   PORTFOLIO STUFF
  // \*------------------------------------------*/
  //   function portfolioStuff() {
  //     var expandedProjIndex = 0;

  //     //Create array of projects
  //     $('#work').find('.grid-item').each( function() {
  //       var projectID = $(this).attr('id');

  //       //make an array of the project IDs
  //       projects.push(projectID);
  //     });

  //     //If the URL has a hash with the project in it, navigate to that project
  //     if (window.location.hash) {
  //       projectNav($('#'+projectID), "load");
  //     }

  //     //Expand thumb on click
  //     $('.is-thumb').on('click', function(e) {
  //       var clickedProject = $(this);

  //       projectNav(clickedProject, "click");

  //       //Update expanded project index for prev/next project nav
  //       var expandedProj = $('.is-expanded').attr('id');
  //           expandedProjIndex = $.inArray(expandedProj, projects);
  //     });

  //     /*--------------------------*\
  //       PREV/NEXT PROJECT NAV
  //     \*--------------------------*/

  //     //Get the index of the exapnded project
  //     var expandedProj = $('.is-expanded').attr('id'),
  //         expandedProjIndex = $.inArray(expandedProj, projects);

  //     //TODO: see if I can simplify these two 'on' functions
  //     //TODO: instead of passing in "click" as second parameter, use
  //     //      something like 'event.target'
  //     $('.expanded-Proj-Nav').on('click', 'a[href="#next-proj"]', function(e) {
  //       e.preventDefault();
  //       var nextProjIndex = expandedProjIndex + 1,
  //           nextProj      = projects[nextProjIndex];

  //       // Trigger the projectNav function to
  //       // show the next project
  //       projectNav($('#'+nextProj), "click");

  //       // Reset expandedProjIndex to show we've
  //       // moved on to the next project
  //       expandedProjIndex = nextProjIndex;

  //       hideProjArrow($(this));

  //     })
  //     .on('click', 'a[href="#prev-proj"]', function(e) {
  //       e.preventDefault();
  //       var prevProjIndex = expandedProjIndex - 1,
  //           prevProj      = projects[prevProjIndex];

  //       // Trigger the projectNav function to
  //       // show the previous project

  //       projectNav($('#'+prevProj), "click");
        
  //       // if (expandedProjIndex > 0) {
  //       //   projectNav($('#'+prevProj), "click");
  //       // } else {
  //       //   projectNav($('#'+projects[projects.length]));
  //       // }

  //       // Reset expandedProjIndex to show we've
  //       // moved on to the previous project
  //       expandedProjIndex = prevProjIndex;
        
  //       hideProjArrow($(this));

  //     });
  //     //////////////////////////////END PREV/NEXT PROJECT NAV

  //     $(document).keydown(function(e){
  //       var prevProjIndex = expandedProjIndex - 1,
  //           prevProj      = projects[prevProjIndex],
  //           nextProjIndex = expandedProjIndex + 1,
  //           nextProj      = projects[nextProjIndex];

  //         if (e.keyCode == 37) {
  //           projectNav($('#'+prevProj), "click");
  //           expandedProjIndex = prevProjIndex;
  //           return false;
  //         }
  //         if (e.keyCode == 39) {
  //           projectNav($('#'+nextProj), "click");
  //           expandedProjIndex = nextProjIndex;
  //           return false;
  //         }

  //     });

  //     /*--------------------------*\
  //       SHOW ALL PROJECTS?
  //     \*--------------------------*/
  //     if (window.location.hash === '#all-projects'){
  //       showAllProjects();
  //     }

  //     $('a[href="#all-projects"]').on('click', function() {
  //       showAllProjects();
  //     });
  //     /////////////////////////////

  //     /*--------------------------*\
  //       FUNCTION: expandedNav

  //       Navigating between expanded projects
        
  //       NOTE: this function could not be
  //             grouped in the function/var
  //             section above
  //     \*--------------------------*/
  //     // function createProjArray() {
  //     //   //If the work section is visible...
  //     //     $('#work').find('.grid-item').each( function() {
  //     //       var projectID = $(this).attr('id');

  //     //       //make an array of the project IDs
  //     //       projects.push(projectID);
  //     //     });
  //     // }//////////////////////////////END createProjArray

  //     /*--------------------------*\
  //       FUNCTION: hideProjArrow
        
  //       Show and hide prev/next arrows
  //       if project is first or last

  //       NOTE: this function could not be
  //             grouped in the function/var
  //             section above
  //     \*--------------------------*/

  //     function hideProjArrow(arrow) {
  //         var firstProj = projects[0],
  //             lastProj  = projects[projects.length];

  //         console.log(expandedProjIndex);

  //         if (expandedProjIndex === (projects.length) && arrow.attr('href') === '#next-proj') {
  //           projectNav($('#' + firstProj), "click"); //TODO: Pass second parameter in dynamically
  //           expandedProjIndex = 0;
  //         }
  //         // else if (expandedProjIndex < 0 && arrow.attr('href') === '#prev-proj') {
  //         //   projectNav($('#' + lastProj), "click"); //TODO: Pass second parameter in dynamically
  //         //   expandedProjIndex = projects.length;
  //         // }
  //     }//////////////////////////////END hideProjArrow


  //   }
  //////////////////////////////////////////////END PORTFOLIO STUFF
=======

        // Reset expandedProjIndex to show we've
        // moved on to the previous project
        expandedProjIndex = (expandedProjIndex !== 0) ? prevProjIndex : (projects.length - 1);
      });
      //////////////////////////////END PREV/NEXT PROJECT NAV
        $(document).keydown(function (e) {
          var prevProjIndex = (expandedProjIndex !== 0) ? (expandedProjIndex - 1) : (projects.length - 1),
              prevProj      = projects[prevProjIndex],
              nextProjIndex = (expandedProjIndex !== (projects.length - 1)) ? expandedProjIndex + 1 : 0,
              nextProj      = projects[nextProjIndex];

            // Only let users use prev/next arrows if they've expanded a project
            // or if they are on the work page
              // TODO: Make this function more robust. Right now this is not at all reusable code
              //       because I'm specificaly targetting '.show-page-work'
            if ($(this).find('.is-expanded-view').length && $('.show-page-work').length) {

              if (e.keyCode == 37) {
                projectNav($('#'+prevProj), "click");
                expandedProjIndex = (expandedProjIndex !== 0) ? prevProjIndex : (projects.length - 1);
                return false;
              }
              if (e.keyCode == 39) {
                projectNav($('#'+nextProj), "click");
                expandedProjIndex = (expandedProjIndex !== (projects.length - 1)) ? nextProjIndex : 0;
                return false;
              }

            }

        });
    }
  };
>>>>>>> Basic layout and functionality updates
  //////////////////////////////////////////////////////////////////WORK PORTFOLIO SETUP: VARS AND FUNCTIONS