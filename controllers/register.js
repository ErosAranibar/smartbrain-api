const handleRegister = (req,res,db, bcrypt)=>{
	const { email, password, name} = req.body;
	//validation
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submision');
	}
	const hash = bcrypt.hashSync(password);
	//After hashing the password we need to update the 2
	//databases users and login.
		db.transaction(trx=>{
		// Here the transactio to login database is made
			trx.insert({
				hash:hash,
				email:email
			})
			.into('login')
			.returning('email')
			.then(loginemail=>{
			// Here the transactio to users database is made
				return trx('users')
					.returning('*')
					.insert({
					email:loginemail[0].email,
					name:name,
					joined: new Date()
					})
					 .then(user=>{
					res.json(user[0]);
					 })
			})
			//Here you commit to elaborate the block code
			//which was written above.
			.then(trx.commit)
			.catch(trx.rollback)
		})
	// database.user.push(
	// {
	// 	id:'125',
	// 	name:name,
	// 	email:email,
	// 	entries:0,
	// 	joined: new Date()
	// } )
// Adding a new user to the database using knex
	
	 .catch(err=>res.status(400).json('unable to register'))
	}

	module.exports ={
		handleRegister: handleRegister
	};