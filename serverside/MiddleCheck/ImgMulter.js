import multer from "multer";
import fs from 'fs';

const myStorage = multer.diskStorage({
    destination:(req, file, cback)=>{
        const imgsDIR = '/products';
        if(!fs.existsSync(imgsDIR)) fs.mkdirSync(imgsDIR, {recursive: true});
        cback(null, imgsDIR);
    },
    filename:(req,file, cback)=>{
        const imgName = file.originalname + Date.now();
        cback(null, imgName);
    }
});
const fileTypes = (req, file, cback)=>{
    let types = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];
    if(types.includes(file.mimetype)){
        cback(null, true)
    } else {
        cback(new Error("You can upload images only!"), false)
    }
};

export const uploadStorage = multer({
    storage: myStorage,
    fileFilter: fileTypes,
    limits:{fileSize: 6 * 1024 * 1024}
});
