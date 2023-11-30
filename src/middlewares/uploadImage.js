import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/public/img/uploadProperties/'),
    },
    filename:function(req, file, cb){
        cb(null,generateToken()+path.extname(
            file.originalnam
        ))
    }
})

const upload = multer ({
    storage
})

export default upload//revisar controller
//Revisar y editar 