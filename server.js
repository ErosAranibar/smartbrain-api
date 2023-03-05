const express= require('express');
const bodyParser= require('body-parser') 
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex= require('knex');

const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile= require ('./controllers/profile');
const image= require ('./controllers/image');

//Making the connection with PostgreSQL Data Server 
const db= knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});
//Connecting the server with the database


const app=express();

app.use(bodyParser.json());
app.use(cors());

 

const database={
	user: [
	{
		id:'123',
		name:'John',
		email:'john@gmail.com',
		password:'cookies',
		entries: 0,
		joined: new Date()
	},

	{
		id:'124',
		name:'Sally',
		email:'sally@gmail.com',
		password:'bananas',
		entries: 0,
		joined: new Date()
	}

	]
}


app.get('/', (req, res)=> {
	res.json(database.user);
})


app.post('/register', (req, res)=> { register.handleRegister(req,res,db,bcrypt)})

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)
})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})




app.listen(3001, ()=>{
	console.log('App is running on port 3001');
})

