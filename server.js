const express = require('express');

// DEFINE ROUTES:
const projectRoute = require('./routers/projectRouter');
const actionsRoute = require('./routers/actionRouter');

const server = express();
const PORT = 9000;


// MIDDLEWARE:
server.use(express.json());
server.use('/api/projects', projectRoute);
server.use('/api/actions', actionsRoute);


// ROUTE HANDLER TEST:
server.get('/', (req, res) => {
	res.send("All good from inside the server");
});


// LISTEN: 
server.listen(PORT, err => {
	console.log(`listening on port ${PORT}`)
})


// CRUD OPERATIONS 
// ---> GET (ALL)
server.get('/api/projects', (req, res) => {
	projectRoute
		.get()
		.then(project => {
			res.json(project)
		})
		.catch(error => {
			res.status(404)
			res.json("Project not found.")
		})
});

// ---> GET PROJECT (BY ID)
server.get('/api/projects/:id', (req, res) => {
	const { id } = req.params;
	projectRoute
		.get(id)
		.then(project => {
			res.json(project)
		})
		.catch(error => {
			res.status(404)
			res.json("Project not found.")
		})
});

// ---> GET ACTION (BY ID)
server.get('/api/actions/:id', (req, res) => {
	const id = req.params.id;
	actionsRoute
		.get(id)
		.then(actions => {
			res.json(actions)
		})
		.catch(error => {
			res.status(404)
			res.json("Action not found.")
		})
});

// ---> POST
server.post('/api/projects', (req, res) => {
	const project = req.body;
	console.log('Projects!');
	projectRoute
		.insert(project)
		.then(project => {
			console.log("inside the projects!")
			res.json(project)
		})
		.catch(err => {
			res
				.status(500)
				.json("Unexpected condition: no project created")
		})
});


// ---> PUT
server.put('/api/projects/:id', (req, res) => {
	const { id } =req.params;
	const project = req.body;
	projectRoute
		.update(id, project)
		.then(project => {
			res.json(project)
		})
		.catch(err => {
			res
				.status(500)
				.json("Unexpected condition: project not deleted")
		})
})


// ---> DELETE
server.delete('/api/projects/:id', (req, res) => {
	const { id } = req.params;
	projectRouter
		.remove(id)
		.then(count => {
			if(count) {
				res
					.status(201)
					.json("Item successfully deleted")
			}
			else {
				res
					.status(404)
					.json("invalid id")
			}
		})
		.catch(err => {
			res
				.status(500)
				.json("Unexpection condition: item no deleted")
		})
});