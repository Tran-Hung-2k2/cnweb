import React from 'react';
import UserProfile from './UserProfile';

const Profile = () => {
  // Truyền userId từ người dùng đã đăng nhập hoặc từ các thông tin định danh khác
  const userId = '123'; // Thay đổi userId tùy thuộc vào cách bạn quản lý người dùng

  return (
    <div>
      {/* Các thành phần khác của trang Profile */}
      <UserProfile userId={userId} />
    </div>
  );
}

export default Profile;