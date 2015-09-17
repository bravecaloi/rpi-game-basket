$('.colfruit a').on('click', function(){
	$(this).addClass('animated swing').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated swing');
		});
});
$('.colfruit a').on('mouseover', function(){
	$(this).addClass('animated swing').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated swing');
		});
});

$('#player01 .winning').on('click', function(){
	$('.win_player01').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated fadeIn');
		});
	$('.win_player01').attr('style', 'visibility: visible !important;');
});
$('#player02 .winning').on('click', function(){
	$('.win_player02').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated fadeIn');
		});
	$('.win_player02').attr('style', 'visibility: visible !important;');
});
$('.win_player01').on('click', function(){
	$(this).addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated fadeOut');
		});
	$(this).attr('style', 'visibility: hidden !important;');
});
$('.win_player02').on('click', function(){
	$(this).addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		function(){
			$(this).removeClass('animated fadeOut');
		});
	$(this).attr('style', 'visibility: hidden !important;');
});