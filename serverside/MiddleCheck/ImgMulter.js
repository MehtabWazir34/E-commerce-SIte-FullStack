import multer from 'multer';
import path from 'path';
import { v4 as uuid} from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/products');
    },
    filename: (req, file, cb)=>{
        const uniName = uuid + path.extname(file.originalname);
        cb(null, uniName);
    }

});

const fileFltr = (req, file, cb)=>{
    const allTyps = /jpeg|png|jpg|webp/;
    let extName = allTyps.test(
        path.extname(file.originalname).toLocaleLowerCase()
);
    let mimeType = allTyps.test(file.mimeType);
    if(extName && mimeType){
        cb(null, true)
    } else {
        cb(new Error("Only imgs are allowed"))
    }
}

export const upload = multer({
    storage, fileFilter:fileFltr, limits:{fileSize: 10 * 1024 * 1024}
});