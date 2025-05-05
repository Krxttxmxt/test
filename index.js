import express from 'express' ;

const userList =[
    {
        username :"user1",
        password : "password1"
        
    },
    {
        username :"user2",
        password : "password2"
        
    }
    ,
    {
        username :"user3",
        password : "password3"
        
    }
]

const app = express();

app.use(express.json())
app.get("",(req , res )=>{
    res.send("hi2")
});


app.post("/login",(req , res )=>{
    const username= req.body.username ;// อ่านค่าจาก query
    const password= req.body.password;

    let user=null;
    for(let i = 0 ; i<userList.length ; i++){
        if(userList[i].username==username){
            user= userList[i];
            break;
        }
    }
    if(user == null){
        res.send("user not found");
        return;//ใส่ให้รุ้ว่าจบ
    }
    if(user.password!= password){
        res.send("password not found");

    }
    
    res.send("HEllO "+ username)
})






app.listen(3000,"127.0.0.1" , () =>{
    console.log("server is running on port 3000")
});