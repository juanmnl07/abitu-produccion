var urlactual = document.URL.replace( /#.*/, "");
urlactual = urlactual.replace( /\?.*/, "");

jQuery( document ).ajaxStart(function() {
	jQuery('.ajaxloader').css({display: 'block'});
});
jQuery( document ).ajaxStop(function() {
	jQuery('.ajaxloader').css({display: 'none'});
	jQuery('#block-hogar-a-su-medida-plano-maestro a[href^="#"]').on('click', function (e) {
		e.preventDefault();
	});		
});
/*jQuery( document ).ajaxComplete(function() {  
});*/

(function( $ ){
	
	$(document).ready(function(){

var times = 0;
$(window).scroll(function(){
    var bottom = $(window).height() + $(window).scrollTop();
    var height = $(document).height();
    var percentage = Math.round(100*bottom/height);
    if(percentage > 50 && times==0){
        times=times + 1;
        ga('send', 'event', 'Scroll', '50%', urlactual);
    }
});

<!--Google Analytics Evento Segundos-->
setTimeout(function(){ga('send', 'event', 'T>30s', 'Tiempo mayor a 30 segundos', urlactual);},30000);

<!--Google Analytics Evento Clic-->
$(".menu-487, .reservar").on('click',function(){
	ga('send', 'event', 'Click', 'Reserve una cita',urlactual);
});
$(".financiamiento-disponible a").on('click',function(){
	ga('send', 'event', 'Click', 'Financiamiento disponible',urlactual);
});
$("#btncita").on('click',function(){
	ga('send', 'event', 'Click', 'Haga su cita hoy',urlactual);
});	
						
		/*$('.flexslider.flexslider-home').flexslider({
			    animation: "fade",
			    animationLoop: true,
			    pauseOnHover: false,
			    controlsContainer: ".container-nav",
			    directionNav: false
		  	});	*/
		
		var hasBeenClicked = false; var tipovista = false;
		var target = window.location.hash;
		$( window ).load(function() {
			if(target!=''){
				$(target+"_").click();	
			}
		});
		$(window).on('hashchange',function(e){
			e.preventDefault();
			
			if (!hasBeenClicked && !tipovista) {
				target = window.location.hash;
				if(target == ''){
					target = "#plano";
				}
				$(target+"_").click();				
			}
			
			hasBeenClicked = false; tipovista = false;
			
		});	
			
		//zopim
		/*$zopim(function() {
		    $zopim.livechat.window.toggle();
		 });*/

		$(".tipovistas").on('click', function(e){
			e.preventDefault();
			tipovista = true;
			$('.imagen_punto').css({display: 'none'});
			$('#puntos li a').removeClass('active');
			
			var id = $(this).data('id'); var url = $(this).data('href');
			
			var vistagrande = $('#tab-content'+id+' .field-name-field-imagen-primer-plano img');
			$('#tab-content'+id+' .field-name-field-imagen-primer-plano').addClass('animated fadeIn');
			$(vistagrande).attr('src', url);
			
			$('#tab-content'+id+' .imagen_segundo_plano').removeClass('active');
			$('#tab-content'+id+' .imagen_segundo_plano.disabled').addClass('active').removeClass('disabled').addClass('animated fadeIn');
			$(this).parents('.imagen_segundo_plano').addClass('disabled');
		
		});	


		
		$('#block-hogar-a-su-medida-plano-maestro a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			var hsh = this.hash;
			if(hsh != ''){
				window.location.hash = hsh;
			}
		});	

		$(document).mouseup(function (e)
		{
			var container = $(".imagen_punto");
		
			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				container.hide();
				$('#puntos li a').removeClass('active');
			}
		});
		
		$('.apunto').on('click', function (e) {
			e.preventDefault();
			$('.apunto').removeClass('active');
			$(this).addClass('active');
			var id = $(this).attr('id');
			$(".content_"+id).addClass("animated fadeIn");
			$('.imagen_punto').css({display: 'none'});
			$('.content_'+id).css({display: 'block'});
		});
					 
	  	/* calculate the height of the screen*/
		var height_screen = screen.height;
		var height_screen_mid = (height_screen * 0.38);
		$("#chat").css("top",height_screen_mid);

		//clic en el edificio
		var clic_e = false;
		$(".edificio a").on("click", function(e){
			e.preventDefault();
			clic_e = true;
			var url = $(this).attr("build-edit-path");
			var num_edificio = $(this).attr("num_dificio");

			//if (num_edificio == 1){
				$.ajax({
				  url: url,
				}).done(function(data) {
				  var pisos ="";
				  for (var i = data.length - 1; i >= 0; i--) {
				  	pisos = pisos + "<div class=\"piso\" id=\"piso"+(i+1)+"\"><a num_dificio=\""+num_edificio+"\" href=\"#\" numb-floor=\""+data[i].nid+"\" floor=\""+(i+1)+"\" >"+data[i].nombre+"</a></div>";
				  };
				  $("#lista_pisos").addClass("edificio-"+num_edificio);
				  $("#lista_pisos").html(pisos);
				  //call the click function
				  $("#tab-pisos a").trigger("click");

				});		
			//}


			
		});

		//clic en el piso del edificio
		$(document).on("click", "#lista_pisos .piso a",function(){
			var nid_piso = $(this).attr("numb-floor");
			var piso = $(this).attr("floor");
			var num_edificio = $(this).attr("num_dificio");
			$.ajax({
			  url: 'piso/'+nid_piso,
			}).done(function(data) {
			  var apartamentos ="";

			  if(num_edificio == 1){
				 // var e = 'var i = 0; i < data.length; i++';
			  }else if(num_edificio == 2){
				  $(".fondo-piso").addClass("edif2");
				 // var e = 'var i = data.length - 1; i >= 0; i--';
			  }
			  
			  //for (var i = data.length - 1; i >= 0; i--) { // E2
			  for (var i = 0; i < data.length; i++) { // E1
			  	var estado = "";
				var solicitar_cita = "";
				  	switch(data[i].estado){
				  		case '3':
				  			estado = "Disponible";
				  			solicitar_cita = "<a href=\"contactenos\" onclick=\"javascript:ga('send', 'event', 'Click', 'Solicitar cita ("+num_edificio+"-"+piso+""+0+""+(data[i].numero)+data[i].name+")',urlactual);\" class=\"solicitar-cita\">solicitar <br>cita</a>";
				  		break;
				  		case '2':
				  			estado = "Ocupado";
				  		break;
				  		case '1':
				  			estado = "Vendido";
				  		break;
				  	}

				  	var type_apartment;
				  	if (data[i].name == "A"){
				  		type_apartment = "type-a";
				  	}else if (data[i].name == "B"){
				  		type_apartment = "type-b";
				  	}else if (data[i].name == "C"){
				  		type_apartment = "type-c";
				  	}
					var infop = "<div class=\"info-piso\"><a class=\"closeinfo\" href=\"javascript:void(0);\">X</a><h4>APARTAMENTO "+piso+""+0+""+(data[i].numero)+data[i].name+"</h4><div class=\"estado\">"+estado+"</div><div class=\"habitaciones\">habitaciones "+data[i].habitaciones+"</div><!--<div class=\"precio\">precio: $"+data[i].precio+"</div>--><div class=\"enlaces\"><a href=\"#\" class=\"detalle\" type-apartment=\""+type_apartment+"\">+ DETALLE</a>"+solicitar_cita+"</div><div class=\"flecha\"></div></div>";
					var adetalle = "class=\"openinfo\"";	
					if($(window).width() < 991){
						infop = '';
						adetalle = "class=\"detalle\" type-apartment=\""+type_apartment+"\"";
					}	
	
					apartamentos = apartamentos + "<div class=\"apartamento estado-"+data[i].estado+"\" id=\"apartamento"+(i+1)+"\"><a "+adetalle+" href=\"#\">"+num_edificio+"-"+piso+""+0+""+(data[i].numero)+data[i].name+"</a>  "+infop+"  </div>";
				
			  };
			  $("#apartamentos").attr("class","");
			  $("#apartamentos").addClass("edificio-"+num_edificio);
			  $("#apartamentos").html(apartamentos);

			  //hide the actual content 2-1
			  $("#tab-content2-1").removeClass("active");
			  $("#tab-content2-2").addClass("active");

			});




		});

		//catch the click on the tab link
		$(document).on("click",".tabs-list .tab a", function(){
			var content_target = $(this).attr("content-target");
			if(clic_e == false && content_target == 2){
				$("#plano_").trigger("click");
				alert('Seleccione primero un edificio');
				return false;
			}
			hasBeenClicked = true;
			
			$('.imagen_punto').css({display: 'none'});
			$('#puntos li a').removeClass('active');

			//set the default building floors
			/*var path_building = $(this).attr("build-edit-path");
			if((path_building != "") && ($("#pisos .piso").length == 0)){
				$.ajax({
				  url: path_building,
				}).done(function(data) {
				  var pisos ="";
				  for (var i = data.length - 1; i >= 0; i--) {
				  	pisos = pisos + "<div class=\"piso\" id=\"piso"+(i+1)+"\"><a href=\"#\" numb-floor=\""+data[i].nid+"\" >"+data[i].nombre+"</a></div>";
				  };
				  $("#pisos").html(pisos);
				});
			}*/

			
			//remove the class active to the previous tab
			$(".tabs-list .tab a").removeClass("active");
			//assign to the tab selected the class active
			$(this).addClass("active");

			$("#tab-content2-2").removeClass("active");
			$("#tab-content2-1").addClass("active");

			//get the actual active content
			var actived_content = $(".tab-content.active").attr("id");

			if(actived_content != "tab-content"+content_target){
				//disable the actual content enabled
				$(".tab-content.active").removeClass("active");
				//enable the content associated to the tab
				$("#tab-content"+content_target).addClass("active");
			}
		});

		//handles the click on the apartment
		$(document).on("click", "#apartamentos .apartamento a.openinfo",function(){
			$('#apartamentos .apartamento a').removeClass('active');
			$(".info-piso").css("display","none");
			var divpopup = $(this).parent().find(".info-piso");
			if(divpopup.css("display")=="none"){
				divpopup.addClass("animated fadeIn");
				divpopup.css("display","block");
				$(this).addClass('active');
			}
		});

		$(document).on("click", "#apartamentos .apartamento a.closeinfo",function(){
			$('#apartamentos .apartamento a.openinfo').removeClass('active');
			$(".info-piso").css("display","none");
		});		

		$(document).on("click", ".info-piso .enlaces .detalle, .detalle", function(){
			var type_apartment = $(this).attr("type-apartment");

			switch(type_apartment){
				case "type-a":
					$("#tab-modelo1 a").trigger("click");
				break;
				case "type-b":
					$("#tab-modelo2 a").trigger("click");
				break;
				case "type-c":
					$("#tab-modelo3 a").trigger("click");
				break;
			}

		})

		$(document).on("click", ".volver-edificios a", function(){
			$("#tab-plano-maestro a").trigger("click");
		});
		
		/* detect position of elements to animate */
		var findMiddleElement = (function(docElm){
			var viewportHeight = docElm.clientHeight,
				elements = $('.field');

			return function(e){
				var middleElement;
				if( e && e.type == 'resize' )
					viewportHeight = docElm.clientHeight;

				elements.each(function(){
					var pos = this.getBoundingClientRect().top;
					// if an element is more or less in the middle of the viewport
					if( pos > viewportHeight/2.5 && pos < viewportHeight/1.5 ){
						middleElement = this;
						return false; // stop iteration 
					}
				});
				
				if(middleElement != 'undefined'){
					if ($(middleElement).hasClass("field-name-field-detalle-senderos") || $(middleElement).hasClass("field-name-field-detalle") || $(middleElement).hasClass("field-name-field-detalle-piscina")){
						$(middleElement).css("visibility","visible");
						$(middleElement).addClass("animated fadeInUp");
					} else if ($(middleElement).hasClass("field-name-field-detalle-yoga")){
						$(middleElement).css("visibility","visible");
						$(middleElement).addClass("animated fadeInDown");
					} else if ($(middleElement).hasClass("field-name-field-detalle-parque-mascotas")) {
						$(middleElement).css("visibility","visible");
						$(middleElement).addClass("animated fadeInLeft");
					} else if ($(middleElement).hasClass("field-name-field-imagen-lobby")){
						$(".field-name-field-detalle-lobby").css("visibility","visible");
						$(".field-name-field-detalle-lobby").addClass("animated fadeInLeft");
					}
				}
			}

		})(document.documentElement);

		if($(window).width() > 991){
			$(window).on('scroll resize', findMiddleElement);
		}

		$(".above-content").css("top", $(".header").css("height"));

      /*$('.carouselhabitaciones').bxSlider({
      	preloadImages: 'all',
      	adaptiveHeight: true,
      	infiniteLoop: false,
      	controls: false,
      	minSlides: 1,
      	maxSlides: 1,
      	moveSlides: 1,
      	slideWidth: 310
      });*/
      $('.carouselhabitaciones').bxSlider({
		preloadImages: 'all',
		adaptiveHeight: true,
		infiniteLoop: false,
		controls: false,
		minSlides: 1,
      });    
		 

	});
})(jQuery);


