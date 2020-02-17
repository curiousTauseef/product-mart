const express=require('express');
const path=require('path');
const port=process.env.PORT || 4260;
const app=express();

const destinationDir = path.join(__dirname,'../dist');
//hosting from dist folder
app.use(express.static(destinationDir));
console.log(`hosting from ${destinationDir}`);

//serving index.html
app.get('*',(req,res)=>{
    res.send(path.join(destinationDir,'index.html'))
});

//initialize app and run on port 
app.listen(port,()=>{
    console.log(`server running from port ${port}`)
});