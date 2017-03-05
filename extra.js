console.log("users[] = ", users[0].lastName)
		let letter = 'A%';
		User.findAll({where: {lastName:
				{$like: letter}
			}
		})
		.then ((aNames)=> {
			let letter = "A";
			let obj = {} ;
			obj[letter] = aNames;
			namesTable.push(obj)
			// console.log('obj[letter] = ', obj)	 
		
		console.log('namesTable = ', namesTable)
		})