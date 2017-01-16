<?php
if ($items){

$slides ="";
?>
<!-- Place somewhere in the <body> of your page -->
<?php for ($i=0; $i < count($items); $i++) {
	
	$url = "";
	$link="";
	$titulo_slide="";

		if (isset($items[$i]['field_image']['#items'][0]['uri'])){
			$url = '/sites/default/files/asoleo/'.str_replace("public://asoleo/","",$items[$i]['field_image']['#items'][0]['uri']);
		}

		if (isset($items[$i]['field_detalle']['#items'][0]['value'])){
			$titulo_slide = $items[$i]['field_detalle']['#items'][0]['value'];
		}
		$slides .= "<li><img src='".$url."' /><h3 title='Condominio a la venta piscina y área de asolearse al Este de San José' class='caption-image'>Área para asoleo</h3></li>";
		//$slides .= "<li><img src='".$url."' /><div class='flex-caption'>".$titulo_slide."</div></li>";

} ?>
<div class="flexslider flexslider-asoleo">
  	<ul class="slides">
		<?php print $slides ?>
	</ul>
</div>
<?php 	flexslider_add(); } ?>
<script type="text/javascript">
(function( $ ){
	$(document).ready(function(){
		$('.flexslider.flexslider-asoleo').flexslider({
		    animation: "fade",
		    animationLoop: true,
		    pauseOnHover: false,
		    controlsContainer: ".container-nav",
		    directionNav: false
	  	});
	});

})(jQuery);
</script>