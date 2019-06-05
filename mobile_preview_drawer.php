<?php
/**
 * Plugin Name:     Mobile Preview Drawer
 * Plugin URI:      https://www.nettantra.com/wordpress/?utm_src=mobile-preview-drawer
 * Description:     Mobile Preview Drawer Plugin eases the pain of previewing page and theme changes made from the WordPress Admin on a Mobile Phone/Responsive viewer. It provides a simple one-click preview button within the WordPress Admin to show up a frame containing the WebSite Front-end on a mobile responsive resolution.
 * Author:          NetTantra
 * Author URI:      https://www.nettantra.com/wordpress/?utm_src=mobile-preview-drawer
 * Text Domain:     mobile_preview_drawer
 * Version:         0.1.4
 * License:         GPLv2 or later
 *
 * @package         Mobile_preview_drawer
 */

function mpd_load_wp_admin_scripts() {
  wp_enqueue_script( 'mobile_preview_drawer', plugins_url( 'js/mobile_preview_drawer.js', __FILE__ ), ['jquery'] );
  wp_localize_script( 'mobile_preview_drawer', 'mobile_preview_drawer_config', [
    'home_url' => home_url()
  ]);
}
add_action( 'admin_enqueue_scripts', 'mpd_load_wp_admin_scripts' );

function mpd_load_wp_scripts() {
  if(is_admin_bar_showing()) {
    wp_enqueue_script( 'mobile_preview_drawer', plugins_url( 'js/mobile_preview_drawer.js', __FILE__ ), ['jquery'] );
    wp_localize_script( 'mobile_preview_drawer', 'mobile_preview_drawer_config', [
      'home_url' => home_url()
    ]);
  }
  if(isset($_GET['__mobile_preview']) && $_GET['__mobile_preview']) {
    wp_enqueue_script( 'mobile_preview_frame', plugins_url( 'js/mobile_preview_frame.js', __FILE__ ), ['jquery'] );
  }
}
add_action( 'wp_enqueue_scripts', 'mpd_load_wp_scripts' );

function mpd_toolbar_link_to_mobile_preview_drawer( $wp_admin_bar ) {
  $args = array(
    'id'      => 'mobile-preview-drawer',
    'title'   => '<span class="ab-icon dashicons dashicons-visibility"></span>'.__('Mobile Preview', 'mobile_preview_drawer'),
    'href'    => '#',
    'parent' => 'top-secondary',
    'meta'    => array( 'class' => 'mobile-preview-drawer-btn' )
  );
  $wp_admin_bar->add_node( $args );
}
add_action( 'admin_bar_menu', 'mpd_toolbar_link_to_mobile_preview_drawer', 999 );

function mpd_show_admin_bar() {
  if(isset($_GET['__show_admin_bar']) && !$_GET['__show_admin_bar']) {
    return false;
  }
  return true;
}
add_filter('show_admin_bar', 'mpd_show_admin_bar');
