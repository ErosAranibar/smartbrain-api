const handleSignin = (req,res,db,bcrypt)=>{
const {email,password} = req.body;
	// if (req.body.email===database.user[0].email && 
	// 	req.body.password===database.user[0].password)
	// {
	// 	res.json(database.user[0]);
	// } else {
	// 	res.status(400).json("error logging in");
	// }
	//Filtra por email y hash en login lo que se ingrese
	//port el endpoint singin y lo imprime
	if (!email || !password) {
		return res.status(400).json('incorrect form submision');
	}
	db.select('email','hash').from('login')
	.where('email','=', email)
	.then(data=>{
		const isValid=bcrypt.compareSync(password, data[0].hash); // true
		if(isValid){ //Always make sure to return when you filter
		 return db.select('*').from('users')
		 .where('email', '=', email)
		 .then(user=>{
		 	console.log(user[0])
		 	res.json(user[0])
		 })
		 .catch(err=>res.status(400).json('unable to get user'))
		}  else {
			res.status(400).json('wrong credentials')
		}

	})
	.catch(err=> res.status(400).json('Wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
};