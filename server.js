
var app = require('./config/express')();


app.get('/', function(req, res, next){
	res.json({message: 'Tudo certo', port: 'Api rodando na porta 51001'});


});

app.listen(3000, function(){
	console.log('Api rodando na porta 3000');

});