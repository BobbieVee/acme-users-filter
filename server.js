const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const db = require('./db');
const path = require('path');

const port = process.env.PORT || 3000;
const noCache = process.env.NOCACHE || false;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use(express.static(path.join(__dirname,'node_modules')));


app.get('/',(req, res, next)=> {
	db.returnNamesTable()
	// Index "26" of table contains All users;
	.then((namesTable)=> {
		res.render('index', {users: namesTable[26].users, namesTable: namesTable})
	})	
	.catch(next);	
	
});
app.get('/users/filter/:letter', (req, res, next)=> {
	db.returnNamesTable(req.params.letter)
	.then((namesTable)=> {
		res.render('index', {namesTable: namesTable, users: namesTable[req.params.letter.charCodeAt(0)-65].users, active: req.params.letter });
	})
});

app.post('/regenerate', (req, res, next)=> {
	db.seed()
	.then(()=> res.redirect('/'))
	.catch(next);
});

db.seed()
.then(()=> app.listen(port, ()=> console.log(`listening on port ${port}\n noCache = ${noCache}`)))
.catch( e => console.log(e));

