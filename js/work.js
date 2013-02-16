/*--------------------------------------------------------------*\
  PORTFOLIO SETUP:
  FUNCTIONS AND VARS

  Anything to do with viewing a project goes here.
\*--------------------------------------------------------------*/

  var WorkModule = {
    init: function() {
      this.createProjArray();
      this.showAllProjects();
      this.workNavigation();
    },

    testertwo: function() {
      console.log('testertwo');
    },

    createProjArray: function() {
      $('#work').find('.grid-item').each( function() {
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

      /*--------------------------*\
        SHOW ALL PROJECTS?
      \*--------------------------*/
      if (window.location.hash === '#all-projects'){
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
  //////////////////////////////////////////////////////////////////WORK PORTFOLIO SETUP: VARS AND FUNCTIONS