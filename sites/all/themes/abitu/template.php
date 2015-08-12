<?php
/**
 * @file
 * HTML template functions.
 */

/**
 * Implements hook_preprocess_html().
 * Meta tags https://drupal.org/node/1468582#comment-5698732
 */
function abitu_preprocess_html(&$variables) {
  global $base_url;

  $meta_charset = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'charset' => 'utf-8',
    ),
  );
  drupal_add_html_head($meta_charset, 'meta_charset');

  $meta_x_ua_compatible = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'x-ua-compatible',
      'content' => 'ie=edge, chrome=1',
    ),
  );
  drupal_add_html_head($meta_x_ua_compatible, 'meta_x_ua_compatible');

  $meta_mobile_optimized = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'MobileOptimized',
      'content' => 'width',
    ),
  );
  drupal_add_html_head($meta_mobile_optimized, 'meta_mobile_optimized');

  $meta_handheld_friendly = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'HandheldFriendly',
      'content' => 'true',
    ),
  );
  drupal_add_html_head($meta_handheld_friendly, 'meta_handheld_friendly');

  $meta_viewport = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1',
      //'content' => 'width=1024',
    ),
  );
  drupal_add_html_head($meta_viewport, 'meta_viewport');

  $meta_cleartype = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'cleartype',
      'content' => 'on',
    ),
  );
  drupal_add_html_head($meta_cleartype, 'meta_cleartype');

   // Use html5shiv.
  if (theme_get_setting('html5shim')) {
    $element = array(
      'element' => array(
        '#tag' => 'script',
        '#value' => '',
        '#attributes' => array(
          'type' => 'text/javascript',
          'src' => file_create_url(drupal_get_path('theme', 'abitu') . '/js/html5shiv-printshiv.js'),
        ),
      ),
    );
    $html5shim = array(
      '#type' => 'markup',
      '#markup' => "<!--[if lt IE 9]>\n" . theme('html_tag', $element) . "<![endif]-->\n",
    );
    drupal_add_html_head($html5shim, 'abitu_html5shim');
  }

  drupal_add_js($base_url.'/sites/all/themes/abitu/js/jquery.bxslider.min.js', array('group' => JS_LIBRARY, 'weight' => -100)); 
  drupal_add_js($base_url.'/sites/all/themes/abitu/js/global.js', array('group' => JS_LIBRARY, 'weight' => -100));
  
  // Use Respond.js.
  if (theme_get_setting('respond_js')) {
    drupal_add_js(drupal_get_path('theme', 'abitu') . '/js/respond.min.js', array('group' => JS_LIBRARY, 'weight' => -100));
  }

  // Use normalize.css
  if (theme_get_setting('normalize_css')) {
    drupal_add_css(drupal_get_path('theme', 'abitu') . '/css/normalize.css', array('group' => CSS_SYSTEM, 'weight' => -100));
  } 

}

/**
* Implements hook_menu_link()
*/
function abitu_menu_link(array $variables) {
//add class for li
   $variables['element']['#attributes']['class'][] = 'menu-' . $variables['element']['#original_link']['mlid'];
//add class for a
   $variables['element']['#localized_options']['attributes']['class'][] = 'menu-' . $variables['element']['#original_link']['mlid'];
//dvm($variables['element']);
  return theme_menu_link($variables);
}

/**
 * Implements hook_html_head_alter().
 */
function abitu_html_head_alter(&$head_elements) {

  // Remove system content type meta tag.
  unset($head_elements['system_meta_content_type']);
}

/**
 * Implements hook_page_alter().
 * https://gist.github.com/jacine/1378246
 */
function abitu_page_alter(&$page) {
  // Remove all the region wrappers.
  foreach (element_children($page) as $key => $region) {
    if (!empty($page[$region]['#theme_wrappers'])) {
      $page[$region]['#theme_wrappers'] = array_diff($page[$region]['#theme_wrappers'], array('region'));
    }
  }
  // Remove the wrapper from the main content block.
  if (!empty($page['content']['system_main'])) {
    $page['content']['system_main']['#theme_wrappers'] = array_diff($page['content']['system_main']['#theme_wrappers'], array('block'));
  }
}

function abitu_preprocess_node(&$vars) {
  // Add a striping class.
  $vars['classes_array'][] = 'node-' . $vars['zebra'];
}

function abitu_preprocess_block(&$vars, $hook) {
  // Add a striping class.
  $vars['classes_array'][] = 'block-' . $vars['zebra'];
}

function abitu_preprocess_field(&$variables) {
  switch ($variables['element']['#field_name']) {
    case 'field_imagen_comedor':
        $variables ['classes_array'][] = 'content_comedor imagen_punto';
      break;
    case 'field_imagen_cocina':
        $variables ['classes_array'][] = 'content_cocina imagen_punto';
      break;
    case 'field_imagen_sala':
        $variables ['classes_array'][] = 'content_sala imagen_punto';
      break;
    case 'field_imagen_cama':
        $variables ['classes_array'][] = 'content_cama imagen_punto';
      break;
    case 'field_imagen_primer_plano_pequen':
        $variables ['classes_array'][] = 'imagen_segundo_plano disabled';
      break;
    case 'field_imagen_segundo_plano':
        $variables ['classes_array'][] = 'imagen_segundo_plano active';
      break;
    default:
      # code...
      break;
  }
}

function abitu_preprocess_page(&$variables){
  if(isset($_GET['tipo_acceso'])){

    $bandera = $_GET['tipo_acceso'];
  
    if($bandera=='1'){
      //unset($variables['page']['header']);
      $variables['page']['header'] = null;
      $variables['page']['above_content'] = null;
      $variables['page']['footer'] = null;
      $variables['page']['page_bottom'] = null;
      $css = ".main h1.title, header, footer{ display: none; }";
      drupal_add_css($css, 'inline');
    }
  }
  
  
}