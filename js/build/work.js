/*--------------------------------------------------------------*\
  PORTFOLIO

  Anything to do with opening or viewing a project goes here.
\*--------------------------------------------------------------*/

//global vars
var projects = [],
    projectData = {};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var WorkModule = {
  init: function() {
    this.collapseAllProjects();
    this.createProjArray();
    this.workNavigation();
  },

  collapseAllProjects: function() {
    $('body').removeClass('is-expanded-view');
    $('#work').find('.is-expanded').removeClass('is-expanded').addClass('is-thumb');
    $('#project-detail-container').html('');
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

  workNavigation: function() {
    var expandedProjIndex;

    // expand project and update states
    ////////////////////////////////////

    function projectNav(project) {

      var projectGrid  = project.parent(),
          projectTitle = project.attr('id'),
          projectPreloaded = projectData[projectTitle] !== undefined;

      WorkModule.collapseAllProjects();

      // TODO: Make this scroll to the correct position
      // collapse bio if it's not collapsed
      // $('#show-more-bio').removeClass('more-bio--bio-hidden');
      // $('.bio').addClass('bio-hidden');


      expandedProjIndex = $.inArray(window.location.hash.replace('#',''), projects);

      if (expandedProjIndex !== undefined && expandedProjIndex !== -1) {

        // fade page content
        // scroll to top
        $('html,body').animate({
          scrollTop: $('#project-detail-container').offset().top
        }, 250);

        $('body').addClass('is-expanded-view');

        $('#' + projectTitle)
        .removeClass('is-thumb')
        .addClass('is-expanded');

        if(projectPreloaded) {
          $('#project-detail-container')
          .html(projectData[projectTitle].projectHTML)
          .addClass('fadeIn');
        } else {
          $.ajax({
            url: 'work/' + projectTitle + '.html',
            success: function(data) {
              projectData[projectTitle] = {
                projectHTML: data
              };
              $('#project-detail-container')
              .html(projectData[projectTitle].projectHTML)
              .addClass('fadeIn');
            }
          });
        }

      } else {
        WorkModule.collapseAllProjects();
      }

    }

    $(window).on('hashchange load', function() {
        projectNav($(window.location.hash));
    });

  }

};

//
// Event to run after project detail fades in
//
var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) type = type.toLowerCase();
    element.addEventListener(pfx[p]+type, callback, false);
  }
}

PrefixedEvent(document.getElementById('project-detail-container'), "AnimationEnd", function(){
  $('#project-detail-container').removeClass('fadeIn');
});

$('#show-more-bio').on('click', function(e){
  e.preventDefault();
  $(this).toggleClass('more-bio--bio-hidden');
  $('.bio').toggleClass('bio-hidden');
});

$('.js-triggerModalClose').on('click', function(e){
  e.preventDefault();
  $('.js-closeOnTrigger').addClass('display--none');
});

if (getParameterByName('suppressModal')) {
  $('.js-closeOnTrigger').addClass('display--none');
}

WorkModule.init();

/*--------------------------------------------------------------*\
  GLOBAL

  Navigation, lazy-loading work page, basic page setup
\*--------------------------------------------------------------*/

var GlobalModule = {
  init: function() {
    this.preloadWorkPage();
  },

  /*------------------------------------------*\
    FUNCTION: preloadWorkPage

    Preload the work page

  \*------------------------------------------*/
  preloadWorkPage: function() {
    $.each(projects, function (index, value) {
      $.ajax({
        url: 'work/' + value + '.html',
        success: function(data) {
          projectData[value] = {
            projectHTML: data
          };
        }
      });
    });
  }

};

GlobalModule.init();