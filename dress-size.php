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
		<h2>Size Table</h2>
		<table id="sc-size-table">
		  <thead>
			<tr><th>Size</th><th>XS</th><th>S</th><th>M</th><th>L</th></tr>
			<tr><th>US Size</th><th>0-2</th><th>4-6</th><th>8-10</th><th>12-14</th></tr>
		  </thead>
		  <tbody>
			<tr id="sc-row-bust"><td>Bust</td><td>34 <small>in</small></td><td>36 <small>in</small></td><td>38 <small>in</small></td><td>40 <small>in</small></td></tr>
			<tr id="sc-row-waist"><td>Waist </td><td>26 <small>in</small></td><td>28 <small>in</small></td><td>30 <small>in</small></td><td>32 <small>in</small></td></tr>
			<tr id="sc-row-hips"><td>Hips</td><td>36 1/2 <small>in</small></td><td>38 1/2 <small>in</small></td><td>40 1/2 <small>in</small></td><td>42 1/2 <small>in</small></td></tr>
		  </tbody>
		</table>       
	  <h2>Find your size</h2>
	  <div id="sc-size-calc-panel">
		<div id="sc-size-calc-panel-inputs">
		   <div class="sc-size-calc-panel-inputs-item">My</div>
		   <div id="sc-size-calc-content-1" class="sc-size-calc-panel-inputs-item">
			  <div class="select-content ">
				<div id="sc-size-calc-bodypart-bust" class="select">Bust</div>
				<div class="select-separator">/</div>
				<div id="sc-size-calc-bodypart-waist" class="select">Waist</div>
				<div class="select-separator">/</div>
				<div id="sc-size-calc-bodypart-hips" class="select">Hips</div>
			  </div>
			</div>
			<div id="sc-size-calc-content-2" class="sc-size-calc-panel-inputs-item">
				measure 
				<input type="number" id="sc-size-calc-measure-input"/>
			</div>
			<div id="sc-size-calc-content-3" class="select-content sc-size-calc-panel-inputs-item">
				<div id="sc-size-calc-unit-in" class="select">Inches</div>
				<div class="select-separator">/</div>
				<div id="sc-size-calc-unit-cm" class="select" >Cm</div>
			</div>
			<div>&nbsp;</div>
			<div class="sc-size-calc-hint"><span id="sc-size-calc-hint-1" >Choose one</span></div>
			<div class="sc-size-calc-hint"><span id="sc-size-calc-hint-2" style="display: none">Insert value</span></div>
			<div class="sc-size-calc-hint"><span id="sc-size-calc-hint-3" style="display: none">Unit</span></div>
		</div>
		<div id="sc-size-calc-result-column">
			<div id="sc-size-calc-result"></div>  
			<div id="sc-size-calc-result-hint" class="sc-size-calc-hint"  style="display: none">Your size</div>
		</div>
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
