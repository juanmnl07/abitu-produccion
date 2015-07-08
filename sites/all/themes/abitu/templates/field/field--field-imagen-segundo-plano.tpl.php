<?php

/**
 * @file field.tpl.php
 * Default template implementation to display the value of a field.
 *
 * This file is not used and is here as a starting point for customization only.
 * @see theme_field()
 *
 * Available variables:
 * - $items: An array of field values. Use render() to output them.
 * - $label: The item label.
 * - $label_hidden: Whether the label display is set to 'hidden'.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - field: The current template type, i.e., "theming hook".
 *   - field-name-[field_name]: The current field name. For example, if the
 *     field name is "field_description" it would result in
 *     "field-name-field-description".
 *   - field-type-[field_type]: The current field type. For example, if the
 *     field type is "text" it would result in "field-type-text".
 *   - field-label-[label_display]: The current label position. For example, if
 *     the label position is "above" it would result in "field-label-above".
 *
 * Other variables:
 * - $element['#object']: The entity to which the field is attached.
 * - $element['#view_mode']: View mode, e.g. 'full', 'teaser'...
 * - $element['#field_name']: The field name.
 * - $element['#field_type']: The field type.
 * - $element['#field_language']: The field language.
 * - $element['#field_translatable']: Whether the field is translatable or not.
 * - $element['#label_display']: Position of label display, inline, above, or
 *   hidden.
 * - $field_name_css: The css-compatible field name.
 * - $field_type_css: The css-compatible field type.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess_field()
 * @see theme_field()
 *
 * @ingroup themeable
 */
?>
<!--
THIS FILE IS NOT USED AND IS HERE AS A STARTING POINT FOR CUSTOMIZATION ONLY.
See http://api.drupal.org/api/function/theme_field/7 for details.
After copying this file to your theme's folder and customizing it, remove this
HTML comment.
-->
<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if (!$label_hidden): ?>
    <div class="field-label"<?php print $title_attributes; ?>><?php print $label ?>:&nbsp;</div>
  <?php endif; ?>
  <div class="field-items"<?php print $content_attributes; ?>>
    <?php foreach ($items as $delta => $item): ?>
    <?php 
    	$apartamento_id = $element['#object']->tid;
    	$fid = "";
    	$query = db_select('field_data_field_imagen_primer_grande', 'fipp')
		    ->fields('fipp',array('field_imagen_primer_grande_fid'))
		    ->condition('entity_id', $apartamento_id,'=');

		    $result = $query->execute();
		        while($record = $result->fetchAssoc()) {
		            $fid = $record['field_imagen_primer_grande_fid'];		        
		    } 

		 $uri = "";

		 $query2 = db_select('file_managed', 'fm')
		    ->fields('fm',array('uri'))
		    ->condition('fid', $fid,'=');

		    $result2 = $query2->execute();
		        while($record2 = $result2->fetchAssoc()) {
		            $uri = str_replace("public://","", $record2['uri']);		        
		    }

    ?>
    <?php $type_content = 0;
    switch ($apartamento_id) {
      case 5:
        $type_content = 3;
        break;
      case 6:
        $type_content = 4;
        break;
      case 7:
        $type_content = 5;
        break;
      default:
        # code...
        break;
    }?>
      <div class="field-item <?php print $delta % 2 ? 'odd' : 'even'; ?>"<?php print $item_attributes[$delta]; ?>>
      	<a href="#" data-href="sites/default/files/<?php print $uri ?>" class="tipovistas"  data-id="<?php echo $type_content ?>">
      		<?php print render($item); ?>
      	</a>
      </div>
    <?php endforeach; ?>
  </div>
</div>
