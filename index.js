import express from 'express';
import jwt from "jsonwebtoken";

const userList = [
    {
        username: "user1",
        password: "password1"

    },
    {
        username: "user2",
        password: "password2"

    }
    ,
    {
        username: "user3",
        password: "password3"

    }
]

const secret ="126589fdhth5r8658s5he8trehd548sdfgh"

const genToken = (payload)=>{

   const token = jwt.sign(payload,secret,{expiresIn : "1h"})
   return token;
}

const verifyToken =(token)=>{
    try {
       const payload = jwt.verify(token , secret)
       return payload;
    } catch (error) {
        return null ; 
    }
}




const app = express();

app.use(express.json())

//middlewares
const checkLogin = (req, res, next) => {
    let token = req.headers.authorization || '';

    token = token.replace("Bearer ", "");

    //console.log("token : " + token);
    const user = verifyToken(token);
    if(user == null ){
        res.sendStatus(401)
        return;


    }
    //console.log("user :" + user)
    res.locals.currentUser = user; 
    next();
}



app.get("", (req, res) => {
    res.send("hi2")
});


app.post("/login", (req, res) => {
    const username = req.body.username;// อ่านค่าจาก query
    const password = req.body.password;

    let user = null;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username == username) {
            user = userList[i];
            break;
        }
    }

    if (user == null || user.password != password) {
        const payload = {
            status: "fail",
            data: {
                message: "invalid stupid ",
            }
        }
        res.status(400).json(payload);//400=โง่ใส่ผิด
        return;//ใส่ให้รุ้ว่าจบ
    }

    //const token = "bitch"
    const accessToken= genToken({username: user.username});
    const payload = {
        status: "success",
        data: {
            //user : {username: user.username} ,
            access: accessToken,
        }
    }
    res.json(payload);
})

// Get User data
app.get("/user/:userId",checkLogin, (req, res) => {

    //check login
    const userId = req.params.userId;

    const user = userList[userId];
    if (user == null) {
        res.sendStatus(404);
        return;
    }
    const payload = {
        status: "success",
        data: { user, user }
    }
    
    res.json(payload);
});



app.listen(3000, "127.0.0.1", () => {
    console.log("server is running on port 3000")
});