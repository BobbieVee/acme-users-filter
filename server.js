const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const db = require('./db');
const path = require('path');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use(express.static(path.join(__dirname,'node_modules')));
const port = process.env.port || 3000;

app.get('/',(req, res, next)=> {
	db.model.User.findAll()
	.then((users)=>{
		console.log(users[0].get());
		res.render('index', {users: users})
	})
});

app.post('/regenerate', (req, res, next)=> {
	db.seed()
	.then(()=> res.redirect('/'))
	.catch(next);
});

db.seed()
.then(()=> app.listen(port, ()=> console.log(`listening on port ${port}`)))
.catch( e => console.log(e));

