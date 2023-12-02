import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
    const [content, setContent] = useState('');
    const [submittedContent, setSubmittedContent] = useState('');

    const handleQuillChange = (value) => {
        setContent(value);
    };

    const handleSubmit = () => {
        console.log('Submitted Content:', content);
        setSubmittedContent(content); // Lưu giá trị đã submit vào biến state mới
    };

    return (
        <div>
            <ReactQuill
                value={content}
                onChange={handleQuillChange}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // định dạng văn bản
                        ['blockquote', 'code-block'], // định dạng đoạn và mã nguồn
                        [{ list: 'ordered' }, { list: 'bullet' }], // danh sách có thứ tự và không thứ tự
                        [{ script: 'sub' }, { script: 'super' }], // chữ dưới và chữ trên
                        [{ indent: '-1' }, { indent: '+1' }], // thụt lề
                        [{ direction: 'rtl' }], // hướng văn bản
                        [{ size: ['small', false, 'large', 'huge'] }], // kích thước văn bản
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // tiêu đề
                        [{ color: [] }, { background: [] }], // màu chữ và nền
                        [{ font: [] }], // kiểu chữ
                        ['link', 'image', 'video'], // liên kết, hình ảnh, video
                        ['clean'], // xóa định dạng
                    ],
                }}
                formats={[
                    'bold',
                    'italic',
                    'underline',
                    'strike', // định dạng văn bản
                    'blockquote',
                    'code-block', // định dạng đoạn và mã nguồn
                    'list',
                    'bullet', // danh sách có thứ tự và không thứ tự
                    'script',
                    'script', // chữ dưới và chữ trên
                    'indent',
                    'indent', // thụt lề
                    'direction', // hướng văn bản
                    'size', // kích thước văn bản
                    'header', // tiêu đề
                    'color',
                    'background', // màu chữ và nền
                    'font', // kiểu chữ
                    'link',
                    'image',
                    'video', // liên kết, hình ảnh, video
                    'clean', // xóa định dạng
                ]}
            />
            <button onClick={handleSubmit}>Submit</button>

            {/* Hiển thị nội dung đã submit lên màn hình */}
            {submittedContent && (
                <div>
                    <h2>Submitted Content</h2>
                    <div dangerouslySetInnerHTML={{ __html: submittedContent }} />
                </div>
            )}
        </div>
    );
};

export default TextEditor;
