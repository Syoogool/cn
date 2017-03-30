$(function(){
	$(".android-hover").hover(function(){
		$(".android-download").show(300)
	}, function(){
		//  hide 还有一个可以执行动画的回调函数参数
		$(".android-download").hide(300)
	});
	$(".ios-hover").hover(function(){
		$(".ios-download").show(300)
	}, function(){
		$(".ios-download").hide(300)
	});


    // 图片轮播效果

	var index = 0;
	var img = $(".img-box img");
	var len = img.length;

	function showPic(n) {
		img.eq(n).fadeIn(200).siblings("img").fadeOut(200);
	}

	setInterval(function(){
		showPic(index);
		index++;
		if (index == len) {
			index == 0
		}
	}, 1000)
	
})