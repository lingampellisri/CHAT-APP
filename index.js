const express=require("express");
const http=require("http");
const { connect } = require("http2");
const path=require("path");

const {Server}=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new Server(server);

    io.on("connection",(socket)=>
    {
        console.log("A new user has Connected",socket.id);

        socket.on("user-message",(message)=>
        {
            console.log("A new user message ",message);
            io.emit("message",message);
        });
    });

app.use(express.static(path.resolve("./public")));


app.get("/",  (req,res)=>
{
    return res.sendFile("/public/index.html");
})
server.listen(9000,()=>
{

    console.log("Server listening at 9000 port");
});