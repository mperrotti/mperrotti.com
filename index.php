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

        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body class="show-page-none">
        <!--[if lte IE 8]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

            <a href="#aboutme" class="toggler" title="About">About and Contact</a>

            <a href="#next-proj" class="expanded-Proj-Nav"></a>
            <a href="#prev-proj" class="expanded-Proj-Nav"></a>

            <nav class="project-view"> 
                <a class="toggle-project-view" href="#all-projects">LIST VIEW</a>
                <a class="toggle-project-view" href="#collapse-projects">THUMB VIEW</a>
            </nav>

            <section class="aboutme">
                <p><b>My name is Michael Perrotti</b>, I'm a designer/develolper living in Brooklyn, NY. I've got three lizards and a fire escape garden, and in my free time I like to see shows, make prints, play with PureData, and fiddle with electronics.</p>

                <p><a href="img/Michael-Perrotti-Resume.pdf">View my Resume</a></p>
                
                <ul class="aboutme--social">
                    <li><a href="http://dribbble.com/mperrotti" alt="mperrotti Dribbble">Dribbble</a></li>
                    <li><a href="https://github.com/mperrotti" alt="mperrotti GitHub">Github</a></li>
                    <li><a href="https://twitter.com/mperrotti" alt="mperrotti Twitter">Twitter</a></li>
                    <li><a href="https://last.fm/mperrotti_" alt="mperrotti Last.fm">Last.fm</a></li>
                </ul>
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
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

        <!-- Vendor jQuery Plugins -->
        <script src="js/vendor/jquery.ba-dotimeout.min.js"></script>
        <script src="js/vendor/historyAPI/jquery.history.js"></script>

        <!-- Site JavaScript/jQuery -->
        <script src="js/site.min.js"></script>
       
        <!-- Google Analytics -->
        <script>
            var _gaq=[['_setAccount','UA-41107362-1'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
