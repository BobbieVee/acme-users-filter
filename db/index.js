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
		return Promise.all(userPromises)
	})
	.then((users)=> {
		let promises = [];
		for (var i=65; i<=90; i++){
			let letter = String.fromCharCode(i) + '%';
			promises.push(User.findAll({where: {lastName:
					{$like: letter}
				}
			}))
		}
		return Promise.all(promises)
	})	
	.then((namesTable)=> {
		console.log('namesTable	 = ', namesTable[0])
	} )




		// console.log("users[] = ", users[0].lastName)
		// let letter = 'A%';
		// User.findAll({where: {lastName:
		// 		{$like: letter}
		// 	}
		// })
		// .then ((aNames)=> {
		// 	let letter = "A";
		// 	let obj = {} ;
		// 	obj[letter] = aNames;
		// 	namesTable.push(obj)
		// 	// console.log('obj[letter] = ', obj)	 
		
		// console.log('namesTable = ', namesTable)
		// })

	
	.catch((err)=> console.log(err));

};

module.exports = {
	sync,
	seed, 
	model: {
		User
	}
};

