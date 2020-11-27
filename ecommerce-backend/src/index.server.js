const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');


// environment variable or you can say constants
env.config();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(
  'mongodb://'+process.env.MONGO_DB_USER+':'+process.env.MONGO_DB_PASSWORD+'@cluster0-shard-00-00.p0gql.mongodb.net:27017,cluster0-shard-00-01.p0gql.mongodb.net:27017,cluster0-shard-00-02.p0gql.mongodb.net:27017/'+process.env.MONGO_DB_DATABASE+'?ssl=true&replicaSet=atlas-rf5v87-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
  }
).then(()=> {
  console.log('Database connected');
}).catch( (err) => console.error(err));

app.use(bodyParser());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`)
});