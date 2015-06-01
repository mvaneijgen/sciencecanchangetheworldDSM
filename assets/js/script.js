$(function(){

	var iframe = $('iframe#video_player')[0];
    var	player = $f(iframe),
    	prev_height;

    	$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});
    
    $( document ).scroll(function(data) {
    	if(!$('.video_container').hasClass('opening')) return;
    	if($(window).scrollTop() > 0){
    		$('.video_footer').removeClass('open');
    	}else{
    		$('.video_footer').addClass('open');
    	}
    });

	player.addEvent('ready', function() {
        player.addEvent('pause', closeVideo);
        player.addEvent('finish', closeVideo);
    });
    
    $('.pause_video').click(function(){
    	player.api('pause');
    });

    function closeVideo(){
    	$('.video_container').css('height', prev_height);
		$('.video_footer').removeClass('open');
		$('.video_container .video').hide();
		$('.video_container').removeClass('opening');
    }

    $('.read_more').click(function(){
    	var exerp = $(this).attr('data-name');
    	if($(this).hasClass('open')){
    		$(this).html('i want to read more');
    	}else{
    		$(this).html('i want to read less');
    	}
    	$(this).toggleClass('open');
    	$(this).closest('.part_2').find('.collapse.'+exerp).collapse('toggle');
    });

	var owl = $('.owl-carousel').owlCarousel({
	loop:true,
	margin:0,
	nav:false,
	responsiveClass:true,
	nestedItemSelector: 'item',
	responsive:{
		    0:{
		        items:1,
		    },
		    600:{
		        items:2,
		    },
		    1000:{
		        items:4,
		    }
		}
	});

	$('.next_car').click(function() {
	    owl.trigger('next.owl.carousel');
	});

	$('.prev_car').click(function() {
	    owl.trigger('prev.owl.carousel');
	});

	$('#open_menu').click(toggle_menu);
	$('#close_menu').click(toggle_menu);

	function toggle_menu(){
		$('nav').toggleClass('open');
	}

	/*mobile*/
	$('#open_mobile_menu').on('touchstart', function(){
		$('.mobile_nav').toggleClass('open');
	});
	/*end mobile*/

	$('#start_movie').click(function(){
		window.scrollTo(0,0);
		prev_height = $('.video_container').height();
		var header_h = $('header').height();
		var video_footer_h = $('div.video_footer').height();
		var video_container_h = $(window).height()-(video_footer_h+video_footer_h);
		$('.video_container').css('height', video_container_h);
		$('.video_footer').addClass('open');
		
		setTimeout(function(){
			$('.video_container .video').show();
			player.api('play');
		}, 1100);
		$('.video_container').addClass('opening');
	});
});
