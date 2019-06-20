function isLogged(req, res, next){
  if(req.session.rol === 'admin'){
    next();
  }else{
    req.flash('error', 'No tienes permisos para añadir un viaje.')
    res.redirect('/');
  };
};

module.exports = {
  isLogged
};