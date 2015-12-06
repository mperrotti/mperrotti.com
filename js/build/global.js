/*--------------------------------------------------------------*\
  GLOBAL

  Navigation, lazy-loading work, basic page setup

  TODO: Do a no-js implementation, you lazy fuck

\*--------------------------------------------------------------*/

//global vars
var projects = [],
    projectData = {};

var GlobalModule = {
  init: function() {
    this.preloadWorkPage(1);
  },

  /*------------------------------------------*\
    FUNCTION: preloadWorkPage

    Preload the work page

  \*------------------------------------------*/
  preloadWorkPage: function(step) {
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