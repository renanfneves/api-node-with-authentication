var Usuario = require('../models/usuario');

module.exports = function(app){
	app.post('/usuario', function(req, res, next){
		var usuario = new Usuario();	

		usuario.nome = req.body.nome;
    	usuario.login = req.body.login;
        usuario.senha = req.body.senha;

        usuario.save(function(err) {
            if(err) {
                res.status(500).send({ message: JSON.stringify(err)});
                return;
            }
 
            res.status(201).send();
        });

	});

	app.get('/usuarios', function(req, res) {
        
        Usuario.find(function(err, usuarios) {
            if(err) {
                    res.status(500).send({ message: JSON.stringify(err)});
                    return;
                }

            if(usuarios.length == 0){
            	res.status(204).send();
            	return;
            }
 
            res.json(usuarios);
        });
    });


    app.get('/usuario/:usuario_id', function(req, res, next) {
 		var id = req.params.usuario_id;
        
        Usuario.findById(id, function(error, usuario) {
            if(error) {
                res.status(500).send({ message: JSON.stringify(err)});
                return;
            }

            if(!usuario){
            	res.status(204).send();
 				return;
            }
 				
            res.json(usuario);
        });
    });

     app.put('/usuario/:usuario_id', function(req, res, next) {
 
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error) {
                res.status(500).send({ message: JSON.stringify(err)});
                return;
            }
 
            usuario.nome = req.body.nome;
            usuario.login = req.body.login;
            usuario.senha = req.body.senha;
 
            usuario.save(function(error) {
                if(error)
                    next(error);
 
                res.status(200).send();
            });
        });
    });

     app.delete('/usuario/:usuario_id', function(req, res, next) {
 
        Usuario.remove({
        _id: req.params.usuario_id
        }, function(error) {
            if(error) {
                res.status(500).send({ message: JSON.stringify(err)});
                return;
            }
 
            res.status(200).send();
        });
    });

}