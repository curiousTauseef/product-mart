const app=require('./config/express');
const config=require('./config/config');

app.listen(config.port,()=>{
    console.log(`server listening on ${config.port} (${config.env})`);
});