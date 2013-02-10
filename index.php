<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Michael Perrotti</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1"> 

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->


        <link rel="stylesheet" href="js/vendor/jquery.mobile/jquery.mobile.custom.structure.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <!--<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>-->
    </head>
    <body class="show-page-home">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
            <!-- NAV -->
            <nav data-role="navigation" data-position="fixed">
                <ul>
                    <li class="home-btn"><a href="#home" title="Home" data-nav-type="page">Home</a></li>
                    <li><a href="#work" title="Work" data-nav-type="page">Work</a></li>
                    <li class="divider"></li>
                    <li><a href="#about" title="About" data-nav-type="page">About</a></li>
                </ul>
                <a href="#show-nav" data-role="none" class="toggle toggle-nav">Toggle Nav</a>
            </nav>

            <!-- INTRO -->
            <section id="home" class="is-active" data-pulled="no">
            <section class="wide-intro">
                <div class="wide-intro__video-container">
                    <img src="img/bigimgtest.jpeg" alt="bigimgtest" />
                </div>
                <div class="wide-intro__over">
                    <div class="logo">logo here</div>
                    <hgroup>
                        <h1>Michael Perrotti</h1><br />
                        <h2>Designer and front-end developer</h2>
                    </hgroup>
                </div>
            </section>

            <div class="container">

                <!-- WORK GRID -->
                <section class="work-preview">

                    <div class="grid">
                        <div class="grid-item is-thumb">
                            <a href="" title=""></a>
                            <img src="http://placehold.it/1200x800" alt="">
                            <div class="grid-item__info">
                                <h3>Sample Title</h3>
                                <p>Sample body text</p>
                            </div>
                        </div>
                        <div class="grid-item is-thumb">
                            <a href="" title=""></a>
                            <img src="http://placehold.it/1200x800" alt="">
                            <div class="grid-item__info">
                                <h3>Sample Title</h3>
                                <p>Sample body text</p>
                            </div>
                        </div>
                        <div class="grid-item is-thumb">
                            <a href="" title=""></a>
                            <img src="http://placehold.it/1200x800" alt="">
                            <div class="grid-item__info">
                                <h3>Sample Title</h3>
                                <p>Sample body text</p>
                            </div>
                        </div>
                    </div>
                
                </section>

                <!-- LATEST SOCIAL -->
                <section class="latest-social">
                    <div>
                        <h3>Song listened to</h3>
                        <div class="mask"></div>
                        <img src="" alt="">
                        <p class="latest-social__latest-item-text">Song Artist &em; Song Title</p>
                    </div>
                    <div>
                        <h3>Photo taken</h3>
                        <div class="mask"></div>
                        <img src="" alt="">
                        <p>Post text &em; #omg #hashtags</p>
                    </div>
                </section>

            </div>
            </section>

        <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
        <script src="js/vendor/jquery.mobile/jquery.mobile.custom.js"></script>-->
        <script>if ( typeof window.JSON === 'undefined' ) { document.write('<script src="js/vendor/historyAPI/json2.js"><\/script>'); }</script>
        <!--<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>-->
        <script src="js/vendor/jquery-1.8.3.min.js"></script>
        <script src="js/vendor/jquery.ba-dotimeout.min.js"></script>
        <script src="js/vendor/historyAPI/jquery.history.js"></script>
        <script src="js/vendor/jquery.ba-bbq.min.js"></script>
        <script src="js/vendor/jquery.cycle2.min.js"></script>
        <script src="js/vendor/jquery.cycle2.swipe.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
