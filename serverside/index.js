import express from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js'
import { configDotenv } from 'dotenv';
import { userRoutes } from './Routes/userRoutes.js';
import { productRoutes } from './Routes/productRoutes.js';
import path from 'path'
import { adminRoutes } from './Routes/AdminRoutes.js';
// import { orderRoutes } from './Routes/orderRoutes.js';
configDotenv()
const App = express();
App.use(express.json());
App.options('/{*path}', cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
App.use(cors({
    origin :'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // add OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,   // ✅ handles OPTIONS automatically
    optionsSuccessStatus: 204
}));
App.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
});

ConnectDb()


App.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

App.use("/user", userRoutes);
App.use('/products', productRoutes);
App.use('/admin', adminRoutes);
App.use('/uploads', express.static(path.join(process.cwd(),"uploads")))

// Add this AFTER all your routes, before App.listen
App.use((err, req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(500).json({ Msg: 'Server error', error: err.message });
});
const port = process.env.MYAPP_PORT_NO || 3400
// if(process.env.NODE_ENV === 'development'){
    App.listen(port, ()=>{
    console.log(
        `Its running! localhost:${port}`
    );
    })
// }
export default App