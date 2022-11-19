const express = require('express');
const app = express();
const server = require('http').Server(app);
const io =require('socket.io')(server)
const {v4:uuidv4} = require('uuid');
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    // generate and redirect to uuid
    res.redirect(`/${uuidv4()}`);
})


app.get('/:room',(req,res)=>{
    // localhost/param we are giving here nod
    res.render('room',{roomId:req.params.room})
})
// you will join room
io.on('connection',socket=>{
   socket.on('join-room',(roomId)=>{
    console.log('joined room')
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected')
   })
})




server.listen(3000)