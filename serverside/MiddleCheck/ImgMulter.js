// import multer from 'multer';
// import path from 'path';
// import { v4 as uuid} from 'uuid';

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, 'uploads/products');
//     },
//     filename: (req, file, cb)=>{
//         const uniName = uuid + path.extname(file.originalname);
//         cb(null, uniName);
//     }

// });

// const fileFltr = (req, file, cb)=>{
//     const allTyps = /jpeg|png|jpg|webp/;
//     let extName = allTyps.test(
//         path.extname(file.originalname).toLocaleLowerCase()
// );
//     let mimeType = allTyps.test(file.mimeType);
//     if(extName && mimeType){
//         cb(null, true)
//     } else {
//         cb(new Error("Only imgs are allowed"))
//     }
// }

// export const upload = multer({
//     storage, fileFilter:fileFltr, limits:{fileSize: 10 * 1024 * 1024}
// });
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFltr = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter: fileFltr,
  limits: { fileSize: 5 * 1024 * 1024 }
});