/**
* Basic structure: TC_Class is the public class that is returned upon being called
* 
 * So, if you do
*      var tc = $(".timer").TimeCircles();
*      
 * tc will contain an instance of the public TimeCircles class. It is important to
* note that TimeCircles is not chained in the conventional way, check the
* documentation for more info on how TimeCircles can be chained.
* 
 * After being called/created, the public TimerCircles class will then- for each element
* within it's collection, either fetch or create an instance of the private class.
* Each function called upon the public class will be forwarded to each instance
* of the private classes within the relevant element collection
**/
(function($) {

    var useWindow = window;
    
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function() {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                    dontEnums = [
                        'toString',
                        'toLocaleString',
                        'valueOf',
                        'hasOwnProperty',
                        'isPrototypeOf',
                        'propertyIsEnumerable',
                        'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;

            return function(obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }
    
    // Used to disable some features on IE8
    var limited_mode = false;
    var tick_duration = 200; // in ms
    
    var debug = (location.hash === "#debug");
    function debug_log(msg) {
        if (debug) {
            console.log(msg);
        }
    }

    var allUnits = ["Days", "Hours", "Minutes", "Seconds"];
    var nextUnits = {
        Seconds: "Minutes",
        Minutes: "Hours",
        Hours: "Days",
        Days: "Years"
    };
    var secondsIn = {
        Seconds: 1,
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
        Months: 2678400,
        Years: 31536000
    };

    /**
     * Converts hex color code into object containing integer values for the r,g,b use
     * This function (hexToRgb) originates from:
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {string} hex color code
     */
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    /**
     * Function s4() and guid() originate from:
     * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }

    /**
     * Creates a unique id
     * @returns {String}
     */
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }

    /**
     * Array.prototype.indexOf fallback for IE8
     * @param {Mixed} mixed
     * @returns {Number}
     */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++)
            {
                if (from in this &&
                        this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    function parse_date(str) {
        var match = str.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);
        if (match !== null && match.length > 0) {
            var parts = str.split(" ");
            var date = parts[0].split("-");
            var time = parts[1].split(":");
            return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        }
        // Fallback for different date formats
        var d = Date.parse(str);
        if (!isNaN(d))
            return d;
        d = Date.parse(str.replace(/-/g, '/').replace('T', ' '));
        if (!isNaN(d))
            return d;
        // Cant find anything
        return new Date();
    }

    function parse_times(diff, old_diff, total_duration, units, floor) {
        var raw_time = {};
        var raw_old_time = {};
        var time = {};
        var pct = {};
        var old_pct = {};
        var old_time = {};

        var greater_unit = null;
        for(var i = 0; i < units.length; i++) {
            var unit = units[i];
            var maxUnits;

            if (greater_unit === null) {
                maxUnits = total_duration / secondsIn[unit];
            }
            else {
                maxUnits = secondsIn[greater_unit] / secondsIn[unit];
            }

            var curUnits = (diff / secondsIn[unit]);
            var oldUnits = (old_diff / secondsIn[unit]);
            
            if(floor) {
                if(curUnits > 0) curUnits = Math.floor(curUnits);
                else curUnits = Math.ceil(curUnits);
                if(oldUnits > 0) oldUnits = Math.floor(oldUnits);
                else oldUnits = Math.ceil(oldUnits);
            }
            
            if (unit !== "Days") {
                curUnits = curUnits % maxUnits;
                oldUnits = oldUnits % maxUnits;
            }

            raw_time[unit] = curUnits;
            time[unit] = Math.abs(curUnits);
            raw_old_time[unit] = oldUnits;
            old_time[unit] = Math.abs(oldUnits);
            pct[unit] = Math.abs(curUnits) / maxUnits;
            old_pct[unit] = Math.abs(oldUnits) / maxUnits;

            greater_unit = unit;
        }

        return {
            raw_time: raw_time,
            raw_old_time: raw_old_time,
            time: time,
            old_time: old_time,
            pct: pct,
            old_pct: old_pct
        };
    }

    var TC_Instance_List = {};
    function updateUsedWindow() {
        if(typeof useWindow.TC_Instance_List !== "undefined") {
            TC_Instance_List = useWindow.TC_Instance_List;
        }
        else {
            useWindow.TC_Instance_List = TC_Instance_List;
        }
        initializeAnimationFrameHandler(useWindow);
    };
    
    function initializeAnimationFrameHandler(w) {
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !w.requestAnimationFrame; ++x) {
            w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame'];
            w.cancelAnimationFrame = w[vendors[x] + 'CancelAnimationFrame'];
        }

        if (!w.requestAnimationFrame || !w.cancelAnimationFrame) {
            w.requestAnimationFrame = function(callback, element, instance) {
                if (typeof instance === "undefined")
                    instance = {data: {last_frame: 0}};
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - instance.data.last_frame));
                var id = w.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                instance.data.last_frame = currTime + timeToCall;
                return id;
            };
            w.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    };
    

    var TC_Instance = function(element, options) {
        this.element = element;
        this.container;
        this.listeners = null;
        this.data = {
            paused: false,
            last_frame: 0,
            animation_frame: null,
            interval_fallback: null,
            timer: false,
            total_duration: null,
            prev_time: null,
            drawn_units: [],
            text_elements: {
                Days: null,
                Hours: null,
                Minutes: null,
                Seconds: null
            },
            attributes: {
                canvas: null,
                context: null,
                item_size: null,
                line_width: null,
                radius: null,
                outer_radius: null
            },
            state: {
                fading: {
                    Days: false,
                    Hours: false,
                    Minutes: false,
                    Seconds: false
                }
            }
        };

        this.config = null;
        this.setOptions(options);
        this.initialize();
    };

    TC_Instance.prototype.clearListeners = function() {
        this.listeners = { all: [], visible: [] };
    };
    
    TC_Instance.prototype.addTime = function(seconds_to_add) {
        if(this.data.attributes.ref_date instanceof Date) {
            var d = this.data.attributes.ref_date;
            d.setSeconds(d.getSeconds() + seconds_to_add);
        }
        else if(!isNaN(this.data.attributes.ref_date)) {
            this.data.attributes.ref_date += (seconds_to_add * 1000);
        }
    };
    
    TC_Instance.prototype.initialize = function(clear_listeners) {
        // Initialize drawn units
        this.data.drawn_units = [];
        for(var i = 0; i < Object.keys(this.config.time).length; i++) {
            var unit = Object.keys(this.config.time)[i];
            if (this.config.time[unit].show) {
                this.data.drawn_units.push(unit);
            }
        }

        // Avoid stacking
        $(this.element).children('div.time_circles').remove();

        if (typeof clear_listeners === "undefined")
            clear_listeners = true;
        if (clear_listeners || this.listeners === null) {
            this.clearListeners();
        }
        this.container = $("<div>");
        this.container.addClass('time_circles');
        this.container.appendTo(this.element);
        
        // Determine the needed width and height of TimeCircles
        var height = this.element.offsetHeight;
        var width = this.element.offsetWidth;
        if (height === 0)
            height = $(this.element).height();
        if (width === 0)
            width = $(this.element).width();

        if (height === 0 && width > 0)
            height = width / this.data.drawn_units.length;
        else if (width === 0 && height > 0)
            width = height * this.data.drawn_units.length;
        
        // Create our canvas and set it to the appropriate size
        var canvasElement = document.createElement('canvas');
        canvasElement.width = width;
        canvasElement.height = height;
        
        // Add canvas elements
        this.data.attributes.canvas = $(canvasElement);
        this.data.attributes.canvas.appendTo(this.container);
        
        // Check if the browser has browser support
        var canvasSupported = isCanvasSupported();
        // If the browser doesn't have browser support, check if explorer canvas is loaded
        // (A javascript library that adds canvas support to browsers that don't have it)
        if(!canvasSupported && typeof G_vmlCanvasManager !== "undefined") {
            G_vmlCanvasManager.initElement(canvasElement);
            limited_mode = true;
            canvasSupported = true;
        }
        if(canvasSupported) {
            this.data.attributes.context = canvasElement.getContext('2d');
        }

        this.data.attributes.item_size = Math.min(width / this.data.drawn_units.length, height);
        this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width;
        this.data.attributes.radius = ((this.data.attributes.item_size * 0.8) - this.data.attributes.line_width) / 2;
        this.data.attributes.outer_radius = this.data.attributes.radius + 0.5 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);

        // Prepare Time Elements
        var i = 0;
        for (var key in this.data.text_elements) {
            if (!this.config.time[key].show)
                continue;

            var textElement = $("<div>");
            textElement.addClass('textDiv_' + key);
            textElement.css("top", Math.round(0.35 * this.data.attributes.item_size));
            textElement.css("left", Math.round(i++ * this.data.attributes.item_size));
            textElement.css("width", this.data.attributes.item_size);
            textElement.appendTo(this.container);

            var headerElement = $("<h4>");
            headerElement.text(this.config.time[key].text); // Options
            headerElement.css("font-size", Math.round(this.config.text_size * this.data.attributes.item_size));
            headerElement.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px");
            headerElement.appendTo(textElement);

            var numberElement = $("<span>");
            numberElement.css("font-size", Math.round(3 * this.config.text_size * this.data.attributes.item_size));
            numberElement.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px");
            numberElement.appendTo(textElement);

            this.data.text_elements[key] = numberElement;
        }

        this.start();
        if (!this.config.start) {
            this.data.paused = true;
        }
        
        // Set up interval fallback
        var _this = this;
        this.data.interval_fallback = useWindow.setInterval(function(){
            _this.update.call(_this, true);
        }, 100);
    };

    TC_Instance.prototype.update = function(nodraw) {
        if(typeof nodraw === "undefined") {
            nodraw = false;
        }
        else if(nodraw && this.data.paused) {
            return;
        }
       
        if(limited_mode) {
            //Per unit clearing doesn't work in IE8 using explorer canvas, so do it in one time. The downside is that radial fade cant be used
            this.data.attributes.context.clearRect(0, 0, this.data.attributes.canvas[0].width, this.data.attributes.canvas[0].hright);
        }
        var diff, old_diff;

        var prevDate = this.data.prev_time;
        var curDate = new Date();
        this.data.prev_time = curDate;

        if (prevDate === null)
            prevDate = curDate;

        // If not counting past zero, and time < 0, then simply draw the zero point once, and call stop
        if (!this.config.count_past_zero) {
            if (curDate > this.data.attributes.ref_date) {
                for(var i = 0; i < this.data.drawn_units.length; i++) {
                    var key = this.data.drawn_units[i];

                    // Set the text value
                    this.data.text_elements[key].text("0");
                    var x = (i * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
                    var y = this.data.attributes.item_size / 2;
                    var color = this.config.time[key].color;
                    this.drawArc(x, y, color, 0);
                }
                this.stop();
                return;
            }
        }

        // Compare current time with reference
        diff = (this.data.attributes.ref_date - curDate) / 1000;
        old_diff = (this.data.attributes.ref_date - prevDate) / 1000;

        var floor = this.config.animation !== "smooth";

        var visible_times = parse_times(diff, old_diff, this.data.total_duration, this.data.drawn_units, floor);
        var all_times = parse_times(diff, old_diff, secondsIn["Years"], allUnits, floor);

        var i = 0;
        var j = 0;
        var lastKey = null;

        var cur_shown = this.data.drawn_units.slice();
        for (var i in allUnits) {
            var key = allUnits[i];

            // Notify (all) listeners
            if (Math.floor(all_times.raw_time[key]) !== Math.floor(all_times.raw_old_time[key])) {
                this.notifyListeners(key, Math.floor(all_times.time[key]), Math.floor(diff), "all");
            }

            if (cur_shown.indexOf(key) < 0)
                continue;

            // Notify (visible) listeners
            if (Math.floor(visible_times.raw_time[key]) !== Math.floor(visible_times.raw_old_time[key])) {
                this.notifyListeners(key, Math.floor(visible_times.time[key]), Math.floor(diff), "visible");
            }
            
            if(!nodraw) {
                // Set the text value
                this.data.text_elements[key].text(Math.floor(Math.abs(visible_times.time[key])));

                var x = (j * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
                var y = this.data.attributes.item_size / 2;
                var color = this.config.time[key].color;

                if (this.config.animation === "smooth") {
                    if (lastKey !== null && !limited_mode) {
                        if (Math.floor(visible_times.time[lastKey]) > Math.floor(visible_times.old_time[lastKey])) {
                            this.radialFade(x, y, color, 1, key);
                            this.data.state.fading[key] = true;
                        }
                        else if (Math.floor(visible_times.time[lastKey]) < Math.floor(visible_times.old_time[lastKey])) {
                            this.radialFade(x, y, color, 0, key);
                            this.data.state.fading[key] = true;
                        }
                    }
                    if (!this.data.state.fading[key]) {
                        this.drawArc(x, y, color, visible_times.pct[key]);
                    }
                }
                else {
                    this.animateArc(x, y, color, visible_times.pct[key], visible_times.old_pct[key], (new Date()).getTime() + tick_duration);
                }
            }
            lastKey = key;
            j++;
        }

        // Dont request another update if we should be paused
        if(this.data.paused || nodraw) {
            return;
        }
        
        // We need this for our next frame either way
        var _this = this;
        var update = function() {
            _this.update.call(_this);
        };

        // Either call next update immediately, or in a second
        if (this.config.animation === "smooth") {
            // Smooth animation, Queue up the next frame
            this.data.animation_frame = useWindow.requestAnimationFrame(update, _this.element, _this);
        }
        else {
            // Tick animation, Don't queue until very slightly after the next second happens
            var delay = (diff % 1) * 1000;
            if (delay < 0)
                delay = 1000 + delay;
            delay += 50;

            _this.data.animation_frame = useWindow.setTimeout(function() {
                _this.data.animation_frame = useWindow.requestAnimationFrame(update, _this.element, _this);
            }, delay);
        }
    };

    TC_Instance.prototype.animateArc = function(x, y, color, target_pct, cur_pct, animation_end) {
        if (this.data.attributes.context === null)
            return;

        var diff = cur_pct - target_pct;
        if (Math.abs(diff) > 0.5) {
            if (target_pct === 0) {
                this.radialFade(x, y, color, 1);
            }
            else {
                this.radialFade(x, y, color, 0);
            }
        }
        else {
            var progress = (tick_duration - (animation_end - (new Date()).getTime())) / tick_duration;
            if (progress > 1)
                progress = 1;

            var pct = (cur_pct * (1 - progress)) + (target_pct * progress);
            this.drawArc(x, y, color, pct);

            //var show_pct =
            if (progress >= 1)
                return;
            var _this = this;
            useWindow.requestAnimationFrame(function() {
                _this.animateArc(x, y, color, target_pct, cur_pct, animation_end);
            }, this.element);
        }
    };

    TC_Instance.prototype.drawArc = function(x, y, color, pct) {
        if (this.data.attributes.context === null)
            return;

        var clear_radius = Math.max(this.data.attributes.outer_radius, this.data.attributes.item_size / 2);
        if(!limited_mode) {
            this.data.attributes.context.clearRect(
                    x - clear_radius,
                    y - clear_radius,
                    clear_radius * 2,
                    clear_radius * 2
                    );
        }
        
        if (this.config.use_background) {
            this.data.attributes.context.beginPath();
            this.data.attributes.context.arc(x, y, this.data.attributes.radius, 0, 2 * Math.PI, false);
            this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width;

            // line color
            this.data.attributes.context.strokeStyle = this.config.circle_bg_color;
            this.data.attributes.context.stroke();
        }

        // Direction
        var startAngle, endAngle, counterClockwise;
        var defaultOffset = (-0.5 * Math.PI);
        var fullCircle = 2 * Math.PI;
        startAngle = defaultOffset + (this.config.start_angle / 360 * fullCircle);
        var offset = (2 * pct * Math.PI);

        if (this.config.direction === "Both") {
            counterClockwise = false;
            startAngle -= (offset / 2);
            endAngle = startAngle + offset;
        }
        else {
            if (this.config.direction === "Clockwise") {
                counterClockwise = false;
                endAngle = startAngle + offset;
            }
            else {
                counterClockwise = true;
                endAngle = startAngle - offset;
            }
        }

        this.data.attributes.context.beginPath();
        this.data.attributes.context.arc(x, y, this.data.attributes.radius, startAngle, endAngle, counterClockwise);
        this.data.attributes.context.lineWidth = this.data.attributes.line_width;

        // line color
        this.data.attributes.context.strokeStyle = color;
        this.data.attributes.context.stroke();
    };

    TC_Instance.prototype.radialFade = function(x, y, color, from, key) {
        // TODO: Make fade_time option
        var rgb = hexToRgb(color);
        var _this = this; // We have a few inner scopes here that will need access to our instance

        var step = 0.2 * ((from === 1) ? -1 : 1);
        var i;
        for (i = 0; from <= 1 && from >= 0; i++) {
            // Create inner scope so our variables are not changed by the time the Timeout triggers
            (function() {
                var delay = 50 * i;
                var rgba = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + (Math.round(from * 10) / 10) + ")";
                useWindow.setTimeout(function() {
                    _this.drawArc(x, y, rgba, 1);
                }, delay);
            }());
            from += step;
        }
        if (typeof key !== undefined) {
            useWindow.setTimeout(function() {
                _this.data.state.fading[key] = false;
            }, 50 * i);
        }
    };

    TC_Instance.prototype.timeLeft = function() {
        if (this.data.paused && typeof this.data.timer === "number") {
            return this.data.timer;
        }
        var now = new Date();
        return ((this.data.attributes.ref_date - now) / 1000);
    };

    TC_Instance.prototype.start = function() {
        useWindow.cancelAnimationFrame(this.data.animation_frame);
        useWindow.clearTimeout(this.data.animation_frame)

        // Check if a date was passed in html attribute or jquery data
        var attr_data_date = $(this.element).data('date');
        if (typeof attr_data_date === "undefined") {
            attr_data_date = $(this.element).attr('data-date');
        }
        if (typeof attr_data_date === "string") {
            this.data.attributes.ref_date = parse_date(attr_data_date);
        }
        // Check if this is an unpause of a timer
        else if (typeof this.data.timer === "number") {
            if (this.data.paused) {
                this.data.attributes.ref_date = (new Date()).getTime() + (this.data.timer * 1000);
            }
        }
        else {
            // Try to get data-timer
            var attr_data_timer = $(this.element).data('timer');
            if (typeof attr_data_timer === "undefined") {
                attr_data_timer = $(this.element).attr('data-timer');
            }
            if (typeof attr_data_timer === "string") {
                attr_data_timer = parseFloat(attr_data_timer);
            }
            if (typeof attr_data_timer === "number") {
                this.data.timer = attr_data_timer;
                this.data.attributes.ref_date = (new Date()).getTime() + (attr_data_timer * 1000);
            }
            else {
                // data-timer and data-date were both not set
                // use config date
                this.data.attributes.ref_date = this.config.ref_date;
            }
        }

        // Start running
        this.data.paused = false;
        this.update.call(this);
    };

    TC_Instance.prototype.restart = function() {
        this.data.timer = false;
        this.start();
    };

    TC_Instance.prototype.stop = function() {
        if (typeof this.data.timer === "number") {
            this.data.timer = this.timeLeft(this);
        }
        // Stop running
        this.data.paused = true;
        useWindow.cancelAnimationFrame(this.data.animation_frame);
    };

    TC_Instance.prototype.destroy = function() {
        this.clearListeners();
        this.stop();
        useWindow.clearInterval(this.data.interval_fallback);
        this.data.interval_fallback = null;
        
        this.container.remove();
        $(this.element).removeAttr('data-tc-id');
        $(this.element).removeData('tc-id');
    };

    TC_Instance.prototype.setOptions = function(options) {
        if (this.config === null) {
            this.default_options.ref_date = new Date();
            this.config = $.extend(true, {}, this.default_options);
        }
        $.extend(true, this.config, options);

        // Use window.top if use_top_frame is true
        if(this.config.use_top_frame) {
            useWindow = window.top;
        }
        else {
            useWindow = window;
        }
        updateUsedWindow();
        
        this.data.total_duration = this.config.total_duration;
        if (typeof this.data.total_duration === "string") {
            if (typeof secondsIn[this.data.total_duration] !== "undefined") {
                // If set to Years, Months, Days, Hours or Minutes, fetch the secondsIn value for that
                this.data.total_duration = secondsIn[this.data.total_duration];
            }
            else if (this.data.total_duration === "Auto") {
                // If set to auto, total_duration is the size of 1 unit, of the unit type bigger than the largest shown
                for(var i = 0; i < Object.keys(this.config.time).length; i++) {
                    var unit = Object.keys(this.config.time)[i];
                    if (this.config.time[unit].show) {
                        this.data.total_duration = secondsIn[nextUnits[unit]];
                        break;
                    }
                }
            }
            else {
                // If it's a string, but neither of the above, user screwed up.
                this.data.total_duration = secondsIn["Years"];
                console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto");
            }
        }
    };

    TC_Instance.prototype.addListener = function(f, context, type) {
        if (typeof f !== "function")
            return;
        if (typeof type === "undefined")
            type = "visible";
        this.listeners[type].push({func: f, scope: context});
    };

    TC_Instance.prototype.notifyListeners = function(unit, value, total, type) {
        for (var i = 0; i < this.listeners[type].length; i++) {
            var listener = this.listeners[type][i];
            listener.func.apply(listener.scope, [unit, value, total]);
        }
    };

    TC_Instance.prototype.default_options = {
        ref_date: new Date(),
        start: true,
        animation: "smooth",
        count_past_zero: true,
        circle_bg_color: "#60686F",
        use_background: true,
        fg_width: 0.1,
        bg_width: 1.2,
        text_size: 0.07,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: false,
        start_angle: 0,
        time: {
            Days: {
                show: true,
                text: "Días",
                color: "#FFFFFF"
            },
            Hours: {
                show: true,
                text: "Horas",
                color: "#FFFFFF"
            },
            Minutes: {
                show: true,
                text: "Minutos",
                color: "#FFFFFF"
            },
            Seconds: {
                show: true,
                text: "Segundos",
                color: "#FFFFFF"
            }
        }
    };

    // Time circle class
    var TC_Class = function(elements, options) {
        this.elements = elements;
        this.options = options;
        this.foreach();
    };

    TC_Class.prototype.getInstance = function(element) {
        var instance;

        var cur_id = $(element).data("tc-id");
        if (typeof cur_id === "undefined") {
            cur_id = guid();
            $(element).attr("data-tc-id", cur_id);
        }
        if (typeof TC_Instance_List[cur_id] === "undefined") {
            var options = this.options;
            var element_options = $(element).data('options');
            if (typeof element_options === "string") {
                element_options = JSON.parse(element_options);
            }
            if (typeof element_options === "object") {
                options = $.extend(true, {}, this.options, element_options);
            }
            instance = new TC_Instance(element, options);
            TC_Instance_List[cur_id] = instance;
        }
        else {
            instance = TC_Instance_List[cur_id];
            if (typeof this.options !== "undefined") {
                instance.setOptions(this.options);
            }
        }
        return instance;
    };

    TC_Class.prototype.addTime = function(seconds_to_add) {
        this.foreach(function(instance) {
            instance.addTime(seconds_to_add);
        });
    };
    
    TC_Class.prototype.foreach = function(callback) {
        var _this = this;
        this.elements.each(function() {
            var instance = _this.getInstance(this);
            if (typeof callback === "function") {
                callback(instance);
            }
        });
        return this;
    };

    TC_Class.prototype.start = function() {
        this.foreach(function(instance) {
            instance.start();
        });
        return this;
    };

    TC_Class.prototype.stop = function() {
        this.foreach(function(instance) {
            instance.stop();
        });
        return this;
    };

    TC_Class.prototype.restart = function() {
        this.foreach(function(instance) {
            instance.restart();
        });
        return this;
    };

    TC_Class.prototype.rebuild = function() {
        this.foreach(function(instance) {
            instance.initialize(false);
        });
        return this;
    };

    TC_Class.prototype.getTime = function() {
        return this.getInstance(this.elements[0]).timeLeft();
    };

    TC_Class.prototype.addListener = function(f, type) {
        if (typeof type === "undefined")
            type = "visible";
        var _this = this;
        this.foreach(function(instance) {
            instance.addListener(f, _this.elements, type);
        });
        return this;
    };

    TC_Class.prototype.destroy = function() {
        this.foreach(function(instance) {
            instance.destroy();
        });
        return this;
    };

    TC_Class.prototype.end = function() {
        return this.elements;
    };

    $.fn.TimeCircles = function(options) {
        return new TC_Class(this, options);
    };




                               $("#count-down").TimeCircles(
       {   
           circle_bg_color: "#FFFFFF",
           use_background: true,
           bg_width: 1.0,
           fg_width: 0.02,
           time: {
                Days: { color: "#0A5C42" },
                Hours: { color: "#0A5C42" },
                Minutes: { color: "#0A5C42" },
                Seconds: { color: "#0A5C42" }
            }
       }
    );

}(jQuery));
