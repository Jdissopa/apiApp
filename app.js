var express = require('express')
var bodyParser = require('body-parser')
// var url = require('url')
// var url_parts = url.parse(request.url, true)
// var query = url_parts.query

var app = express()

app.get('/', function (req, res) {
  res.json('Hello World!')
})


var fib3 = (function(){
    var memo = {};
    return function(n) {
        if (memo[n]) {return memo[n];}
        return memo[n] = (n <= 2) ? 1 : fib3(n-2) + fib3(n-1);
    };
})();
app.get('/api/Fibonacci', function (req, res) {
	var num = req.query.n
	if(isNaN(num))
	{
		res.status(400)
		res.json({"message" : "The request is invalid."})
	}
	else if (num > 92 || num < -92)
	{
		res.status(400)
		res.json('no content')
	}
	else
	{
		if (num == 0)
			res.json(0)
		else if (num * -1 > 0)
		{
			var x = fib3(num*-1)
			if ((num * -1) % 2 == 0)
				x = x * -1
			res.json(x)
		} 
		else
			res.json(fib3(num))
	}
  // res.json('n=' + req.query.n + ' ' + 5*req.query.n)
})

function reverseString(str) {
    return str.split("").reverse().join("");
}
app.get('/api/ReverseWords', function (req, res) {
	var str = req.query.sentence
	res.json(reverseString(str))
})	

app.get('/api/Token', function (req, res) {
	res.json('a5773245-d9e0-4822-8d32-5c25df608400')
})

function getTriangleType(a,b,c) {
	// var sideAsqrd = a*a
	// var sideBsqrd = b*b
	// var sideCsqrd = c*c

	// var A2B2 = sideAsqrd + sideBsqrd
	// var A2C2 = sideAsqrd + sideCsqrd
	// var B2C2 = sideBsqrd + sideCsqrd

	// if (a <= 0 || b <= 0 || c <= 0)
	// 	return "Error"

	// var isTriangle = ((a+b)>c) && ((a+c)>b) && ((b+c)>a)  // gives me a true or false
	// if (isTriangle || (sideAsqrd == B2C2) || (sideBsqrd == A2C2) || (sideCsqrd == A2B2))
	// {
	// 	return (a === b && b === c) && 'Equilateral' ||
	// 	  (a === b || a === c || b === c) && 'Isosceles' ||
	// 	  'Scalene';
	// }
	// else
	// 	return "Error"

	var longestSide = a
	if (b > longestSide) longestSide = b
	if (c > longestSide) longestSide = c

	if (longestSide < a + b + c - longestSide) {
		return (a === b && b === c) && 'Equilateral' ||
		  (a === b || a === c || b === c) && 'Isosceles' ||
		  'Scalene';
	}
	else
		return "Error"

  
}
app.get('/api/TriangleType', function (req, res) {
	var a = req.query.a
	var b = req.query.b
	var c = req.query.c

	if (isNaN(a) || isNaN(b) || isNaN(c)) {
		res.status(400)
		res.json({"message" : "The request is invalid."})
	}
	else
		res.json(getTriangleType(a,b,c))
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

