//  Ivan Eremeev - 2020
//  Skype: ivan.eremeev_1
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Брэйкпоинты js
	var	breakXl = 1400,
			breakLg = 1200,
			breakMd = 1050,
			breakSm = 769,
			breakXs = 500;
	
	// YandexMap
	function map() {
	  const mapBlock = $('#map');
	  if (mapBlock.length) {
	    const coord = mapBlock.data('coord');
	    ymaps.ready(function () {
	      initYandexMap();
	    });
	    function initYandexMap() {
	      var myMap;
	      myMap = new ymaps.Map("map", {
	        center: coord, // Центер карты
	        zoom: 16, // Коэффициент масштаба карты
	        controls: [ // Элементы управления
	          'zoomControl',
	          // 'searchControl',
	          // 'typeSelector',
	          // 'fullscreenControl',
	          // 'routeButtonControl'
	        ]
	      });
	      // Метка со своим изображением, балуном и хинтом
	      var myPlacemark = new ymaps.Placemark(coord, null, {
	        iconLayout: 'default#image',
	        iconImageHref: 'img/placemark.svg',
	        iconImageSize: [32, 42],
	        iconImageOffset: [-15, -44]
	      });
	      myMap.geoObjects
	      .add(myPlacemark);
	      // myPlacemark.balloon.open(); // Открыть балун метки
	      myMap.behaviors.disable('scrollZoom'); // Отключить изменение масштаба скроллом мыши
	    }
	  }
	}
	map();

	// Запрет перехода по ссылкам с хэшем
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Мобильное меню
	function myMenu(menu) {
		if (menu.length) {
			menu.each(function () {
				var $this = $(this),
						menuBtn = $this.find('#menu-btn'),
						over = $this.find('#menu-over'),
						close = $this.find('#menu-close'),
						body = $('body'),
						scrollbarWidth;
				menuBtn.on('click', toggleOpenMenu);
				over.on('click', menuClose);
				close.on('click', menuClose);
				function menuOpen() { // Открывание меню
					body.addClass('lock').css('padding-right', scrollbarWidth);
					$this.addClass('open');
					menuBtn.addClass('is-active');
				}
				function menuClose() { // Закрывание меню
					body.removeClass('lock').css('padding-right', 0);
					$this.removeClass('open');
					menuBtn.removeClass('is-active');
				}
				function scrollbarWidthCalc() { // Вычисление ширины скролла
					var documentWidth = parseInt(document.documentElement.clientWidth),
							windowsWidth = parseInt(window.innerWidth);
							scrollbarWidth = windowsWidth - documentWidth;
				}
				function toggleOpenMenu() { // Открывание/закрывание меню
					if ($this.hasClass('open')) {
						menuClose();
					}else {
						menuOpen();
					}
				}
				scrollbarWidthCalc();
				$(window).resize(scrollbarWidthCalc);
			})
		};
	};
	myMenu($('.js-menu'));

	// Табы
	function tabs(tabs) {
		if (tabs.length) {
			tabs.each(function() {
				var trigger = $(this).find('.js-tabs_triggers').children(),
						content = $(this).find('.js-tabs_content').children(),
						time = 300;
				trigger.click(function () {
					var $this = $(this),
							index = $this.index();
					if (!$this.hasClass('active')) {
						trigger.removeClass('active');
						$this.addClass('active');
						content.removeClass('open').hide();
						content.eq(index).fadeIn(time, function () {$(this).addClass('open')});
					}else {
						return false;
					}
				});
			});
		}
	}
	tabs($('.js-tabs'));

	// Аккордеон
	function accordion() {
		if ($('.accordion').length) {
			$('.accordion').each(function () {
				var accordion = $(this),
					trigger = accordion.find('.accordion__trigger'),
					time = 300;
				trigger.on('click', function () {
					var $thisTrigger = $(this),
						data = $thisTrigger.data('trigger');
					if (!$thisTrigger.hasClass('active')) {
						$thisTrigger.addClass('active');
						accordion.find('#' + data).stop().slideDown(
							time,
							function () {
								$(this).addClass('open')
							}
						);
					} else {
						$thisTrigger.removeClass('active');
						accordion.find('#' + data).stop().slideUp(
							time,
							function () {
								$(this).removeClass('open')
							}
						);
					}
				})
			})
		}
	}
	accordion();

	// Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
				drop = undefined,
				close = $('.js-drop-close');
		btn.on('click', function (e) {
			e.preventDefault();
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

	// Появление поиска на мобилке
	function dropSearch(btn) {
		var $this = undefined,
			drop = undefined;
		btn.on('click', function (e) {
			if ($(window).width() <= breakMd) {
				e.preventDefault();
				$this = $(this);
				drop = $('#' + $this.data('drop'));
				$this.toggleClass('is-active');
				drop.toggleClass('open');
				$(document).mouseup(function (e) {
					if (!$this.is(e.target)
						&& $this.has(e.target).length === 0
						&& !drop.is(e.target)
						&& drop.has(e.target).length === 0) {
						$this.removeClass('is-active');
						drop.removeClass('open');
					}
				});
			}
		})
	}
	dropSearch($('.js-search-btn'));

	// Меню 
	function menu(btn) {
		var $this = undefined,
				drop = undefined,
				body = $('body');
		btn.on('click', function (e) {
			e.preventDefault();
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			body.toggleClass('lock');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
					body.removeClass('lock');
				}
			});
		})
	}
	menu($('.js-drop-menu'));

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
	function stikyMenu() {
		const header = document.querySelector('#header');
		const content = document.querySelector('.content');
		let width = window.clientWidth;

		if (header) {
			// setPaddingTopFromHeader();

			setNavbarPosition();

			window.addEventListener('scroll', () => {
				setNavbarPosition();
			});
		}

		function setNavbarPosition() {

			if (window.scrollY > header.clientTop + 300) {
				header.classList.add('stiky');
			} else if (window.scrollY <= header.clientTop + 1) {
				header.classList.remove('stiky');
			}

		}

		function setPaddingTopFromHeader() {
			setTimeout(() => {
				content.setAttribute('style', `padding-top:${header.clientHeight
					}px;`);
			}, 500);
		}

	}
	stikyMenu();

	// Показывать подменю в каталоге при наведении на пункты меню
	function showSubmenuByHover() {
		var menuItem = $('[data-catalog-item]');
		var menuSubmenu = $('[data-catalog-submenu]');
		menuItem.on('mouseover', function () {
			var data = $(this).data('catalog-item');
			var submenu = $('[data-catalog-submenu="' + data + '"]');
			menuSubmenu.removeClass('open');
			submenu.addClass('open');
			menuItem.removeClass('active');
			$(this).addClass('active');
		})
	}
	showSubmenuByHover();

	// Swiper
	const bannerSlider = new Swiper('#bannerSlider', {
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		speed: 1500,
		pagination: {
			el: '.banner__pagination',
			clickable: true,
		},
	});

	function initOffersSlider() {
		let slider = $('.js-offersSlider');
		slider.each(function (index, element) {
			let $this = $(this);
			$this.addClass("instance-" + index);
			$this.parent().find(".swiper-button-prev").addClass("prev-" + index);
			$this.parent().find(".swiper-button-next").addClass("next-" + index);
			let offersSlider = new Swiper('.instance-' + index, {
				slidesPerView: 2,
				spaceBetween: 10,
				navigation: {
					prevEl: '.prev-' + index,
					nextEl: '.next-' + index,
				},
				breakpoints: {
					500: {
						slidesPerView: 3,
						spaceBetween: 10
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 15
					},
					1050: {
						slidesPerView: 4,
						spaceBetween: 27
					}
				}
			});
		});
	}
	initOffersSlider();

	const sliderBrands = new Swiper('#sliderBrands', {
		slidesPerView: 2,
		spaceBetween: 10,
		navigation: {
			prevEl: '.offers__arrow--prev',
			nextEl: '.offers__arrow--next',
		},
		breakpoints: {
			500: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			769: {
				slidesPerView: 5,
				spaceBetween: 10
			},
			1050: {
				slidesPerView: 7,
				spaceBetween: 16
			}
		}
	});

	var productSliderNav = new Swiper("#productSliderNav", {
		spaceBetween: 12,
		slidesPerView: 3,
		freeMode: true,
		direction: "horizontal",
		watchSlidesProgress: true,
		grabCursor: true,
		breakpoints: {
			500: {
				slidesPerView: 5,
			},
			769: {
				direction: 'vertical',
				slidesPerView: 5,
			},
		}
	});
	var productSliderMain = new Swiper("#productSliderMain", {
		spaceBetween: 10,
		grabCursor: true,
		thumbs: {
			swiper: productSliderNav
		}
	});

	// FormStyler
	$('select').styler({
		selectVisibleOptions: 10,
	});

	// JQueryScrollbar
	$('.scrollbar-inner').scrollbar();

	// NouiSlider
	function noUiSliderInit() {
		var rangeSlider = document.getElementById('rangeSlider');
		
		if (rangeSlider) {
			var minVal = Number(rangeSlider.getAttribute('data-min'));
			var maxVal = Number(rangeSlider.getAttribute('data-max'));
			var startVal = Number(rangeSlider.getAttribute('data-start'));
			var stopVal = Number(rangeSlider.getAttribute('data-stop'));
			var input0 = document.getElementById('rangeSliderInput_0');
			var input1 = document.getElementById('rangeSliderInput_1');
			var inputs = [input0, input1];
			
			noUiSlider.create(rangeSlider, {
				start: [startVal, stopVal],
				connect: true,
				format: wNumb({
					decimals: 0
				}),
				range: {
					'min': minVal,
					'max': maxVal
				}
			});

			rangeSlider.noUiSlider.on('update', function (values, handle) {
				inputs[handle].value = values[handle];
			});

			inputs.forEach(function (input, handle) {
				input.addEventListener('input', function () {
					rangeSlider.noUiSlider.setHandle(handle, this.value);
				});
			});	
		}
	}
	noUiSliderInit();

	// Показать еще в фильтрах
	function showMoreFilters() {
		const list = $('.js-more-list');
		const btn = $('.js-more-btn');
		list.each( function () {
			$(this).find('li').each(function (index) {
				if (index > 4) {
					$(this).fadeOut();
				}
			})
		})
		btn.on('click', function () {
			$(this).fadeOut();
			$(this).parent().find($('.js-more-list li')).fadeIn();
		})
	}
	showMoreFilters();

	// Очистить фильтр 
	function clearFilter() {
		let clearBnt = $('.filters__clear');
		clearBnt.on('click', function () {
			$(this).closest('.filters').find('input').prop('checked', false);
		})
	}
	clearFilter();

	// Изменение количества товара (плюс минус)
	function counter(block) {
		const counter = document.querySelectorAll(block);
		if (counter) {
			counter.forEach(element => {
				const minus = element.querySelector('.js-counter-minus');
				const plus = element.querySelector('.js-counter-plus');
				const inputWrap = element.querySelector('.js-counter-input');
				const input = inputWrap.querySelector('input');
				plus.addEventListener('click', () => {
					if (Number(input.value) < 999) {
						input.value = Number(input.value) + 1;
					}
				})
				minus.addEventListener('click', () => {
					if (Number(input.value) > 1) {
						input.value = Number(input.value) - 1;
					}
				})
				input.addEventListener('keyup', () => {
					input.value = input.value.replace(/[^\d]/g, '');
				})
				input.addEventListener('blur', () => {
					if (input.value == '' || input.value == 0) {
						input.value = 1;
					}
				})
			});
		}
	}
	counter('.js-counter');

	// Маркировка нумерованных списков в текстовом блоке
	function olListStyleType() {
		const textBlock = $('.text-block');
		const olList = textBlock.find('ol');
		olList.each( function () {
			$(this).find('li').each(function (index) {
				$(this).append('<span>' + (index + 1) + '.' + '</span>');
			})
		})
	}
	olListStyleType();

});