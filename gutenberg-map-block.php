<?php
/**
 * Plugin Name: Map Block
 * Description: Add a map block to Gutenberg
 * Version: 1.0.0
 * Author: Clément Boirie
 * Author URI: https://github.com/petitphp
 */

defined( 'ABSPATH' ) or die();

add_action( 'enqueue_block_assets', function () {
	wp_enqueue_script(
		'leaflet',
		'https://unpkg.com/leaflet@1.2.0/dist/leaflet.js',
		[],
		'1.2.0'
	);

	wp_enqueue_style(
		'leaflet',
		'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css',
		[],
		'1.2.0'
	);

	wp_enqueue_style(
		'gutentest/block/style',
		plugin_dir_url( __FILE__ ) . '/assets/css/style.css',
		[],
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/css/style.css' )
	);

	if ( ! is_admin() ) {
		wp_enqueue_script(
			'gutentest/block/front',
			plugin_dir_url( __FILE__ ) . '/assets/js/front.js',
			[ 'leaflet' ],
			filemtime( plugin_dir_path( __FILE__ ) . '/assets/js/front.js' ),
			true
		);
	}
} );

add_action( 'enqueue_block_editor_assets', function () {
	wp_enqueue_script(
		'gutentest/block',
		plugin_dir_url( __FILE__ ) . '/assets/js/block.build.js',
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'leaflet' ],
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/js/block.build.js' )
	);

	wp_enqueue_style(
		'gutentest/block',
		plugin_dir_url( __FILE__ ) . '/assets/css/editor.css',
		[],
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/css/editor.css' )
	);
} );