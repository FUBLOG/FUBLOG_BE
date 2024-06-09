const express = require("express");
const mongoose = require("mongoose");
const router = require('./src/routes/post');
const router2 = require('./src/routes/postTag')
const router3 = require('./src/routes/report')

const app = express();
app.use(express.json());
const port = 4000;
app.listen(port, () => {
  console.log(`This app is running at port: ${port}`);
});



app.use('/API/posts', router);
app.use('/API/postsTag', router2);
app.use('/API/report', router3);



mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://sa:vanmanh2003@vanmanh123.bvzo5cd.mongodb.net/?retryWrites=true&w=majority&appName=vanmanh123')
.then(()=> console.log('success'))

