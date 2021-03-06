// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//= require_tree .
jQuery.noConflict();
jQuery(document).ready(function($){

	"use strict";

	/*Pace.on("done", function(){
		$(".loader-wrapper").fadeOut(500);
		$(".pace").remove();
	});*/

	/* Sticky Header */
	$("#header-wrapper").sticky({ topSpacing: 0 });

	/* One page navigation */
	$('.header-mean-wrapper #main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 80
	});


	/* Goto Top */
	$().UItoTop({ easingType: 'easeOutQuart' });

	/* Parallax Section */
	$('.parallax').each(function(){
		$(this).bind('inview', function (event, visible) {
			if(visible == true) {
				$(this).parallax("50%", 0.3);
			} else {
				$(this).css('background-position','');
			}
		});
	});

	/* PrettyPhoto For Portfolio */
	if($(".portfolio").length) {
		$(".portfolio a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});
	}


	//Window Load Start
	$(window).load(function(){
		/* Template Isotope */
		if( $(".apply-isotope").length ){
			$(".apply-isotope").each(function(){
				$(this).isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 25} });
			});
		}
		//Portfolio isotope
		var $container = $('.portfolio-container');
		if( $container.length) {

			var $width = $container.hasClass("no-space") ? 0 : 20;

			$(window).smartresize(function(){
				$container.css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { gutterWidth: $width } });
			});

			$container.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}
		jQuery(document).ready(function () {
		    jQuery('header nav').meanmenu();
		});

		if($("div.sorting-container").length){
			$("div.sorting-container a").click(function(){
				var $width = $container.hasClass("no-space") ? 0 : 20;
				$("div.sorting-container a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");
				$container.isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});
			return false;
			});
		}
		//Portfolio isotope End
	});	//Window Load End



	/* Progress Bar */
	 animateSkillBars();
	 animateSection();
	 $(window).scroll(function(){
		animateSkillBars();
		animateSection();
	 });

	 function animateSection(){
		 var applyViewPort = ( jQuery("html").hasClass('csstransforms') ) ? ":in-viewport" : "";
		 jQuery('.animate'+applyViewPort).each(function(){
			var $this = jQuery(this),
				$animation = ( $this.data("animation") !== undefined ) ? $this.data("animation") : "slideUp";
			var	$delay = ( $this.data("delay") !== undefined ) ? $this.data("delay") : 300;

			if( !$this.hasClass($animation) ){
				setTimeout(function() { $this.addClass($animation);	},$delay);
			}
		 });
	 }

	 function animateSkillBars(){
		 var applyViewPort = ( jQuery("html").hasClass('csstransforms') ) ? ":in-viewport" : "";
		 jQuery('.dt-sc-progress'+applyViewPort).each(function(){
			 var progressBar = jQuery(this),
				 progressValue = progressBar.find('.dt-sc-bar').attr('data-value');

				 if (!progressBar.hasClass('animated')) {
						progressBar.addClass('animated');
						progressBar.find('.dt-sc-bar').animate({width: progressValue + "%"},600,function(){ progressBar.find('.dt-sc-bar-text').fadeIn(400); });
				 }
		 });
	}/* Progress Bar End */

	//Window Load Start
	$(window).load(function(){
		//*Testimonial Carousel*/
		if( jQuery('.dt-sc-testimonial-carousel').length ) {
			jQuery('.dt-sc-testimonial-carousel').each(function(){
				var column = jQuery(this).data('column');
				if(column != '') column = column; else column = 1;
				jQuery(this).carouFredSel({
					responsive:true,
					auto:true,
					width:'100%',
					prev:'.testimonial-prev',
					next:'.testimonial-next',
					pagination:jQuery(this).parents(".dt-sc-testimonial-wrapper.type2").find(".pager"),
					scroll:1,
					items:{visible: {min: column}, height: 'variable'}
				});
			});
		}/*Testimonial Carousel End*/

		//*Testimonial Carousel*/
		if( jQuery('.dt-sc-partner-carousel').length ) {
			jQuery('.dt-sc-partner-carousel').each(function(){
				jQuery(this).carouFredSel({
					responsive:true,
					auto:true,
					width:'100%',
					height: 'variable',
					prev: 'prev',
					next: 'next',
					scroll:1,
					items:{visible: {min: 1, max: 4}, height: 'variable'}
				});
			});
		} //*Testimonial Carousel End*/

		// Team Carousel
		if( jQuery('.dt-sc-team-carousel').length) {
			jQuery('.dt-sc-team-carousel').each(function(){
				  var pagger = jQuery(this).parents(".dt-sc-team-carousel-wrapper").find("div.carousel-arrows"),
					  next = pagger.find("a.next"),
					  prev = pagger.find("a.prev");

				jQuery(this).carouFredSel({
					  responsive:true,
					  auto:false,
					  width:'100%',
					  height: 'variable',
					  scroll:1,
					  items:{
						height: 'variable',
						visible: {min: 1,max: 3}
					  },
					  pagination:jQuery(this).parents(".dt-sc-team-carousel-wrapper.type2").find(".pager"),
					  prev:prev,
					  next:next
				});

			});
		}

		//*Product Carousel*/
		if(jQuery('.feature-product-carousel').length) {
			jQuery('.feature-product-carousel').carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				height: 'variable',
				prev: '.prev',
				next: '.next',
				scroll: 1,
				items: {
				width: $(this).find('.column').width(),
				height: 'variable',
				visible: {
				  min: 1,
				  max: 4 }
				}
			});
		} /*Product Carousel End*/

		//*Events Carousel*/
		if(jQuery('.events-carousel').length) {
			jQuery('.events-carousel').carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				height: 'variable',
				prev: '.event-prev',
				next: '.event-next',
				scroll: 1,
				items: {
				width: $(this).find('.column').width(),
				height: 'variable',
				visible: {
				  min: 1,
				  max: 4 }
				}
			});
		} /*Events Carousel End*/

		//*Events Carousel*/
		if(jQuery('.portfolio-carousel').length) {
			jQuery('.portfolio-carousel').carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				height: 'variable',
				prev: '.portfolio-prev',
				next: '.portfolio-next',
				scroll: 1,
				items: {
				width: $(this).find('.column.no-space').width(),
				height: 'variable',
				visible: {
				  min: 1,
				  max: 3 }
				}
			});
		} /*Events Carousel End*/

		//Reviews Carousel...
		if($(".reviews-carousel-wrapper").length) {
		  $('.reviews-carousel-wrapper').carouFredSel({
			responsive: true,
			width: '100%',
			scroll: {
				fx: "crossfade"
			},
			auto: {
				pauseDuration: 5000,
			},
			items: {
				height: 'variable',
				visible: {
					min: 1,
					max: 1
				}
			}
		  });
		}



		//SLIDING BANNER...
		if(jQuery('.slider-wrapper').length) {
			jQuery('.slider-wrapper').each(function(){
				var $this = jQuery(this).find('.main-slider');
				$this.carouFredSel({
					responsive: true,
					auto: false,
					width: '100%',
					height: 'auto',
					scroll: {
						fx: "crossfade",
						duration: 800
					},
					items: { width: $this.find("div.column").width(),  visible: { min: 1, max: 1 } },
					pagination: {
						container: ".slide-controls",
						anchorBuilder: false
					}
				});
			});
		}
	});


	//Google Map
	if( $('#map').length ) {
		$("#map").gMap({
			controls: false,
			scrollwheel: false,
			markers: [{
					  address : 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  html: 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  icon: {
							image: "js/images/mapicon.png",
							iconsize: [45, 41],
						}
					}],
			zoom: 16
		});
	}

	//Accordion & Toggle
	$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
	$('.dt-sc-toggle').click(function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });

	$('.dt-sc-toggle-frame-set').each(function(){
		var $this = $(this),
		    $toggle = $this.find('.dt-sc-toggle-accordion');

			$toggle.click(function(){
				if( $(this).next().is(':hidden') ) {
					$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
					$(this).toggleClass('active').next().slideDown();
				}
				return false;
			});

			//Activate First Item always
			$this.find('.dt-sc-toggle-accordion:first').addClass("active");
			$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
  	});//Accordion & Toggle

	// Tabs Shortcodes
	if ($("ul.dt-sc-tabs").length > 0) {
		$("ul.dt-sc-tabs").tabs("> .dt-sc-tabs-content")
	}
	if ($("ul.dt-sc-tabs-frame").length > 0) {
		$("ul.dt-sc-tabs-frame").tabs("> .dt-sc-tabs-frame-content")
	}
	if ($(".dt-sc-tabs-vertical-frame").length > 0) {
		$(".dt-sc-tabs-vertical-frame").tabs("> .dt-sc-tabs-vertical-frame-content");
		$(".dt-sc-tabs-vertical-frame").each(function() {
			$(this).find("li:first").addClass("first").addClass("current");
			$(this).find("li:last").addClass("last")
		});
		$(".dt-sc-tabs-vertical-frame li").click(function() {
			$(this).parent().children().removeClass("current");
			$(this).addClass("current")
		})
	} /*Tabs Shortcodes Ends*/

	//Recent gallery slider
	if( $(".recent-gallery").find("li").length > 1 ) {
		$(".recent-gallery").bxSlider({ auto:false, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true });
	} /*Recent gallery slider

	/*Tooltip*/
	 if(jQuery(".dt-sc-tooltip-bottom").length){
		jQuery(".dt-sc-tooltip-bottom").each(function(){ jQuery(this).tipTip({maxWidth: "auto"}); });
	 }

	 if(jQuery(".dt-sc-tooltip-top").length){
		jQuery(".dt-sc-tooltip-top").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "top"}); });
	 }

	 if(jQuery(".dt-sc-tooltip-left").length){
		jQuery(".dt-sc-tooltip-left").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
	 }

	 if(jQuery(".dt-sc-tooltip-right").length){
		jQuery(".dt-sc-tooltip-right").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "right"}); });
	 }/*Tooltip End*/

	 // animate css + jquery inview configuration
	 $(".animate").each(function () {
		$(this).bind('inview', function (event, visible) {
			var $delay = "";
			var $this = $(this),
				$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
			$delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;

			if (visible === true) {
				   setTimeout(function () { $this.addClass($animation); }, $delay);
		   } else {
				   setTimeout(function() { $this.removeClass('animate'); } );
		   }
		});
	});

	if($().validate) {

		//AJAX CONTACT FORM...
		$('form[name="frmcontact"]').submit(function () {
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('The page save failed.');
					   },
					  success: function (response) {
						$('#ajax_contact_msg').html(response);
						$('#ajax_contact_msg').slideDown('slow');
					 }
				});
			}
			return false;
		});

		$('form[name="frmcontact"]').validate({
			rules: {
				txtname: { required: true },
				txtemail: { required: true, email: true },
				txtmessage: { required: true }
			},
			errorPlacement: function(error, element) { }
		});

		$('form[name="frmRegister"]').validate({
			rules: {
				f_user: { required: true },
				email: { required: true, email: true },
				pwd: { required: true },
				c_pwd: { required: true }
			},
			errorPlacement: function(error, element) { }
		});

		$('form[name="frmLogin"]').validate({
			rules: {
				user: { required: true },
				pwd: { required: true },
			},
			errorPlacement: function(error, element) { }
		});

		//AJAX SUBSCRIBE FORM...
		$('form[name="frmNewsletter"]').submit(function () {
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('The page save failed.');
					   },
					  success: function (response) {
						$('#ajax_newsletter_msg').html(response);
						$('#ajax_newsletter_msg').slideDown('slow');
						if (response.match('success') != null) $(This).slideUp('slow');
					 }
				});
			}
			return false;
		});

		$('form[name="frmNewsletter"]').validate({
			rules: {
				email: { required: true, email: true }
			},
			errorPlacement: function(error, element) { }
		});

		if($('form[name="frmNewsletterContent"]').length) {
			$('form[name="frmNewsletterContent"]').submit(function () {
				var This = $(this);
				if($(This).valid()) {
					var action = $(This).attr('action');
					var data_value = unescape($(This).serialize());
					$.ajax({
						 type: "POST",
						 url:action,
						 data: data_value,
						 error: function (xhr, status, error) {
							 confirm('The page save failed.');
						   },
						  success: function (response) {
							$('#ajax_newsletter_msg_content').html(response);
							$('#ajax_newsletter_msg_content').slideDown('slow');
							if (response.match('success') != null) $(This).slideUp('slow');
						 }
					});
				}
				return false;
			});

			$('form[name="frmNewsletterContent"]').validate({
				rules: {
					email: { required: true, email: true }
				},
				errorPlacement: function(error, element) { }
			});
		}

	}

	var j = 1;
	$('.blog-load-more').click(function(e){

		if(j == 3) {
			$('.blog-load-more').text('No more posts to load!').css({"cursor":"default"});
		} else {

			$.ajax({
				type: "POST",
				url: "contents/blog-content-"+j+".html",
				dataType: "html",
				cache: false,
				msg : '',
				beforeSend: function(){
					$('.blog-load-more').html('Loading...');
				},
				success: function(msg){
					$('.blog-items').append(msg);
					$('.blog-items').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					if(j == 2) {
						$('.blog-load-more').text('No more posts to load!').css({"cursor":"default"});
					} else {
						$('.blog-load-more').text('Load More').css({"cursor":"pointer"});
					}
					j++;
				}
			});

		}
		e.preventDefault();

	});

	var j = 1;
	$('.portfolio-load-more').click(function(e){

		var column = 'four';
		if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-fourth')) column = 'four';
		else if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-third')) column = 'three';
		else if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-half')) column = 'two';
		else if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-column')) column = 'one';

		if(j == 3) {
			$('.portfolio-load-more').text('No more posts to load!').css({"cursor":"default"});
		} else {

			$.ajax({
				type: "POST",
				url: "contents/portfolio-content-"+column+"-"+j+".html",
				dataType: "html",
				cache: false,
				msg : '',
				beforeSend: function(){
					$('.portfolio-load-more').html('Loading...');
				},
				success: function(msg){
					$('.portfolio-container').append(msg);
					$('.portfolio-container').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					if(j == 2) {
						$('.portfolio-load-more').text('No more posts to load!').css({"cursor":"default"});
					} else {
						$('.portfolio-load-more').text('Load More').css({"cursor":"pointer"});
					}
					j++;
				}
			});

		}
		e.preventDefault();

	});

	$('.plus').click(function(e){
		e.preventDefault();
		var currentVal = parseInt($(this).parents('.quantity').find('input[name="quantity"]').val());
		if (!isNaN(currentVal)) {
			$(this).parents('.quantity').find('input[name="quantity"]').val(currentVal + 1);
		} else {
			$(this).parents('.quantity').find('input[name="quantity"]').val(0);
		}
	});

	$(".minus").click(function(e) {
		e.preventDefault();
		var currentVal = parseInt($(this).parents('.quantity').find('input[name="quantity"]').val());
		if (!isNaN(currentVal) && currentVal > 0) {
			$(this).parents('.quantity').find('input[name="quantity"]').val(currentVal - 1);
		} else {
			$(this).parents('.quantity').find('input[name="quantity"]').val(0);
		}
	});

	if($( "#priceslider" ).length) {
		$( "#priceslider" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#priceslider-from" ).html( "$" + ui.values[ 0 ] + ".00" );
				$( "#priceslider-to" ).html( "$" + ui.values[ 1 ] + ".00" );
			}
		});
	}

	if($(".show-box").length) {
		$(".show-box").click( function() {
			if($(this).parent().find('.search-form-box').hasClass('hidden'))
				$(this).parent().find('.search-form-box').removeClass('hidden');
			else
				$(this).parent().find('.search-form-box').addClass('hidden');
		});
	}

	$(document).click(function(ev){

		var myID = ev.target.id,
			myClass = ev.target.className;

		if((myClass !='fa fa-search' ) && (myClass !='show-box' ) && myID !='search-box'){
			$( '.search-form-box' ).addClass('hidden');
		}

	});

	//ANIMATE NUMBER...
	$('.dt-sc-num-count').each(function(){
	  $(this).one('inview', function (event, visible) {
		  if(visible === true) {
			  var val = $(this).attr('data-value');
			  $(this).animateNumber({ number: val	}, 2000);
		  }
	  });
	});

	/* Reservation Popup */
	$("a[data-gal^='prettyPhoto[reservation]']").prettyPhoto({
		overlay_gallery: false,
		social_tools: false,
		deeplinking: false,
		default_width: 800,
	});

	//BMI Form Validation...
	$('form[name="frmbmi"]').validate({
		rules: {
			txtfeet: { required: true },
			txtinches: { required: true },
			txtlbs: { required: true }
		},
		errorPlacement: function(error, element) { }
	});

	//BMI Calculation...
	$('form[name="frmbmi"]').submit(function(){
		var This = $(this);
		if($(This).valid()) {
			var fet = $('input[name="txtfeet"]').val();
			var inc = $('input[name="txtinches"]').val();
			var tinc = ( parseInt(fet) * 12 ) + parseInt(inc);

			var lbs = $('input[name="txtlbs"]').val();

			var bmi = ( parseFloat(lbs) / (tinc * tinc) ) * 703;

			$('input[name="txtbmi"]').val(parseFloat(bmi).toFixed(1));
		}
		return false;
	});

	//BMI View...
	if($("a.fancyInline").length) {
		$("a.fancyInline").fancybox({
			scrolling: 'no',
			width: 'auto',
			height: 'auto'
		});
	}

});

	//MeanMenu Custom Scroll...
	function funtoScroll(x, e) {
		"use strict";
		var str = new String(e.target);
		var pos = str.indexOf('#');
		var t = str.substr(pos);

		var eleclass = jQuery(e.target).prop("class");

		if(eleclass == "external") {
			window.location.href = e.target;
		} else {
			jQuery.scrollTo(t, 750, { offset: { top: -53 }});
		}

		jQuery(x).parent('.mean-bar').next('.mean-push').remove();
		jQuery(x).parent('.mean-bar').remove();

		jQuery('nav#main-menu').meanmenu({
			meanMenuContainer :  jQuery('#menu-container'),
			meanRevealPosition:  'right',
			meanScreenWidth   :  767
		});

		e.preventDefault();
	}(jQuery);
