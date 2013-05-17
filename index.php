<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900|Karla:700,400' rel='stylesheet' type='text/css'>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Michael Perrotti</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->


        <link rel="stylesheet" href="js/vendor/jquery.mobile/jquery.mobile.custom.structure.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <!--<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>-->
    </head>
    <body class="show-page-none">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
            <a href="#next-proj" class="expanded-Proj-Nav"></a>
            <a href="#prev-proj" class="expanded-Proj-Nav"></a>

            <nav class="info-nav">
                <ul>
                    <li class="info-nav--more-info">
                        <a href="#aboutme" class="toggler" title="About"></a>
                    </li>
                    <li class="info-nav--more-info">
                        <a href="#contactme" class="toggler" title="Contact"></a>
                    </li>
                </ul>
            </nav>

            <nav class="project-view"> 
                <a class="toggle-project-view" href="#all-projects">LIST VIEW</a>
                <a class="toggle-project-view" href="#collapse-projects">THUMB VIEW</a>
            </nav>

            <section class="aboutme">
                <p>I'm Michael Perrotti. This is my about me section.</p>
            </section>
            <section class="contactme">
                <!--     WUFOO CODE     -->
                <div id="wufoo-q7x3s5">
                Fill out my <a href="http://mperrotti.wufoo.com/forms/q7x3s5">online form</a>.
                </div>
                <script type="text/javascript">var q7x3s5;(function(d, t) {
                var s = d.createElement(t), options = {
                'userName':'mperrotti', 
                'formHash':'q7x3s5', 
                'autoResize':true,
                'height':'438',
                'async':true,
                'header':'show'};
                s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
                s.onload = s.onreadystatechange = function() {
                var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
                try { q7x3s5 = new WufooForm();q7x3s5.initialize(options);q7x3s5.display(); } catch (e) {}};
                var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);
                })(document, 'script');</script>
                <!--     END WUFOO CODE     -->
            </section>
            <!-- INTRO -->
            <section id="home" class="page home" data-pulled="no">
                <section class="wide-intro">

                    <div class="logo">
                        <span class="stroke"></span>
                        <span class="stroke stroke-chop"></span>
                        <span class="stroke"></span>
                        <header>
                            <h1>Designer and front-end developer</h1>
                        </header>
                    </div>

                </section>
            </section>
            <section id="work" class="page work"></section>

            <nav class="main-nav show-keyboard-nav">
                <ul>
                    <li class="main-nav--new-page"><a href="#home" title="Home" data-nav-type="page"></a><span>Home</span></li>
                    <li class="main-nav--new-page"><a href="#work" title="Work" data-nav-type="page"></a><span>Work</span></li>
                </ul>
            </nav>

        <script>if ( typeof window.JSON === 'undefined' ) { document.write('<script src="js/vendor/historyAPI/json2.js"><\/script>'); }</script>

        <!-- Vendor JavaScript Plugins -->
        <script type="text/javascript" src="js/vendor/klass.min.js"></script>
        <script src="js/vendor/jquery-1.8.3.min.js"></script>

        <!-- Vendor jQuery Plugins -->
        <script src="js/vendor/jquery.ba-dotimeout.min.js"></script>
        <script src="js/vendor/historyAPI/jquery.history.js"></script>
        <script src="js/vendor/code.photoswipe-3.0.5.min.js"></script>

        <!-- Site JavaScript/jQuery -->
        <script src="js/work.js"></script>
        <script src="js/global.js"></script>
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
