const express = require('express');
const app = express();
const cors = require('cors');
const zod = require("zod");

const port = 3000;

app.use(cors());
app.use(express.json());

const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string.min(3),
    username: zod.string().min(3),
    mobile: zod.number().min(10),
    country: zod.literal("India")
})


app.post("/register", (req, res)=> {
    const {email, password, username, mobile} = req.body;
    const response = userSchema.safeParse({email, password, username, mobile})
    if(!response.success){
        res.status(401).json({
            msg: "All the fields are Required"
        })
    }else{
        res.semd("Account Created Succesfully")
    }
})


app.get('/', (req,res)=>{
    res.send('Hello World');
})

app.listen(port, ()=> console.log(`Server is running on port ${port}`));