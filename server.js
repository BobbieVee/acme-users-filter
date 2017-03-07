const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const db = require('./db');
const path = require('path');
const routes =  require("./routes.js")

const port = process.env.PORT || 3000;
const noCache = process.env.NOCACHE || false;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use(express.static(path.join(__dirname,'node_modules')));

app.use('/', routes)

db.seed()
.then(()=> app.listen(port, ()=> console.log(`listening on port ${port}\n noCache = ${noCache}`)))
.catch( e => console.log(e));

