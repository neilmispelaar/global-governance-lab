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
    var gglabPublications = {

        init : function () {
        
            /* Only run on pages where the list exists */ 
            if ( $('#publicationlist').length) { 
                
                var options = {
                    valueNames: [ 'pubtitle', 'pubtype', 'pubtopic', 'pubsource', 'pubyear' ],
                    page: 20,
                    pagination: true
                };

                        
                this.publicationsList = new List('publicationlist', options);

                $('#filter-topic').on('change', this.updateList.bind(this));
                $('#filter-type').on('change', this.updateList.bind(this));
                
                /* Show All Topics Button Handler 
                $('#filter-topic').change(function() {
                    var selection = this.value;
                    if (selection) {

                        if (selection == "all") { 
                            publicationsList.filter();
                        }

                        if (selection == "nr") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtopic == "Natural resource conflicts and trade-offs") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }

                        if (selection == "mr") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtopic == "Migration and Refugees") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }

                        if (selection == "go") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtopic == "Governance") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }

                        
                    } 

                    return false; 

                });
                */

                /* Show All Topics Button Handler 
                $('#filter-type').change(function() {
                    var selection = this.value;
                    if (selection) {

                        if (selection == "all") { 
                            publicationsList.filter();
                        }

                        if (selection == "ja") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtype == "Journal Article") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }

                        if (selection == "bc") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtype == "Books and Book Chapters") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }

                        if (selection == "mc") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtype == "Media Coverage") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }

                        if (selection == "pb") { 
                            publicationsList.filter(function(item) {
                                if (item.values().pubtype == "Policy Brief") {
                                return true;
                                } else {
                                return false;
                                }
                            });
                        }
                    }
                    return false; 
                });
                */
            }
        },

        updateList : function () {
            
            var values_topic = $('#filter-topic').val();
	        var values_type = $('#filter-type').val();
            
            console.log(values_topic, values_type);

            this.publicationsList.filter(function (item) {
                var typeFilter = false;
                var topicFilter = false;
                
                if(values_type == "all")
                { 
                    typeFilter = true;
                } 
                else 
                {
                    typeFilter = item.values().pubtype == values_type;
                }

                if(values_topic == "all")
                { 
                    topicFilter = true;
                } 
                else 
                {
                    topicFilter = item.values().pubtopic == values_topic;
                }

                return (typeFilter && topicFilter); 
            });

            this.publicationsList.update();
            //console.log('Filtered: ' + values_gender)

        }
    }




    // Menu Navigation Handler 
    var gglabNavigation = {

        init : function (gglabNavigationConfig) {
            this.siteContainerClassName = gglabNavigationConfig.siteContainerClassName; 
            this.navContainerClassName = gglabNavigationConfig.navContainerClassName;
            this.navOpenButtonContainerClassName = gglabNavigationConfig.navOpenButtonContainerClassName;
            this.navCloseButtonContainerClassName = gglabNavigationConfig.navCloseButtonContainerClassName;
            this.brandImageContainerClassName = gglabNavigationConfig.brandImageContainerClassName;
            this.brandImageSrc = gglabNavigationConfig.brandImageSrc;
            
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

            // Add the branding to the menu 
            this.addNavigationBrand(); 

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

        addNavigationBrand : function () {
            // Hard coded the navigationCloseButton classname
            this.navigationContainer.prepend(
                "<div class=\"" + this.brandImageContainerClassName + "\" >" + "<img src=\"" + this.brandImageSrc + "\" alt=\"\" width=\"110\" />" + "</div>")
    
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

     

    // Setup the navigation configuration options
    var gglabNavigationConfig = { 
        "siteContainerClassName" : "gglab-site-container",
        "navContainerClassName" : "gglab-nav-navbar-container",
        "navOpenButtonContainerClassName" : "gglab-nav-navbar-open-button-container",
        "navCloseButtonContainerClassName" :  "gglab-nav-navbar-close-button-container",
        "brandImageSrc" : "/images/brand/gg-lab-white.png",
        "brandImageContainerClassName" : "gglab-nav-navbar-brand-container py-4"
    };

    // Initialise the Navigation Object
    gglabNavigation.init(gglabNavigationConfig);
    
    // Initialise the Publications List Object
    gglabPublications.init();
    

});