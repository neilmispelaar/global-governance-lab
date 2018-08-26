// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.
jQuery(document).ready(function ($) {


    // Menu Navigation Handler 
    var gglabNavigation = {

        init : function (siteContainerClassName, navContainerClassName, navOpenButtonContainerClassName, navCloseButtonContainerClassName) {
            this.siteContainerClassName = siteContainerClassName; 
            this.navContainerClassName = navContainerClassName;
            this.navOpenButtonContainerClassName = navOpenButtonContainerClassName;
            this.navCloseButtonContainerClassName = navCloseButtonContainerClassName;

            this.cacheDom();
            this.bindEvents();
        },
        
        cacheDom : function () {
            this.document = $(document);
            this.page = this.document.find('.' + this.siteContainerClassName);
            
            this.navigationContainer = this.document.find('.' + this.navContainerClassName);
            this.navigationOpenButtonContainer = this.document.find('.' + this.navOpenButtonContainerClassName);

            // Add the menu button 
            this.addNavigationOpenMenuButton(); 
            this.navigationOpenButton = this.document.find('.navigationOpenButton'); 

            // Add the close menu button (both the button and container)
            this.addNavigationCloseMenuButton(); 
            this.navigationCloseButtonContainer = this.document.find('.' + this.navCloseButtonContainerClassName);
            this.navigationCloseButton = this.document.find('.navigationCloseButton'); 

            this.navigationContainerFirstFocusable = this.navigationContainer.find( 'select, input, textarea, button, a' ).filter( ':visible' ).first();
            this.navigationContainerLastFocusable = this.navigationContainer.find( 'select, input, textarea, button, a' ).filter( ':visible' ).last();
                        
        },
        
        addNavigationOpenMenuButton : function () {
            // Hard coded the navigationOpenButton classname
            this.navigationOpenButtonContainer.append(
                "<button class=\"btn navigationOpenButton\" type=\"button\">Menu " + 
                "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-icon\" viewBox=\"0 0 20 20\"><path d=\"M 3.314 4.8 h 13.372 c 0.41 0 0.743 -0.333 0.743 -0.743 c 0 -0.41 -0.333 -0.743 -0.743 -0.743 H 3.314 c -0.41 0 -0.743 0.333 -0.743 0.743 C 2.571 4.467 2.904 4.8 3.314 4.8 Z M 16.686 15.2 H 3.314 c -0.41 0 -0.743 0.333 -0.743 0.743 s 0.333 0.743 0.743 0.743 h 13.372 c 0.41 0 0.743 -0.333 0.743 -0.743 S 17.096 15.2 16.686 15.2 Z M 16.686 9.257 H 3.314 c -0.41 0 -0.743 0.333 -0.743 0.743 s 0.333 0.743 0.743 0.743 h 13.372 c 0.41 0 0.743 -0.333 0.743 -0.743 S 17.096 9.257 16.686 9.257 Z\"></path></svg>" +
                "</button>");
            
        },

        addNavigationCloseMenuButton : function () {
            // Hard coded the navigationCloseButton classname
            this.navigationContainer.append(
                "<div class=\"" + this.navCloseButtonContainerClassName + "\" >" + "<button class=\"btn  navigationCloseButton\" type=\"button\">Close</button>" + "</div>")
            
        },
        
        
        bindEvents : function () {
            this.navigationOpenButton.on('click', this.show.bind(this));
            this.navigationCloseButton.on('click', this.hide.bind(this));
            this.document.keyup(this.keyUpHandler.bind(this));
            
            this.navigationContainerFirstFocusable.on('keydown', this.tabKeyMenuFirstChildHandler.bind(this));
            this.navigationContainerLastFocusable.on('keydown', this.tabKeyMenuLastChildHandler.bind(this));
        },
        
        
        
        tabKeyMenuFirstChildHandler : function (e) { 
            if ( ( e.keyCode === 9 && e.shiftKey ) && (this.navigationContainer.hasClass('open') === true) ) {

                e.preventDefault();

                this.navigationContainerLastFocusable.focus();
            }
        
        }, 
        
        tabKeyMenuLastChildHandler : function (e) { 
            if ( ( e.keyCode === 9 && !e.shiftKey ) && (this.navigationContainer.hasClass('open') === true) ) {

                e.preventDefault();

                this.navigationContainerFirstFocusable.focus(); 

            }
        }, 
        
        show : function () {
            this.navigationContainer.addClass('open');
            this.page.addClass('noScroll');

            // Set focus after a delay to allow for the annimation
            window.setTimeout(this.setFocusAfterOpen.bind(this), 300);
            
            console.log("Open Menu");
            
        },
        
        setFocusAfterOpen : function () { 
            this.navigationCloseButton.focus();
        },
        
        hide : function () {
            this.navigationContainer.removeClass('open');
            this.page.removeClass('noScroll');
            this.navigationOpenButton.focus();
            
            console.log("Close Menu");
        
        },
        
        keyUpHandler : function (e) {
            // If escape is pressed and the menu is open then close it
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                if (this.navigationContainer.hasClass('open') === true) {
                    this.hide();
                }
            }
                
        }
        
    };
    
    // Initialise the Navigation Object
    var siteContainerClassName = "gglab-site-container";
    var navContainerClassName = "gglab-nav-navbar-container";
    var navOpenButtonContainerClassName = "gglab-nav-navbar-open-button-container";
    var navCloseButtonContainerClassName = "gglab-nav-navbar-close-button-container";
    
    gglabNavigation.init(
        siteContainerClassName, 
        navContainerClassName, 
        navOpenButtonContainerClassName,
        navCloseButtonContainerClassName);
    
});