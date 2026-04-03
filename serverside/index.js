import express from 'express'
import cors from 'cors'
// import { ConnectDb } from './DB/ConnectDB.js'
import { configDotenv } from 'dotenv';
import { userRoutes } from './Routes/userRoutes.js';
import { productRoutes } from './Routes/productRoutes.js';
import path from 'path'
import { adminRoutes } from './Routes/AdminRoutes.js';
// import { orderRoutes } from './Routes/orderRoutes.js';
configDotenv()
const App = express();
App.use(express.json());
App.use(cors({
    origin : process.env.FRONTEND_urL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

// ConnectDb()
import { MongoClient, ServerApiVersion } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mehtabwazir34_db_user:<db_password>@cluster0-js.adtfkoc.mongodb.net/?appName=Cluster0-JS";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

App.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

App.use("/user", userRoutes);
App.use('/products', productRoutes);
App.use('/admin', adminRoutes);
App.use('/uploads', express.static(path.join(process.cwd(),"uploads")))
const port = process.env.MYAPP_PORT_NO || 3400
// if(process.env.NODE_ENV === 'development'){
    App.listen(port, ()=>{
    console.log(
        `Its running! localhost:${port}`
    );
    })
// }
export default App