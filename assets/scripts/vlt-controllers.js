/***********************************************
 * SITE: ANIMATED BLOCK
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.animatedBlock = {
		init: function () {

			var animatedBlock = $('.vlt-animated-block'),
				prefix = 'animate__';

			if (VLTJS.html.hasClass('vlt-is--homepage')) {

				VLTJS.window.on('vlt.change-slide', function () {
					animatedBlock.each(function () {
						var $this = $(this);
						var animationName = $this.data('animation-name');
						$this.removeClass(prefix + 'animated').removeClass(prefix + animationName);
						if ($this.parents('.vlt-section').hasClass('active')) {
							$this.addClass(prefix + 'animated').addClass(prefix + animationName);
						}
					});
				});

			} else {
				animatedBlock.each(function () {
					var $this = $(this);
					$this.css('opacity', 0);
					$this.one('inview', function () {
						var animationName = $this.data('animation-name');
						$this.addClass(prefix + 'animated').addClass(prefix + animationName);
					});
				});
			}
		}
	};
	VLTJS.animatedBlock.init();
})(jQuery);
/***********************************************
 * SITE: CONTACT FORM
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.validate == 'undefined') {
		return;
	}

	VLTJS.contactForm = {
		init: function () {

			var contactForm = $('.vlt-contact-form');

			contactForm.each(function () {

				var thisForm = $(this),
					successMessage = thisForm.find('.message.success'),
					errorMessage = thisForm.find('.message.danger');

				thisForm.validate({
					errorClass: 'error',
					submitHandler: function (form) {
						$.ajax({
							type: 'POST',
							url: 'handler.php',
							data: new FormData(form),
							cache: false,
							contentType: false,
							processData: false,
							success: function () {
								successMessage.fadeIn();
								setTimeout(function () {
									successMessage.fadeOut();
								}, 5000);
							},
							error: function () {
								errorMessage.fadeIn();
								setTimeout(function () {
									errorMessage.fadeOut();
								}, 5000);
							}
						});
					}
				});

			});
		}
	}

	VLTJS.contactForm.init();

})(jQuery);
/***********************************************
 * SITE: CONTENT SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	VLTJS.contentSlider = {
		init: function () {

			$('.vlt-content-slider').each(function () {

				var $this = $(this),
					container = $this.find('.swiper-container'),
					anchor = $this.data('navigation-anchor'),
					gap = $this.data('gap') || 0,
					effect = $this.data('effect') || 'slide',
					loop = $this.data('loop') || false,
					speed = $this.data('speed') || 1000,
					autoplay = $this.data('autoplay') ? true : false,
					centered = $this.data('slides-centered') ? true : false,
					freemode = $this.data('free-mode') ? true : false,
					slider_offset = $this.data('slider-offset') ? true : false,
					mousewheel = $this.data('mousewheel') ? true : false,
					autoplay_speed = $this.data('autoplay-speed'),
					settings = $this.data('slide-settings');

				var swiper = new Swiper(container, {
					init: false,
					spaceBetween: gap,
					grabCursor: true,
					effect: effect,
					initialSlide: settings.initial_slide ? settings.initial_slide : 0,
					loop: loop,
					speed: speed,
					centeredSlides: centered,
					freeMode: freemode,
					autoHeight: true,
					mousewheel: mousewheel,
					autoplay: autoplay ? {
						delay: autoplay_speed,
						disableOnInteraction: false
					} : false,
					slidesOffsetBefore: 100,
					slidesOffsetBefore: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					slidesOffsetAfter: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					navigation: {
						nextEl: $(anchor).find('.vlt-swiper-button-next'),
						prevEl: $(anchor).find('.vlt-swiper-button-prev'),
					},
					pagination: {
						el: $(anchor).find('.vlt-swiper-pagination'),
						clickable: true,
						renderBullet: function (index, className) {
							return '<span class="' + className + '"></span>';
						}
					},
					breakpoints: {
						// when window width is >= 576px
						576: {
							slidesPerView: settings.slides_to_show_mobile || settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_mobile || settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 992px
						992: {
							slidesPerView: settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll || 1,
						}
					}
				});

				swiper.on('init slideChange', function () {

					if ($this.find('.vlt-project').length) {

						var current = swiper.realIndex,
							sectionsBackgroundImage = $('.vlt-section__projects-background img');

						sectionsBackgroundImage.removeClass('is-active');
						sectionsBackgroundImage.eq(current).addClass('is-active');

					}

				});

				swiper.init();

				setTimeout(function () {
					swiper.updateAutoHeight();
				}, 50);

			});
		}
	}

	VLTJS.contentSlider.init();

})(jQuery);
/***********************************************
 * SITE: FULLPAGE SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.pagepiling == 'undefined') {
		return;
	}

	VLTJS.fullpageSlider = {

		init: function () {

			var fullpageSlider = $('.vlt-fullpage-slider'),
				progressBar = fullpageSlider.find('.vlt-fullpage-slider-progress-bar'),
				loopTop = fullpageSlider.data('loop-top') ? true : false,
				loopBottom = fullpageSlider.data('loop-bottom') ? true : false,
				speed = fullpageSlider.data('speed') || 800,
				anchors = [];

			if (!fullpageSlider.length) {
				return;
			}

			$('.vlt-offcanvas-menu ul.sf-menu > li:first-of-type, .vlt-default-menu__navigation ul.sf-menu > li:first-of-type').addClass('active');

			VLTJS.body.css('overflow', 'hidden');
			VLTJS.html.css('overflow', 'hidden');

			fullpageSlider.find('[data-anchor]').each(function () {
				anchors.push($(this).data('anchor'));
			});

			function vlthemes_navbar_solid() {
				if (fullpageSlider.find('.pp-section.active').scrollTop() > 0) {
					$('.vlt-navbar').addClass('vlt-navbar--solid');
				} else {
					$('.vlt-navbar').removeClass('vlt-navbar--solid');
				}
			}
			vlthemes_navbar_solid();

			function vlthemes_navigation() {
				var total = fullpageSlider.find('.vlt-section').length,
					current = fullpageSlider.find('.vlt-section.active').index(),
					scale = (current + 1) / total;
				progressBar.find('span').css({
					'transform': 'scaleY(' + scale + ')'
				});
			}

			fullpageSlider.pagepiling({
				menu: '.vlt-offcanvas-menu ul.sf-menu, .vlt-default-menu__navigation ul.sf-menu',
				scrollingSpeed: speed,
				loopTop: loopTop,
				loopBottom: loopBottom,
				anchors: anchors,
				sectionSelector: '.vlt-section',
				navigation: false,
				afterRender: function () {
					vlthemes_navigation();
					VLTJS.window.trigger('vlt.change-slide');
				},
				onLeave: function () {
					vlthemes_navigation();
					VLTJS.window.trigger('vlt.change-slide');
				},
				afterLoad: function () {
					vlthemes_navbar_solid();
				}
			});

			fullpageSlider.find('.pp-scrollable').on('scroll', function () {
				var scrollTop = $(this).scrollTop();
				if (scrollTop > 0) {
					$('.vlt-navbar').addClass('vlt-navbar--solid');
				} else {
					$('.vlt-navbar').removeClass('vlt-navbar--solid');
				}
			});

		}
	};

	VLTJS.fullpageSlider.init();

})(jQuery);
/***********************************************
 * SITE: MENU OFFCANVAS
 ***********************************************/
