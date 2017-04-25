var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./webConfig');

module.exports = function() {

	mongoose.connect(config.connectionString);

	var app = express();

	app.set('superNode-auth', config.configName);

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());

	app.post('/authenticate', function(req, res, next) {
		var Usuario = require('../api/models/usuario');
		
        var login = req.body.login;
        var senha = req.body.senha;
        
        Usuario.findOne({
           login: login
        }, function(error, usuario) {
            if(error)
                next(error);

            if(!usuario || usuario.senha != senha) {
                res.status(400).send();
                return;
            }
            
            var token = jwt.sign(usuario, app.get('superNode-auth'), { 
                        expiresIn: 1440
                    });

            res.json({
                success: true,
                message: 'Token criado!!!',
                toke: token
            });
        });

    });

	app.use(function(req, res, next) {

	    var token = req.body.token || req.query.token || req.headers['x-access-token'];

	    if(token) {
	        jwt.verify(token, app.get('superNode-auth'), function(err, decoded) {      
	            if (err) {
	                next(err);    
	            } else {
	            //se tudo correr bem, salver a requisição para o uso em outras rotas
	            req.decoded = decoded;    
	            next();
	            }
	        });

	        } else {
	        // se não tiver o token, retornar o erro 403
	        return res.status(403).send({ 
	            success: false, 
	            message: 'Não há token.' 
	        });       
	    }
	
	});


	load('controllers', {cwd:'api'})
	.into(app);

	return app;
};