const db = require('./db');
const Sequelize = db.Sequelize;
const faker = require('faker');

const User = db.define('user', {
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING,
	email: Sequelize.STRING,
	latitude: Sequelize.DECIMAL,
	longitude: Sequelize.DECIMAL

});
// let namesTable = [];

const sync = () => db.sync({force: true});
const seed = () => {
	return sync()
	.then(()=> {
		let userPromises = [];
		for (var i=0; i<40; i++){
			userPromises.push(User.create({
				firstName: faker.fake("{{name.firstName}}"),
			    lastName: faker.fake("{{name.firstName}}"), 
			    email: faker.fake("{{internet.email}}"),
			    latitude: faker.fake("{{address.latitude}}"),
			    longitude: faker.fake("{{address.longitude}}")
			})
			);

		};

		// let userPromises = [
		// 	User.create({
		// 		firstName: "Bobby",
		// 	    lastName: "AnderMark", 
		// 	    email: "BobbyAndy@gmail.com",
		// 	    latitude: 42.00000,
		// 	    longitude: 43.12345
		// 	}),
		// 	User.create({
		// 		firstName: "Robby",
		// 	    lastName: "AnderStein", 
		// 	    email: "RobbyA@gmail.com",
		// 	    latitude: 43.00000,
		// 	    longitude: 44.12345
		// 	}),
		// 	User.create({
		// 		firstName: "Sammy",
		// 	    lastName: "Boobawitz", 
		// 	    email: "theSammer@gmail.com",
		// 	    latitude: 22.00000,
		// 	    longitude: 23.12345
		// 	})
		// ];

		return Promise.all(userPromises)
	})
	.then((users)=> {
	
		return users;
	})	
	.catch((err)=> console.log(err));

};

const returnNamesTable = ()=> {
	let promises = [];
	for (var i=65; i<=90; i++){
		let letter = String.fromCharCode(i) + '%';
		promises.push(User.findAll({where: {lastName:
				{$like: letter}
			}
		}));
	} 
	return Promise.all(promises)
	.then((namesData)=> {
		let namesTable  = namesData.map((letterData, index)=> {
			let letter = String.fromCharCode(index+65);
			return {letter: letter, users: letterData};
		})
		return namesTable;
	})
	.catch((err)=> console.log(err));	
};

module.exports = {
	sync,
	seed,
	returnNamesTable, 
	model: {
		User
	}
};

