import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: '',
    });

    const [isModalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu đặt mua/đăng ký lên server hoặc xử lý tại đây
        setModalOpen(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Họ và tên"
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="course"
                    value={formData.course}
                    placeholder="Khóa học"
                    onChange={handleChange}
                />
                <Button type="submit">Đặt mua/Đăng ký</Button>
            </form>

            {isModalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    {/* Nội dung modal, có thể là thông báo đặt mua/đăng ký thành công */}
                    <p>Đặt mua/Đăng ký thành công!</p>
                </Modal>
            )}
        </div>
    );
};

export default Form;

const Input = ({ type, name, value, placeholder, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};


const Button = ({ type, children }) => {
    return <button type={type}>{children}</button>;
};

