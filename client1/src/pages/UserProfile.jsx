import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { IoCameraOutline } from "react-icons/io5";

import avatar from '../assets/images/avatar.jpg';
import service from '../services/user.service';
import action from '../redux/auth/auth.action';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setIsAvatarUpdated(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('Avatar', selectedFile);

            const res = await service.updateUserDetail(formData);
            dispatch(action.updateUser(res.data))

            setSelectedFile(null);
            setIsAvatarUpdated(false);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <form
                className="py-8 px-8 min-w-[30%] max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                onSubmit={handleSubmit}
            >
                <div className="relative inline-block">
                    <img
                        className="w-24 h-24 border-2 rounded-full shadow border-primary"
                        alt="Avatar"
                        src={isAvatarUpdated ? URL.createObjectURL(selectedFile) : user?.Avatar || avatar}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="opacity-0 absolute top-10 left-0 cursor-pointer w-24 z-10"
                        onChange={handleFileChange}
                    />
                    <IoCameraOutline className="absolute top-14 left-8 w-8 h-8 cursor-pointer text-white" />
                </div>
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">{user.Name}</p>
                        <p className="text-slate-500 font-medium">{user.Role}</p>
                    </div>
                    <div>
                        {isAvatarUpdated && (
                            <button
                                type="submit"
                                className="cursor-pointer px-4 py-1 text-sm text-primary font-semibold rounded-full border border-primary shadow-xl"
                            >
                                Lưu ảnh đại diện
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <div className="bg-white min-w-[50%] max-w-2xl shadow-xl overflow-hidden sm:rounded-lg py-10">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Thông tin tài khoản</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Thông tin chi tiết của người dùng</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.Name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.Email}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Vai trò</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.Role}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
