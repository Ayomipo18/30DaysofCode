const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('./models/user');
const Todo = require('./models/todo');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
	const {name, email, password} = req.body;
	//checks if a user with the email address already exists
	const userExists = await users.findOne({ email });
	if(userExists) return res.status(403).json({error : 'Email is already registered'});
    if(!name)return res.status(403).json({error: "Please input name"});

	const saltRounds = 10;
	await bcrypt.hash(password, saltRounds, (err, hash) =>{
		if(err) return err;
            const newUser = new users({name, email, hash});
            //add newUser to all users database
            newUser.save();
            return res.json({
                success: true,
                message: "User signed up successfully"})
        });
};

exports.login = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;

    let user;
    //check if any user has that email
    user = await users.findOne({email});
	if(!user) return res.status(403).json({error : "User does not exist"});
        //if user exists, compare password
	await bcrypt.compare(password, user.hash, (err, result) =>{
		if(err) return err;
		//if password doesnt match, return error
		if(result === false) return res.status(403).json({error : "Incorrect login credentials"});
		// generate a token with email and secret
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });//incase of signout
        // return response with username, email and token
        const { _id} = user;
        return res.json({ token, user: { _id, email} });
	})
};

exports.userById = (req, res, next, id) => {
	users.findById(id)
		.exec((err, user) => {
			if(err || !user){
				return res.status(400).json({
					error: 'user not found'
				});
			}
			req.profile = user;
			next();
		});
};

exports.todoById = (req, res, next, id) => {
    Todo.findById(id)
        .populate('createdBy', '_id name')
        .select('_id todo done')
        .exec((err, todo) => {
            if (err || !todo) {
                return res.status(400).json({
                    error: err
                });
            }
            req.todo = todo;
            next();
        });
};

exports.auth = async (req, res, next) => {
	const user = req.profile;
	//get token
	const token = await req.headers.authorization.split(' ')[1];
	//if no token is sent, return error message
	if(!token) return res.status(403).json({"error" : "Not allowed"});
	//verify token
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
	//check if email is equal to the decoded token
	if(user.email !== decoded.email) return res.status(403).json({"error" : "Not allowed"});
	next();
};

exports.createTodo = async (req, res) => {
	const {_id} = req.profile;
	await users.findById({_id}, err =>{
		if(err) return res.status(403).json({error: "User does not exist"});
	});
	const newTodo = await new Todo(req.body);
	newTodo.createdBy = req.profile;
	await newTodo.save((err, result) => {
			if(err) return res.status(403).json({error: "could not save Todo"});
			result.createdBy.hash = undefined;
			result.createdBy.name = undefined;
			return res.json({result});
	});
}

exports.TodosByUser = (req, res) => {
	Todo.find({ createdBy: req.profile._id })
		.populate('createdBy', '_id name')
		.select('_id todo done')
		.exec((err, Todos) => {
			if(err) return res.status(403).json({error: err});
			res.json(Todos);
		})
};

exports.updateTodo = async (req, res) => {
	const {_id} = req.todo;
	//Get email of user to update
    const updatedTodo = await Todo.findOneAndUpdate({_id}, req.body, {new: true});
    if(!updatedTodo) return res.json({ error : "Todo not found"});
    return res.json(updatedTodo);
};

exports.deleteTodo = async (req, res) => {
	const {_id} = req.todo;
	const todo = await Todo.findOneAndDelete({_id});
	if(!todo) return res.json({ error : "Todo not found"});
    return res.json({message : "Todo deleted successfully"});
};

exports.deleteUser = async (req, res) => {
    const {_id} = req.profile;
    //Get id of user to delete from req.profile
    const user = await users.findOneAndDelete({_id});
    if(!user) return res.json({ error : "User not found"});
    return res.json({message : "User deleted successfully"});
};
