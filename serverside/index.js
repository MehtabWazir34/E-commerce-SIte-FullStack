import express from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js'
import { configDotenv } from 'dotenv';
import { userRoutes } from './Routes/userRoutes.js';
import { productRoutes } from './Routes/productRoutes.js';
import path from 'path'
import { adminRoutes } from './Routes/AdminRoutes.js';
import { log } from 'console';
configDotenv()
const App = express();
App.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
];

App.use(cors({
    origin(origin, callback) {

        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.log("Blocked origin:", origin);

        callback(new Error("Origin not allowed"));
    },
    credentials: true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}));
App.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
});

ConnectDb()


App.get('/', (req, res) => {
  res.send('Backend is running');
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