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
	.then((result)=> console.log('Synched and seeded'))
	.catch((err)=> console.log(err));

};

module.exports = {
	sync,
	seed, 
	model: {
		User
	}
};

