/*--------------------------------------------------------------*\
  PORTFOLIO

  Anything to do with opening or viewing a project goes here.
\*--------------------------------------------------------------*/
  var WorkModule = {
    init: function() {
      this.collapseAllProjects();
      this.createProjArray();
      this.showAllProjects();
      this.workNavigation();
      this.moveWithScroll();
      OBC.susyOffCanvasToggle.init($('a[href="#show-info"]'));
    },

    collapseAllProjects: function() {
      $('#work').find('.is-expanded').removeClass('is-expanded').addClass('is-thumb');
      $('body').removeClass('is-expanded-view')
               .removeClass('is-expanded-view-single')
               .removeClass('is-expanded-view-all');
    },

    createProjArray: function() {
      $('#work').find('.grid-item').each( function() {
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
        $('body').addClass('is-expanded-view')
                 .addClass('is-expanded-view-all')
                 .removeClass('is-expanded-view-single');
        var allProjectsShown = $('#work').find('.grid-item').map(function() {
          var project      = $(this),
              projectTitle = project.attr('id');

          /*--------------------------*\
          Bring in the content
          \*--------------------------*/
          // If the content isn't already there, AJAX it in

          // NOTE: Using $.trim() instead of .is(:empty) incase
          //       there ends up being whitespace for some reason
          if( !$.trim( project.find('.grid-item__expanded-content').html() ).length ) {

          return $.ajax({
              url: 'work/' + projectTitle + '.html',
              success: function(data) {
                project.find('.grid-item__expanded-content').html(data);
              }
            });
          }
          else if (project.find('grid-item__images').length) {
            console.log('initPhotoSwipe with pre-loaded content');
            if (Modernizr.touch && $(window).width() <= 1024) {
              initPhotoSwipe();
            }
          }

        });

        $.when.apply(null, allProjectsShown).done(
          function() {
            if (Modernizr.touch && $(window).width() <= 1024) {
              initPhotoSwipe();
            }
          }
        );

      };

      /*--------------------------*\
        SHOW ALL PROJECTS?
      \*--------------------------*/
      if (window.location.hash === '#all-projects'){
        showAllProjectsView();
      }

      $('a[href="#all-projects"]').on('click', function() {
        showAllProjectsView();
      });

      $('a[href="#collapse-projects"]').on('click', function(e) {
        e.preventDefault();
        WorkModule.collapseAllProjects();
      });

      $(document).keydown(function (e) {
        if (e.keyCode === 27) { //esc key
          e.preventDefault();
          WorkModule.collapseAllProjects();

          //Remove hash completely
          window.history.pushState({state:2}, "work", "?page=work");
          $(this) = !(location.hash || location.href.slice(-1) == "#");

        }
      });

    },

    moveWithScroll: function() {

        function positionInfo() {
          $('.grid-item__expanded-content').each(function() {
            var expandedProj  = $(this),
                info          = expandedProj.find('.grid-item__info'),
                closeProject  = expandedProj.find('.close-project'),
                infoHeight    = info.height(),
                projectHeight = expandedProj.find('.grid-item__images').height(), //TODO: take ternary off of this, won't need it after all content is in

                docViewTop    = $(window).scrollTop(),
                docViewBottom = docViewTop + $(window).height(),
                elemTop       = expandedProj.offset().top - docViewTop,
                elemBottom    = expandedProj.offset().top + projectHeight,

                fromTop       = $(window).scrollTop() - expandedProj.offset().top;

            if ((elemBottom + infoHeight >= docViewBottom) && (elemTop <= docViewTop) && !Modernizr.touch) {

              //fromTop cannot be below the height of the project
              fromTop = fromTop > (projectHeight - infoHeight) ? projectHeight - infoHeight : fromTop;

              //fromTop cannot be a negative value
              fromTop = fromTop <= 0 ? 0 : fromTop;

              info.css('top', fromTop);
              closeProject.css('top', fromTop);
              expandedProj.parent().find('a[href="#show-info"]').css('top', fromTop > 20 ? (fromTop + 80) : 80);
            }
          });
        }

        $('a[href="#show-info"]').one('click', function() {

          $('.grid-item__images').on('transitionEnd transitionend webkitTransitionEnd MSTransitionEnd otransitionend', function(e) {
            var transProp = e.originalEvent.propertyName;
            if (transProp === 'width') {
              positionInfo();
            }
          });

        });

        $(window).scroll( function() {
          positionInfo();
        });

    },

    workNavigation: function() {
      // TODO: Pass in the event parameter dynamically.
      //       Right now I have to type it in...yuck

      var expandedProjIndex = 0;

      function projectNav(project, event) {

        var projectGrid  = project.parent(),
            projectTitle = project.attr('id'),
            projectPreloaded = projectData[projectTitle] !== undefined,
            projectInDom = $.trim( project.find('.grid-item__expanded-content').html() ).length;


          // expand project and update states
          ////////////////////////////////////

          // expand project and update states
          projectGrid.find('.is-expanded')
          .removeClass('is-expanded')
          .addClass('is-thumb');

          //Bring it to the top and blow it up
          console.log(project.attr('id'));

          project.removeClass('is-thumb')
          .addClass('is-expanded');

          projectGrid.find('.is-thumb')
          .insertAfter('.is-expanded');


          // If this was triggered by a click event,
          // make a hash in the URL
          if (event !== "load") {
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
                },
                complete: function() {
                  var collapseAllProjects = function collapseAllProjects() {
                    $('#work').find('.is-expanded').removeClass('is-expanded').addClass('is-thumb');
                    $('body').removeClass('is-expanded-view');
                  };
                  $('a[href="#collapse-projects"]').on('click', function(e) {
                    e.preventDefault();
                    WorkModule.collapseAllProjects();
                  });
                  if (Modernizr.touch && $(window).width() <= 1024) {
                    initPhotoSwipe();
                  }
                }
              });
            } else if (projectPreloaded) {
              project.find('.grid-item__expanded-content').html(projectData[projectTitle].projectHTML);

              var collapseAllProjects = function collapseAllProjects() {
                $('#work').find('.is-expanded').removeClass('is-expanded').addClass('is-thumb');
                $('body').removeClass('is-expanded-view');
              };
              $('a[href="#collapse-projects"]').on('click', function(e) {
                e.preventDefault();
                WorkModule.collapseAllProjects();

                //Remove hash completely
                window.history.pushState({state:2}, "work", "?page=work");
                $(this) = !(location.hash || location.href.slice(-1) == "#");

              });

              if (Modernizr.touch && $(window).width() <= 1024) {
                initPhotoSwipe();
              }
            }
          //////////////////////////////
      }

      //If the URL has a hash with the project in it, navigate to that project
      if (window.location.hash && window.location.hash !== '#all-projects' && Modernizr.history) {
        projectNav($(window.location.hash), "load");
        expandedProjIndex = $.inArray(window.location.hash.replace('#',''), projects);
        console.log(expandedProjIndex);
        $('body').addClass('is-expanded-view-single')
                 .removeClass('is-expanded-view-all');
      }

      $(window).on('hashchange', function() {
        if (window.location.hash !== '#all-projects') {
          projectNav($(window.location.hash), "load");
          expandedProjIndex = $.inArray(window.location.hash.replace('#',''), projects);
        }
      });

      //Expand thumb on click
      $('.grid-item').on('click', function(e) {
        if( !e ) e = window.event;
        var clickedProject = $(this),
            target = $(e.target);

        // Because collapseAllProjects(); removes the class 'is-expanded', we need to skip
        // projectNav(); when clicking '.close-project' because it fires collapseAllProjects();

        if (!clickedProject.hasClass('is-expanded') && !target.is('.close-project')) {
          $('body').addClass('is-expanded-view-single')
                   .removeClass('is-expanded-view-all');
          projectNav(clickedProject, "click");
        }

        //Update expanded project index for prev/next project nav
        var expandedProj = $('.is-expanded').attr('id'),
            expandedProjIndex = $.inArray(expandedProj, projects);

      });

      /*--------------------------*\
        PREV/NEXT PROJECT NAV
        TODO: Clean this up, it's sloppy
      \*--------------------------*/

      //Get the index of the exapnded project
      var expandedProj = $('.is-expanded').attr('id'),
          expandedProjIndex = $.inArray(expandedProj, projects);

      //TODO: see if I can simplify these two 'on' functions
      //TODO: instead of passing in "click" as second parameter, use
      //      something like 'event.target'
      $('.expanded-Proj-Nav[href="#next-proj"]').on('click', function(e) {
        e.preventDefault();
        var nextProjIndex = (expandedProjIndex !== (projects.length - 1)) ? expandedProjIndex + 1 : 0,
            nextProj      = projects[nextProjIndex];

        // Trigger the projectNav function to
        // show the next project
        projectNav($('#'+nextProj), "click");

        // Reset expandedProjIndex to show we've
        // moved on to the next project
        expandedProjIndex = (expandedProjIndex !== (projects.length - 1)) ? nextProjIndex : 0;

      });
      $('.expanded-Proj-Nav[href="#prev-proj"]').on('click', function(e) {
        e.preventDefault();
        var prevProjIndex = (expandedProjIndex !== 0) ? (expandedProjIndex - 1) : (projects.length - 1),
            prevProj      = projects[prevProjIndex];

        // Trigger the projectNav function to
        // show the previous project

        projectNav($('#'+prevProj), "click");

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

              e.stopImmediatePropagation();

            // Only let users use prev/next arrows if they've expanded a project
            // or if they are on the work page
              // TODO: Make this function more robust. Right now this is not at all reusable code
              //       because I'm specificaly targetting '.show-page-work'

            if ($(this).find('.is-expanded-view-single').length && $('.show-page-work').length) {

              if (e.keyCode == 37) {
                projectNav($('#'+prevProj), "keydown");
                expandedProjIndex = (expandedProjIndex !== 0) ? prevProjIndex : (projects.length - 1);
                console.log(expandedProjIndex);
                return false;
              }
              if (e.keyCode == 39) {
                projectNav($('#'+nextProj), "keydown");
                expandedProjIndex = (expandedProjIndex !== (projects.length - 1)) ? nextProjIndex : 0;
                console.log(expandedProjIndex);
                return false;
              }

            }
        });
    }
  };
  //////////////////////////////////////////////////////////////////WORK PORTFOLIO SETUP: VARS AND FUNCTIONS