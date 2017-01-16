<?php


if ($items){

	$slides ="";

	for ($i=0; $i < count($items); $i++) {

		$_item = $items[$i]['entity']['field_collection_item'];

		foreach ($_item as $k => $item) {
			
			$url = "";
			$link="";
			$link_title="";
			$titulo_slide="";
			$enlace = "";

			$video  = @$item['field_cargo']['#items'][0]['value'];
			$imagen = @$item['field_image']['#items'][0]['filename'];


			$img = '';
			if(!empty($imagen)){
				$img = '<img src="/sites/default/files/'. $imagen . '" />';
			}

			

			if (isset($item['field_detalle']['#items'][0]['value'])){
				$titulo_slide = $item['field_detalle']['#items'][0]['value'];
			}

			if($element['#object']->type == "slider"){

				if (isset($item['field_enlace']['#items'][0]['url'])){
					$link_title = $item['field_enlace']['#items'][0]['title'];
					$link = $item['field_enlace']['#items'][0]['url'];
				}


				if(!empty($video)){

					$slides .= '<li class="id'.$k.'"><iframe width="100%" height="600" src="https://www.youtube.com/embed/'.$video.'?rel=0&showinfo=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe></li>';	

				}else{

					if ($link == "" && $link_title == ""){

						$slides .= "<li class=\"id".$k."\">".$img."<div class='flex-caption'>".$titulo_slide."</div></li>";

					} else {

						$enlace = "<div class='enlace-wrapper'><div class='enlace'><a href='".$link."' target='_blank'>".$link_title."</a></div></div>";
						$slides .= "<li class=\"id".$k."\">".$img."<div class='flex-caption'>".$titulo_slide.$enlace."</div></li>";

					}

				}

			} else {

				$slides .= "<li class=\"id".$k."\">".$img."<h3 class='caption-image' title='Condominios pet friendly de venta al Este de San José'>Parque para mascotas</h3></li>";

			}
			
		}

	}

?>

<!--<div class="timing"><div id="count-down" data-date="2016-08-01 00:00:00">&nbsp;</div></div>-->

<div class="flexslider flexslider-home">
  	<ul class="slides">
		<?php print $slides ?>
	</ul>
</div>



<?php flexslider_add(); ?>



<script type="text/javascript">

	(function( $ ){ $(document).ready(function(){

		var slider, // Global slider value to force playing and pausing by direct access of the slider control
			canSlide = true; // Global switch to monitor video state
	 
		// Load the YouTube API. For some reason it's required to load it like this
		var tag = document.createElement('script');
	    tag.src = "//www.youtube.com/iframe_api";
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	 
	    // Setup a callback for the YouTube api to attach video event handlers
		window.onYouTubeIframeAPIReady = function(){
			// Iterate through all videos
			$('.flexslider.flexslider-home iframe').each(function(){
				// Create a new player pointer; "this" is a DOMElement of the player's iframe
				var player = new YT.Player(this, {
					playerVars: {
						autoplay: 0
					}
				});
	 
				// Watch for changes on the player
				player.addEventListener("onStateChange", function(state){
					switch(state.data)
					{
						// If the user is playing a video, stop the slider
						case YT.PlayerState.PLAYING:
							slider.flexslider("stop");
							canSlide = false;
							break;
						// The video is no longer player, give the go-ahead to start the slider back up
						case YT.PlayerState.ENDED:
						case YT.PlayerState.PAUSED:
							slider.flexslider("play");
							canSlide = true;
							break;
					}
				});

				$(this).data('player', player);
			});
		}
	 
		// Setup the slider control
		slider = $(".flexslider.flexslider-home").flexslider({
	    animation: "fade",
	    animationLoop: true,
	    slideshow: true,
	    pauseOnHover: false,
	    video: true,
	    /*controlsContainer: ".container-nav",*/
	    directionNav: false,

	    		start: function(){
		    		/*var div = $(".flexslider.flexslider-home .slides li.id5.flex-active-slide");
		    		if(div.length > 0){
		    			$(".timing").animate({opacity: 1});
		    		}else{
		    			$(".timing").animate({opacity: 0});
		    		}	*/
	    		},
		    	// Before you go to change slides, make sure you can!
		    	before: function(){ 
		    		if(!canSlide){
		    			slider.flexslider("stop");
		    		}

		    		/*$(".timing").animate({opacity: 0});*/
		    	},
		    	after: function(){

		    		/*var div = $(".flexslider.flexslider-home .slides li.id5.flex-active-slide");
		    		if(div.length > 0){
		    			$(".timing").animate({opacity: 1});
		    		}else{
		    			$(".timing").animate({opacity: 0});
		    		}	*/	


		    	}
			});

		slider.on("click", ".flex-control-nav a", function(){
			canSlide = true;
			$('.flexslider.flexslider-home iframe').each(function(){
				$(this).data('player').pauseVideo();
			});
		});


	}); })(jQuery);

</script>

<?php 

}

?>