<?php
/*
Plugin Name: Dress Size
Version: 1.0
Description: Dress Size Desc
Author: Alessandro Franceschetti / Giorgio Riccardi
Author URI: https://www.seatoskywebsolutions.ca/
*/

function dress_size_scripts_basic(){
	wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', array(), null, false );
    wp_register_script('dress-size-js', plugins_url( 'dress-size.js', __FILE__ ),array( 'jquery' ), '1', true );
    wp_enqueue_script('dress-size-js');
    wp_register_style( 'dress-size-style', plugins_url( 'dress-size.css', __FILE__ ), array(), '1', 'all' );
    wp_enqueue_style( 'dress-size-style' );
}

add_action( 'wp_enqueue_scripts', 'dress_size_scripts_basic' );

function html_dress_size_code($gen) {
	echo 	'  <div id="sc-panel">
			<div id="sc-image-panel">
			<div id="sc-sketch-image-panel">
				<img id="sc-woman-empty" src="'.plugins_url().'/dress-size/assets/'.$gen.'-empty.jpg" />
				<img id="sc-woman-waist" src="'.plugins_url().'/dress-size/assets/'.$gen.'-waist.jpg" style="display:none"/>
				<img id="sc-woman-bust" src="'.plugins_url().'/dress-size/assets/'.$gen.'-bust.jpg" style="display:none"/>
				<img id="sc-woman-hips" src="'.plugins_url().'/dress-size/assets/'.$gen.'-hips.jpg" style="display:none"/>
			</div>
			</div>
			<div id="sc-size-panel">
			<div class="sc-size-table-caption">
			<h2>Size Table</h2>
			<div class="toggleWrapper">
				<input class="dn" type="checkbox" id="sc-unit-toggle"/>
				<label class="toggle" for="sc-unit-toggle"><span class="toggle__handler"></span></label>
			</div>
			</div>
			<table id="sc-size-table">
			<thead>
				<tr><th>Size</th><th>XS</th><th>S</th><th>M</th><th>L</th></tr>
				<tr><th>US Size</th><th>0-2</th><th>4-6</th><th>8-10</th><th>12-14</th></tr>
			</thead>
			<tbody id="sc-size-table-body"></tbody>
			</table>      

		</div>

	</div>
  </div>';

}


function dress_size_shortcode($atts = [], $content = null, $tag = '') {
		// normalize attribute keys, lowercase
  		$atts = array_change_key_case((array)$atts, CASE_LOWER);
		   // override default attributes with user attributes
		$gen = "woman";
		   if (isset($atts["gen"]))
		   $gen = $atts["gen"];
	   		//wp_localize_script('aquabus-map-js', 'active_buststop', $atts["active_buststop"]);
        ob_start();
        html_dress_size_code($gen);

        return ob_get_clean();
	}

add_shortcode( 'dress_size', 'dress_size_shortcode' );

?>