(function ($) {

	'use strict';

	var menuIsOpen = false;

	VLTJS.menuOffcanvas = {
		config: {
			easing: 'power2.out'
		},
		init: function () {
			var menu = $('.vlt-offcanvas-menu'),
				navigation = menu.find('ul.sf-menu'),
				navigationItem = navigation.find('> li'),
				header = $('.vlt-offcanvas-menu__header'),
				footer = $('.vlt-offcanvas-menu__footer > div'),
				menuOpen = $('.js-offcanvas-menu-open'),
				menuClose = $('.js-offcanvas-menu-close'),
				siteOverlay = $('.vlt-site-overlay');

			if (typeof $.fn.superclick !== 'undefined') {

				navigation.superclick({
					delay: 300,
					cssArrows: false,
					animation: {
						opacity: 'show',
						height: 'show'
					},
					animationOut: {
						opacity: 'hide',
						height: 'hide'
					},
				});

			}

			menuOpen.on('click', function (e) {
				e.preventDefault();
				if (!menuIsOpen) {
					VLTJS.menuOffcanvas.open_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			menuClose.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			siteOverlay.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			VLTJS.document.keyup(function (e) {
				if (e.keyCode === 27 && menuIsOpen) {
					e.preventDefault();
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			// Close after click to anchor.
			navigationItem.filter('[data-menuanchor]').on('click', 'a', function () {
				if (menuIsOpen) {
					VLTJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

		},
		open_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = true;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(VLTJS.html, {
						overflow: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 1,
					})
					// menu animation
					.fromTo(menu, .6, {
						x: '100%',
					}, {
						x: 0,
						visibility: 'visible'
					}, '-=.3')
					// header animation
					.fromTo(header, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1
					}, '-=.3')
					// navigation item animation
					.fromTo(navigationItem, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15')
					// footer animation
					.fromTo(footer, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15');
			}
		},
		close_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = false;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(VLTJS.html, {
						overflow: 'inherit'
					})
					// footer animation
					.to(footer, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						}
					})
					// navigation item animation
					.to(navigationItem, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						},
					}, '-=.15')
					// header animation
					.to(header, .3, {
						x: 50,
						autoAlpha: 0,
					}, '-=.15')
					// menu animation
					.to(menu, .6, {
						x: '100%',
					}, '-=.15')
					// set visibility menu after animation
					.set(menu, {
						visibility: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 0
					}, '-=.6');
			}
		}
	};

	VLTJS.menuOffcanvas.init();

})(jQuery);
/***********************************************
 * SITE: NAVBAR
 ***********************************************/
(function ($) {
	'use strict';

	var navbarMain = $('.vlt-navbar--main'),
		navbarHeight = navbarMain.outerHeight(),
		navbarMainOffset = 0;

	// fake navbar
	var navbarFake = $('<div class="vlt-fake-navbar">').hide();

	// fixed navbar
	function _fixed_navbar() {
		navbarMain.addClass('vlt-navbar--fixed');
		navbarFake.show();
		// add solid color
		if (navbarMain.hasClass('vlt-navbar--transparent') && navbarMain.hasClass('vlt-navbar--sticky')) {
			navbarMain.addClass('vlt-navbar--solid');
		}
	}

	function _unfixed_navbar() {
		navbarMain.removeClass('vlt-navbar--fixed');
		navbarFake.hide();
		// remove solid color
		if (navbarMain.hasClass('vlt-navbar--transparent') && navbarMain.hasClass('vlt-navbar--sticky')) {
			navbarMain.removeClass('vlt-navbar--solid');
		}
	}

	function _on_scroll_navbar() {
		if (VLTJS.window.scrollTop() > navbarMainOffset) {
			_fixed_navbar();
		} else {
			_unfixed_navbar();
		}
	}

	if (navbarMain.hasClass('vlt-navbar--sticky')) {
		VLTJS.window.on('scroll resize', _on_scroll_navbar);
		_on_scroll_navbar();
		// append fake navbar
		navbarMain.after(navbarFake);
		// fake navbar height after resize
		navbarFake.height(navbarHeight);
		VLTJS.debounceResize(function () {
			navbarFake.height(navbarHeight);
		});
	}

})(jQuery);
/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
(function ($) {

	'use strict';

	/**
	 * Jarallax
	 */
	if (typeof $.fn.jarallax !== 'undefined') {
		$('.jarallax').jarallax({
			speed: 0.8
		});
	}

	/**
	 * Fast click
	 */
	if (typeof FastClick === 'function') {
		FastClick.attach(document.body);
	}

})(jQuery);
/***********************************************
 * SITE: PRELOADER
 ***********************************************/
(function ($) {
	'use strict';

	// check if plugin defined
	if (typeof $.fn.animsition == 'undefined') {
		return;
	}

	var preloader = $('.animsition');

	preloader.animsition({
		inDuration: 500,
		outDuration: 500,
		loadingParentElement: 'html',
		linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul)',
		loadingClass: 'animsition-loading-2',
		loadingInner: '<div class="spinner"><span class="double-bounce-one"></span><span class="double-bounce-two"></span></div>',
	});

	preloader.on('animsition.inEnd', function () {
		VLTJS.window.trigger('vlt.preloader_done');
		VLTJS.html.addClass('vlt-is-page-loaded');
	});

})(jQuery);
/***********************************************
 * SITE: PROGRESS BAR
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof gsap == 'undefined') {
		return;
	}

	VLTJS.progressBar = {
		init: function () {

			var progressBar = $('.vlt-progress-bar');

			progressBar.each(function () {

				var $this = $(this),
					final_value = $this.data('final-value') || 0,
					animation_duration = $this.data('animation-speed') || 0,
					delay = 500,
					obj = {
						count: 0
					};

				VLTJS.window.on('vlt.change-slide', function () {
					if ($this.parents('.vlt-section').hasClass('active')) {

						obj.count = 0;
						$this.find('.vlt-progress-bar__title > .counter').text(Math.round(obj.count));
						gsap.set($this.find('.vlt-progress-bar__bar > span'), {
							width: 0
						});
						gsap.to(obj, (animation_duration / 1000) / 2, {
							count: final_value,
							delay: delay / 1000,
							onUpdate: function () {
								$this.find('.vlt-progress-bar__title > .counter').text(Math.round(obj.count));
							}
						});

						gsap.to($this.find('.vlt-progress-bar__bar > span'), animation_duration / 1000, {
							width: final_value + '%',
							delay: delay / 1000
						});

					}
				});

			});

		}
	}

	VLTJS.progressBar.init();

})(jQuery);
/***********************************************
 * SITE: SIMPLE IMAGE
 ***********************************************/
(function ($) {

	'use strict';

	VLTJS.simpleImage = {
		init: function () {

			var simpleImage = $('.vlt-simple-image');

			simpleImage.each(function () {

				var $this = $(this),
					mask = $this.find('.vlt-simple-image__mask');

				$this.on('inview', function () {
					mask.addClass('active');
				});

			});

		}
	}

	VLTJS.simpleImage.init();

})(jQuery);