const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('Hello World');
})
app.get('/users', (req,res)=>{
    res.json({
        users:[
            {name: 'John', age: 25},
            {name: 'Jane', age: 24},
            {name: 'Doe', age: 26}
        ]})
    })

app.listen(port, ()=> console.log(`Server is running on port ${port}`));