
const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const fetch =require("node-fetch");


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


//Get all Users
app.get("/", async(req,res)=>{

    try{
    const response = await fetch('https://coding-challenge-api.bounceinsights.com/users', {headers:{'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRJZCI6IlNweTBLUWFqcjliWWM0c1pvRUt6IiwiaWF0IjoxNjMzNTE4MzgwfQ.sYoCK4L_GpjBU2DZtQA1aOHbyWWQl398TnQZau4TSO8'}})
    const data = await response.json();
    res.status(200).json(data);
    console.log(data);
    }
    catch(error){
        res.status(500).json("Check the path");
    }
})

app.post("/post_name", async (req, res) => {
	let { name } = req.body
	console.log(name)
})
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})