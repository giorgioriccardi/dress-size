<?php
/*
Plugin Name: Dress Size
Version: 1.7.0
Description: Dress Size custom size chart table for Palu & AM Cashmere
Author: Alessandro Franceschetti / Giorgio Riccardi
Author URI: https://www.seatoskywebsolutions.ca/
*/

function dress_size_scripts_basic(){
	// wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', array(), null, false );
	wp_register_script( 'jquery1.7.1', 'https://code.jquery.com/jquery-1.7.1.min.js' );
	wp_add_inline_script( 'jquery1.7.1', 'var jQuery1_7_1 = $.noConflict(true);' );

    wp_register_script('dress-size-js', plugins_url( 'dress-size.js', __FILE__ ),array( 'jquery' ), '1', true );
	// wp_enqueue_script('dress-size-js');
	wp_enqueue_script( 'dress-size-js', plugins_url( 'dress-size.js', __FILE__ ), array( 'jquery1.7.1' ) );
    wp_register_style( 'dress-size-style', plugins_url( 'dress-size.css', __FILE__ ), array(), '1', 'all' );
    wp_enqueue_style( 'dress-size-style' );
}
add_action( 'wp_enqueue_scripts', 'dress_size_scripts_basic' );
// https://wpengine.com/support/including-a-different-jquery-version-in-wordpress/

function html_dress_size_code($gen) {
	echo '
		<div class="woocommerce-dress-size">
			<a class="woocommerce-dress-size-info" href="" id="sc-open-modal" title="Size Chart">SIZE CHART</a>
		</div>
		<div class="sc-modal" id="sc-modal">
			<div class="sc-modal-content">
				<div id="sc-panel-mobile"></div>
				<div id="sc-panel">
					<a class="close" href="" id="sc-close-modal">&times;</a>
					<div id="sc-image-panel">
						<div id="sc-sketch-image-panel">
							<div id="sc-woman-empty" style="display:none"><img src="'.plugins_url().'/dress-size/assets/'.$gen.'-empty.jpg"></div>
							<div id="sc-woman-waist" style="display:none"><img src="'.plugins_url().'/dress-size/assets/'.$gen.'-waist.jpg"></div>
							<div id="sc-woman-bust" style="display:none"><img src="'.plugins_url().'/dress-size/assets/'.$gen.'-bust.jpg"></div>
							<div id="sc-woman-hips" style="display:none"><img src="'.plugins_url().'/dress-size/assets/'.$gen.'-hips.jpg"></div>
						</div>
					</div>
					<div id="sc-size-panel">
						<div id="sc-image-panel-content">
							<div class="sc-size-table-caption">
								<h2>Size Table</h2>
								<div class="toggleWrapper">
									<input class="dn" id="sc-unit-toggle" type="checkbox"> <label class="toggle" for="sc-unit-toggle"><span class="toggle__handler"></span></label>
								</div>
							</div>
							<table class="sc-table-responsive wp-block-table" id="sc-size-table">
								<thead>
									<tr>
										<th>Size</th>
										<th>XS</th>
										<th>S</th>
										<th>M</th>
										<th>L</th>
									</tr>
								</thead>
								<tbody id="sc-size-table-body"></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		';

}

$gen = "woman";

function dress_size_shortcode($atts = [], $content = null, $tag = '') {
		// normalize attribute keys, lowercase
  		$atts = array_change_key_case((array)$atts, CASE_LOWER);
		   // override default attributes with user attributes
		
		   if (isset($atts["gen"]))
		   $gen = $atts["gen"];
			   
		   wp_localize_script('dress-size-js', 'gen', $gen);
        ob_start();
        html_dress_size_code($gen);

        return ob_get_clean();
	}

add_shortcode( 'dress_size', 'dress_size_shortcode' );

?>
