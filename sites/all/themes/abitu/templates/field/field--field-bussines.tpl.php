<?php
if ($items){
$slides ="";
?>
<!-- Place somewhere in the <body> of your page -->
<?php for ($i=0; $i < count($items); $i++) {
	
	$url = "";
	$link="";
	$detalle_testimonio="";
	$testimonio_imagen="";
	$cargo="";
	$caption="";
		if (isset($items[$i]['field_image']['#items'][0]['uri'])){
			$url = '/sites/default/files/bussines/'.str_replace("public://bussines/","",$items[$i]['field_image']['#items'][0]['uri']);
		}
		if (isset($items[$i]['field_detalle']['#items'][0]['value'])){
			$detalle_testimonio = $items[$i]['field_detalle']['#items'][0]['value'];
		}
		if (isset($items[$i]['field_cargo']['#items'][0]['value'])){
			$cargo = $items[$i]['field_cargo']['#items'][0]['value'];
		}
		
		if (isset($items[$i]['field_imagen_testimonio']['#items'][0]['uri'])){
			$testimonio_imagen = '/sites/default/files/testimonio/'.str_replace("public://testimonio/","",$items[$i]['field_imagen_testimonio']['#items'][0]['uri']);
		}
		$caption = $detalle_testimonio."<img id='imagen-testimonio' src='".$testimonio_imagen."'/>"."<div id='titulo-cargo'>".$cargo."</div>";
		$slides .= "<li><img src='".$url."' /><div class=''><h3 class='caption-image' title='Condominio a la venta con business center al Este de San José'>BUSINESS CENTER</h3></div><div class='flex-caption'>".$caption."</div></li>";
} ?>
<div class="flexslider flexslider-bussines">
  	<ul class="slides">
		<?php print $slides ?>
	</ul>
</div>
<?php 	flexslider_add(); } ?>
<script type="text/javascript">
(function( $ ){
	$(document).ready(function(){
		$('.flexslider.flexslider-bussines').flexslider({
		    animation: "fade",
		    animationLoop: true,
		    pauseOnHover: false,
		    controlsContainer: ".container-nav",
		    directionNav: false
	  	});
	});
})(jQuery);
</script>