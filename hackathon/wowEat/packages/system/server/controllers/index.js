'use strict';

var mean = require('meanio');

var food_pool=[{username:'oldman',food:'fish'}];

function pick_food(req){
	var data;
	do{
		data=food_pool[Math.floor(Math.random()*food_pool.length)];
	}while(req.body.no_eat.toString() === data.food.toString());
	
	return data;
}

function insert_food_pool(req){
	var item = {'username':req.body.username,'food':req.body.share_eat};
	var i=0;

	do{
		var data=food_pool[i];
		//console.log("ddddd",data.food);
		if(data.username===item.username){
			console.log(data.username);
			delete food_pool[i];

			food_pool.push(item);

			console.log('Pool:',food_pool);
			return ;
		}
		i=i+1;
	}while(i<food_pool.length);

	food_pool.push(item);
	console.log('Pool:',food_pool);
} 

exports.backend = function(req, res){
	console.log('!@#');
	if(req.body.share_eat)
		insert_food_pool(req);

	var ret=pick_food(req);

	console.log('PICK:',ret);
	res.send(ret); 
};

exports.render = function(req, res) {

  var modules = [];
  // Preparing angular modules list with dependencies
  for (var name in mean.modules) {
    modules.push({
      name: name,
      module: 'mean.' + name,
      angularDependencies: mean.modules[name].angularDependencies
    });
  }

  function isAdmin() {
    return req.user && req.user.roles.indexOf('admin') !== -1;
  }

  // Send some basic starting info to the view
  res.render('index', {
    user: req.user ? {
      name: req.user.name,
      _id: req.user._id,
      username: req.user.username,
      roles: req.user.roles
    } : {},
    modules: modules,
    isAdmin: isAdmin,
    adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
  });
};
