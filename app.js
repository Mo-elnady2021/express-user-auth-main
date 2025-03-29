import express from 'express'
import bcrypt from 'bcrypt'


const app =express()
const port =3001;

//in-mermory
const users=[];

app.use(express.json())

///try&catch-error(Register)

app.post('/register', async (req,res) =>{
//try
try{
    const {email, password} =req.body 
//find-users
const findUser = users.find((data) => email ==data.email)
  if (findUser) {
    res.status(400).send(" wrong email & password !")
  }
  //Hash-Password-Using-(Bcrypt)
const hashedPassword = await bcrypt.hash(password, 10)
users.push({email,password:hashedPassword});
console.log(users)
res.status(201).send("Registered Successfully!")
}catch{
res.status(500).send({message: err.message });
}
})
//end-register

/// try&catch-(login)
app.post("/login", async (req,res) =>
{
 try{
 const { email,password } = req.body;
 //find-users
const findUser = users.find((data) => email ==data.email)
if (findUser) {
  res.status(400).send(" wrong email & password !")}
const passwordMatch = await bcrypt.compare(password,findUser.password)
if(passwordMatch)
    res.status(200).send("log in successfully");
else {res.status(400).send(" wrong email & password !")}
    
 } catch (err) {
    res.status(500).send({message: err.message });
 }
})
//end-login
app.listen(port, () => {
    console.log("Server is Started on Port 3001")
})
///finish-Register

