define(["zepto"],function(zepto) {
    var test = function() {
        console.log(99659);
        $(".title").css("color","red");
    };

    return {
        test : test
    }
});
