export default function Course() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl"  alt="Course Thumbnail" />
               
                <div className="ml-6">
                    <h1 className="text-4xl font-bold mb-4">Chuyên môn cơ bản về AI nhân tạo</h1>
                    <p className="text-base text-gray-700 mb-6">
                        Mở khóa và tận dụng tiềm năng của AI nhân tạo. Tìm hiểu cách bạn có thể sử dụng các khả năng của AI tổng hợp để nâng cao công việc và cuộc sống hàng ngày của mình.
                    </p>
                    <h3 className="text-lg font-semibold mb-2">Chứng Chỉ Đạt Được</h3>
                    <ul>
                        <li>Đạt được kỹ năng cơ bản về AI.</li>
                        <li>Xây dựng ứng dụng sử dụng AI.</li>
                        <li>Hiểu biết về các khái niệm quan trọng ,...</li>
                    </ul>
                    <button className="btn btn-primary">Bắt đầu</button>
                </div>
            </div>
        </div>


    );
}

