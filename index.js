
const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const fetch =require("node-fetch");
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

  





//Get all Users Routes
app.get("/", cors(), async(req,res)=>{

    try{
    const response = await fetch('https://coding-challenge-api.bounceinsights.com/users', {headers:{'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRJZCI6IlNweTBLUWFqcjliWWM0c1pvRUt6IiwiaWF0IjoxNjMzNTE4MzgwfQ.sYoCK4L_GpjBU2DZtQA1aOHbyWWQl398TnQZau4TSO8'}})
    const data = await response.json();
     return res.status(200).json(data);

    
    
    }
    catch(error){
       return res.status(500).json("Check the path");
    }
})



//POST User To Database Route
app.post("/create",cors(),async (req, res) => {
	const {name,dateOfBirth,gender,registeredAt,surveys,email } = req.body
    try{
    
        await fetch('https://coding-challenge-api.bounceinsights.com/users', {
         headers: {'Content-Type':'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRJZCI6IlNweTBLUWFqcjliWWM0c1pvRUt6IiwiaWF0IjoxNjMzNTE4MzgwfQ.sYoCK4L_GpjBU2DZtQA1aOHbyWWQl398TnQZau4TSO8'},
         method: 'POST',
         body: JSON.stringify({name:name,
            dateOfBirth:dateOfBirth,
            gender:gender,
            registeredAt:registeredAt,
            surveys:surveys,
            email:email    
        }),
        
    }).then(res=>{res.json()}).catch((err=>res.send(400).json("Some is Wrong")));
    
      return res.sendStatus(201).json("Successfully created new user");
}

catch(err){
    return res.sendStatus(500).json(err);
}
});

// USER DELETE ROUTES
app.post('/:id',cors(),async(req,res)=>{
  try{  
  const params=req.params.id;
  console.log(params);

  
  await fetch(`https://coding-challenge-api.bounceinsights.com/users/${params}`, {  method: 'DELETE', headers:{'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRJZCI6IlNweTBLUWFqcjliWWM0c1pvRUt6IiwiaWF0IjoxNjMzNTE4MzgwfQ.sYoCK4L_GpjBU2DZtQA1aOHbyWWQl398TnQZau4TSO8'}})
  return res.status(200).json("Successfully deleted");
  }
  catch(err){
     return res.send(500).json("Error msg :" + err);
  }
});

//UPDATE USER ROUTES
app.post('/user/:id',cors(),async(req,res)=>{
    const params=req.params.id;
    console.log(params);
    const {name,dateOfBirth,gender,registeredAt,surveys,email } = req.body
    
    try{
    const response = await fetch(`https://coding-challenge-api.bounceinsights.com/users/${params}`, {  method: 'PUT', body: JSON.stringify({name:name,
    dateOfBirth:dateOfBirth,
    gender:gender,
    registeredAt:registeredAt,
    surveys:surveys,
    email:email    
}),headers:{'Content-Type':'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRJZCI6IlNweTBLUWFqcjliWWM0c1pvRUt6IiwiaWF0IjoxNjMzNTE4MzgwfQ.sYoCK4L_GpjBU2DZtQA1aOHbyWWQl398TnQZau4TSO8'}})
    return res.status(200).json("Successfully updated"+response);
    }
    catch(err){
       return res.send(500).json("Error msg :" + err);
    }
  });
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});