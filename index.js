const Joi = require ('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'dolapo', email: 'dolapoogunsipe@gmail.com', country: 'nigeria'},
    {id: 2, name: 'dolapo', email: 'dolapoogunsipe@gmail.com', country: 'nigeria'},
    {id: 3, name: 'dolapo', email: 'dolapoogunsipe@gmail.com', country: 'nigeria'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/courses', (req,res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }
    const course = {
        id:courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

app.get('/api/courses/:id',(req,res) => {
    res.send(req.params.id);
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));