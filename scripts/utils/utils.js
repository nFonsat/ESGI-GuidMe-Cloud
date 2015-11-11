exports.guuid = function () {
	function s4() {
        var date = new Date();
	    return Math.floor((1 + Math.random()) * 0x10000 * date.getTime())
	      .toString(4)
	      .substring(1);
	}
	
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
};

exports.listRoutes = function () {
	function space(x) {
	    var res = '';
	    while(x--) res += ' ';
	    return res;
	}

	for (var i = 0; i < arguments.length;  i++) {
        if(arguments[i].stack instanceof Array){
            console.log('');
            arguments[i].stack.forEach(function(a){
                var route = a.route;
                if(route){
                    route.stack.forEach(function(r){
                        var method = r.method.toUpperCase();
                        console.log(method,space(8 - method.length),route.path);
                    })
                }
            });
            console.log('');
        }
    }
};