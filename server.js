const app = require ('./src/app');
const {app:{port}} = require('./src/config/config.mongodb')
const server = app.listen(port,() => {
    console.log("start");
});

process.on('SIGINT',()=>{
    server.close(()=>{
        console.log("stop");

    });
});