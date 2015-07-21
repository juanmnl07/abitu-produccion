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

		$('.flexslider.flexslider-home').flexslider({
			    animation: "fade",
			    animationLoop: true,
			    pauseOnHover: false,
			    controlsContainer: ".container-nav",
			    directionNav: false
		  	});	
		
		var hasBeenClicked = false;
		var target = window.location.hash;
		$( window ).load(function() {
			if(target!=''){
				$(target+"_").click();	
			}
		});
		$(window).on('hashchange',function(e){
			e.preventDefault();
			if (!hasBeenClicked) {
				target = window.location.hash;
				if(target == ''){
					target = "#plano";
				}
				$(target+"_").click();				
			}
			hasBeenClicked = false;
		});	
			
		//zopim
		/*$zopim(function() {
		    $zopim.livechat.window.toggle();
		 });*/

		$(".tipovistas").on('click', function(){
			
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
			window.location.hash = hsh;

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
				  var e = 'var i = 0; i < data.length; i++';
			  }else if(num_edificio == 2){
				  var e = 'var i = data.length - 1; i >= 0; i--';
			  }
			  
			  //for (var i = data.length - 1; i >= 0; i--) { // E2
			  for (var i = 0; i < data.length; i++) { // E1
			  	var estado = "";
				var solicitar_cita = "";
				  	switch(data[i].estado){
				  		case '3':
				  			estado = "Disponible";
				  			solicitar_cita = "<a href=\"contactenos\" class=\"solicitar-cita\">solicitar <br>cita</a>";
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

			  	apartamentos = apartamentos + "<div class=\"apartamento estado-"+data[i].estado+"\" id=\"apartamento"+(i+1)+"\"><a class=\"openinfo\" href=\"#\">"+num_edificio+"-"+piso+""+0+""+(data[i].numero)+data[i].name+"</a><div class=\"info-piso\"><a class=\"closeinfo\" href=\"javascript:void(0);\">X</a><h4>APARTAMENTO "+piso+""+0+""+(data[i].numero)+data[i].name+"</h4><div class=\"estado\">"+estado+"</div><div class=\"habitaciones\">habitaciones "+data[i].habitaciones+"</div><!--<div class=\"precio\">precio: $"+data[i].precio+"</div>--><div class=\"enlaces\"><a href=\"#\" class=\"detalle\" type-apartment=\""+type_apartment+"\">+ DETALLE</a>"+solicitar_cita+"</div><div class=\"flecha\"></div></div></div>";
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

		$(document).on("click", ".info-piso .enlaces .detalle", function(){
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
			$("#tab-plan-maestro a").trigger("click");
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

		$(window).on('scroll resize', findMiddleElement);

	});
})(jQuery);;/**/
