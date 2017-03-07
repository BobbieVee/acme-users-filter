const app = require('express').Router();
const db = require('./db');


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

module.exports = app;