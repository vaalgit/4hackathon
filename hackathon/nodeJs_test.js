var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public',express.static(__dirname + '/public'));

app.use('/index',function(req,res){
    res.render('index.ejs');
});

app.get('/form',function(req,res){
    res.render('form.ejs');
    
});

app.get('/form',function(req,res){
    res.render('form.ejs');
});

app.get('/',function(req,res){
	res.send('Hello, world');

});


app.listen(3000);


