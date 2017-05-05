const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UsuarioSchema = new Schema({
    nome: String,
    login: String,
    senha: String
});

UsuarioSchema.methods.toJSON = function() {
  var usuario = this.toObject();
  delete usuario._id;
  delete usuario.senha;
  delete usuario.__v;
  
  return usuario;
}
 
module.exports = mongoose.model('Usuario', UsuarioSchema);