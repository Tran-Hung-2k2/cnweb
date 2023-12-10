import ffmpeg from 'fluent-ffmpeg';
import path from 'path';


const service = {
    // Hàm lấy thông tin của video sử dụng ffprobe
    get_video_info: async (inputFilePath) => {
        return new Promise((resolve, reject) => {
            // Sử dụng ffprobe để lấy thông tin của video từ đường dẫn inputFilePath
            ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
                if (err) {
                    reject(err); // Trả về lỗi nếu có vấn đề khi lấy thông tin
                } else {
                    // Trả về đối tượng chứa kích thước (MB) và thời lượng của video (minute)
                    resolve({
                        size: metadata.format.size / (1024 * 1024),
                        duration: metadata.format.duration,
                    });
                }
            });
        });
    },

    // Hàm nén video sử dụng fluent-ffmpeg
    compress_video: async (inputFilePath) => {
        return new Promise((resolve, reject) => {
            // Đặt đường dẫn cho file video nén
            const outputFilePath = path.join(__dirname, '..', 'temp', `${Date.now()}_compressed.mp4`);

            // Sử dụng fluent-ffmpeg để nén video
            ffmpeg()
                .input(inputFilePath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .outputOptions([
                    // Các tùy chọn nén video, có thể được thay đổi tùy vào yêu cầu
                    // '-preset ultrafast', // Sử dụng cài đặt nén nhanh nhất
                    '-preset veryfast', // Sử dụng cài đặt nén nhanh nhất
                    // '-vf scale=1920:1080', // Đặt độ phân giải là 1920x1080p (1080p)
                    // '-crf 23', // Đặt chất lượng video
                    // '-b:v 4000k', // Đặt bitrate video
                    '-threads 2',
                ])
                .output(outputFilePath)
                .on('end', () => {
                    resolve(outputFilePath); // Trả về đường dẫn của video đã nén khi quá trình kết thúc
                })
                .on('error', (err) => {
                    reject(err); // Trả về lỗi nếu có vấn đề khi nén video
                })
                .run();
        });
    },
};

export default service;
