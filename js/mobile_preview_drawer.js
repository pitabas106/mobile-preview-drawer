/* *
* Author: NetTantra
* @package         Mobile_preview_drawer
*/

jQuery(function () {
  jQuery('body').on('click', '.mobile-preview-drawer-btn .ab-item', function () {
    var $btn = jQuery(this);
    if(jQuery('#mobile-preview-drawer').length > 0) {
      var $mobile_preview_drawer = jQuery('#mobile-preview-drawer');
    } else {
      var $mobile_preview_drawer = jQuery('<div id="mobile-preview-drawer" style="display: none;"></div>');
      jQuery('body').append($mobile_preview_drawer);
    }
    if($mobile_preview_drawer.is(':visible')) {
      $mobile_preview_drawer.slideUp('fast', function () {
        jQuery(this).remove();
        $btn.parent().removeClass('hover');
        $btn.find('.dashicons').addClass('dashicons-visibility').removeClass('dashicons-hidden');
      });
      return;
    }
    var padding_top = 30;
    $mobile_preview_drawer.html('');
    var viewport_height = jQuery(window).height() - jQuery('#wpadminbar').height() - 15;
    var scale_ratio = 1;
    if(viewport_height < (701 + (padding_top * 2) + 10)) {
      scale_ratio = viewport_height / (701 + (padding_top * 2) + 10);
    }
    var left_offset = jQuery('.mobile-preview-drawer-btn .ab-item').offset().left;
    var right_boundary = left_offset + (scale_ratio * (375+40));
    if(right_boundary > jQuery(window).outerWidth()) {
      left_offset = left_offset - (right_boundary - jQuery(window).outerWidth());
    }
    left_offset = left_offset - (25*scale_ratio);
    var $mobile_preview_drawer_frame = jQuery('<iframe src="'+window.mobile_preview_drawer_config.home_url+'?__show_admin_bar=0&__mobile_preview=1" style="width: 375px; height: 701px; border: 1px solid #000; background: #FFF; border-radius: 10px;" frameborder="0" id="mobile-preview-drawer-frame" frameborder="0"></iframe>');
    $mobile_preview_drawer.append($mobile_preview_drawer_frame);
    $mobile_preview_drawer.css({
      'position': 'fixed',
      'top': '32px',
      'left': left_offset+'px',
      'display': 'none',
      'background': '#FFF',
      'padding': padding_top+'px 5px',
      'border-top': 'none',
      'border-radius': '25px',
      'background': jQuery('.mobile-preview-drawer-btn .ab-item').css('background-color'),
      'box-shadow': 'rgba(0, 0, 0, 0.23) 3px 3px 8px 1px',
      'z-index': '100000',
      '-ms-zoom': scale_ratio,
      '-moz-transform': 'scale('+scale_ratio+')',
      '-moz-transform-origin': 'left top',
      '-o-transform': 'scale('+scale_ratio+')',
      '-o-transform-origin': 'left top',
      '-webkit-transform': 'scale('+scale_ratio+')',
      '-webkit-transform-origin': 'left top'
    });
    $mobile_preview_drawer_frame.on('load', function () {
      jQuery('#wpadminbar', $mobile_preview_drawer_frame[0].contentDocument).remove();
      jQuery('body', $mobile_preview_drawer_frame[0].contentDocument).removeClass('admin-bar');
      jQuery('html', $mobile_preview_drawer_frame[0].contentDocument).attr('style', 'margin-top: 0!important');
      jQuery('* html body', $mobile_preview_drawer_frame[0].contentDocument).attr('style', 'margin-top: 0!important');
    });
    $btn.parent().addClass('hover');
    $btn.find('.dashicons').removeClass('dashicons-visibility').addClass('dashicons-hidden');
    $mobile_preview_drawer.slideDown();
  });

});
