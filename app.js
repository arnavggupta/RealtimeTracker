const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


io.on("connection",(socket)=>{
  console.log("New client connected",socket.id);

  socket.on("sendLocation",(data)=>{
    io.emit("reciveLocation",{id:socket.id,...data});

  })
})


app.get("/", (req, res) => {
    // res.send("Hello World");
    res.render("index");
});

server.listen(port,()=>{
    console.log(`Server is started at ${port}`)
})