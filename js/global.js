/*--------------------------------------------------------------*\
  GLOBAL

  Navigation, lazy-loading work page, basic page setup
\*--------------------------------------------------------------*/

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
// var OBC = (function (OBC, $) {

//   'use strict';

//   OBC.susyOffCanvasToggle = {
//     init: function (triggers) {
//       $(triggers).on('click', function (e) {
//         e.preventDefault();
//         OBC.susyOffCanvasToggle.toggleClasses(this);
//         OBC.susyOffCanvasToggle.toggleText(triggers);
//       });
//       return triggers;
//     },
//     toggleClasses: function (el) {
//       var body = $('body');
//       var show = $(el).attr('href');

//       if (show === '#show-info'){
//         body.toggleClass('show-grid-item__info');
//       }
//       if (show === '#aboutme'){
//           var buttonText = $('a[href="' + show + '"]').text() === 'close' ? 'About and Contact' : 'close';
//           body.toggleClass('show-about').removeClass('show-contact');
//           $('a[href="' + show + '"]').text(buttonText);
//       }
//       if (show === '#contactme'){
//           body.toggleClass('show-contact').removeClass('show-about');
//       }

//       return body.attr('class');
//     },
//     toggleText: function (triggers) {
//       var right = $(triggers).filter('[href="#show-info"]');
//       var body = $('body');
//     }
//   };

//   return OBC;

// }(OBC || {}, jQuery));
//////////////////////////////////////////////END OFF-CANVAS STATE TOGGLING

var GlobalModule = {
  init: function() {
    //need these done first
    this.preloadWorkPage(1);
    // this.getUrlVars();

    //ok, now do other stuff
    // OBC.susyOffCanvasToggle.init($('.toggler'));
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
  },

  // getUrlVars: function() {
  //   var vars = [], hash;
  //   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  //   for(var i = 0; i < hashes.length; i++)
  //   {
  //       hash = hashes[i].split('=');
  //       vars.push(hash[0]);
  //       vars[hash[0]] = hash[1];
  //   }
  //   return vars; //change to 'hash[1]' to return project ID
  // },

  /*------------------------------------------*\
    FUNCTION: pageChange

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!THIS ONE IS A BIG FUCKING DEAL!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    Controls overall site navigation

    Called when:
      -Document first loads
      -User clicks or keyboard navs to new page
  \*------------------------------------------*/
  pageChange: function(page) {

  /*----------------------------------------------*\
    MAKE SURE PAGE VAR ISN'T USING URL HASHES

    If the URL has a hash, make an array like this:

      http://mperrotti.com/?page=pageName#hashName
      ----BECOMES----
      hashData[pageName, hashName]

    Then just set 'var page  = hashData[0]'
  \*----------------------------------------------*/
  // if (window.location.hash) {
  //   var hashData = page.split('#'); //Make an array of the URL data

  //   page = hashData[0]; //Set page to be the page name without the hash
  //   projectID = hashData[1]; //Grab the project ID
  // }

  // var State = History.getState();
  }
};