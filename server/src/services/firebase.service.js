import path from 'path';
import fs from 'fs';
import ffmpeg_service from './ffmpeg.service';
const firebase = require('firebase/app');
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../config/firebase.config.json';

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const firebase_service = {
    // Hàm upload video lên Firebase Storage
    upload_video: async (filePath) => {
        // Lấy thông tin của video sử dụng ffmpeg_service
        const videoInfo = await ffmpeg_service.get_video_info(filePath);

        console.log('Kích thước:', videoInfo.size, 'MB');
        console.log('Thời lượng:', videoInfo.duration, 'minutes');

        let compressedFilePath;
        // Kiểm tra tỷ lệ kích thước và thời lượng để quyết định có cần nén video trước khi tải lên hay không
        if (videoInfo.size / videoInfo.duration > 2) {
            console.log('Nén video trước khi tải lên');
            compressedFilePath = await ffmpeg_service.compress_video(filePath);
        } else {
            compressedFilePath = filePath;
        }

        // Đặt tên mới cho file trên Firebase Storage
        const newFilename = `${Date.now()}-${path.basename(filePath)}`;
        const storageRef = ref(storage, newFilename);
        const metadata = { contentType: 'video/mp4' };

        console.log('Bắt đầu tải lên Firebase Storage');
        // Đọc nội dung của file đã nén và tải lên Firebase Storage
        const fileBuffer = fs.readFileSync(compressedFilePath);
        await uploadBytes(storageRef, fileBuffer, metadata);

        console.log('Tải lên thành công');

        // Xóa tất cả các file trong thư mục temp sau khi tải lên
        const dir = path.join(__dirname, '..', 'temp');
        fs.readdirSync(dir).forEach((f) => fs.rmSync(`${dir}/${f}`));

        // Trả về URL tải xuống của file đã tải lên
        return getDownloadURL(storageRef);
    },

    delete_file: async (filename) => {
        try {
            const StorageRef = ref(storage, filename);
            await deleteObject(StorageRef);
            console.log(`File ${filename} deleted from Firebase Storage`);
            return true; // Nếu xóa thành công, trả về true
        } catch (error) {
            throw new Error('Delete Error'); // Nếu có lỗi, ném một lỗi để xử lý ở nơi gọi hàm
        }
    },
};

export default firebase_service;
