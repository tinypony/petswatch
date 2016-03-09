'use strict';
angular.module('vamotors', [
	'ngRoute',
	'ui.router',
	'pascalprecht.translate',
	'vamotors.lang',
	'vamotors.config',
	//'vamotors.landing',
	'vamotors.main',
	'vamotors.signup',
	'vamotors.signin',
	'vamotors.management',
	'vamotors.category.attributes',
	'vamotors.usermanagement',
	'vamotors.shoppingcart',
	'vamotors.cartpage',
	// 'vamotors.services',
    // 'vamotos.filters',
    'vamotors.header',
    'vamotors.sidenav',
    'credit-cards'
]).config(['$translateProvider', 'va.lang.ru', 'va.lang.fi', 'va.lang.en',  function($translateProvider, ru, fi, en) {
	$translateProvider
		.translations('en', en)
		.translations('fi', fi) 
		.translations('ru', ru)
		.registerAvailableLanguageKeys(['en', 'fi', 'ru'], {
		    'en_US': 'en',
		    'en_UK': 'en',
		    'fi_FI': 'fi',
		   	'ru_RU': 'ru'
		}).determinePreferredLanguage();
}]).run(function(AuthService, ShoppingCart) {
	AuthService.fetch();
	ShoppingCart.fetch();
});
