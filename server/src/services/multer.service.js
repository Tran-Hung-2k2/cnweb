import multer from 'multer';
import path from 'path';

const upload = multer({ dest: path.join(__dirname, '../temp/') });

export default upload;
