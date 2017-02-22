window.$ = window.jQuery = require('jquery')
require('bootstrap');
require('./jquery.galereya');
require('./jquery.prettyPhoto');

$(document).ready(function() {

	/* MAIN MENU */
	$('#main-menu_grace > li:has(ul.sub-menu_grace)').addClass('parent');
	$('ul.sub-menu_grace > li:has(ul.sub-menu_grace) > a').addClass('parent');
	$('#main-menu_grace > li:has(ul.sub-menu_grace_small)').addClass('parent');
	$('ul.sub-menu_grace_small > li:has(ul.sub-menu_grace_small) > a').addClass('parent');

	$('#menu-toggle_grace').click(function() {
		$('#main-menu_grace_small').slideToggle(300);
		return false;
	});

	$(window).resize(function() {
		if ($(window).width() > 700) {
			$('#main-menu_grace').removeAttr('style');
		}
	});

});
