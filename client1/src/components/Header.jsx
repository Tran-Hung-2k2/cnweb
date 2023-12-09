import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import { PiPassword } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';

import action from '../redux/auth/auth.action';
import avatar from '../assets/images/avatar.jpg';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.category);

    const dispatch = useDispatch();

    return (
        <div className="my-1 xl:gap-60 lg:gap-40 md:gap-30 sm:gap-20 justify-evenly navbar bg-base-100">
            <div className="flex-1 ml-6 join">
                <div className="flex flex-1">
                    <input className="flex-1 input input-bordered join-item" placeholder="Nhập để tìm kiếm khóa học" />
                </div>
                <select className="select select-bordered join-item">
                    {categories.map((category, index) => (
                        <option key={index} value={category.Category_ID}>
                            {category.Name}
                        </option>
                    ))}
                </select>
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary">new</span>
                    <button className="btn btn-primary join-item">Search</button>
                </div>
            </div>
            <div className="flex-none mr-20">
                <div className="w-full dropdown dropdown-end">
                    <span className="inline-block -translate-y-1">
                        <p className="mr-2 text-base font-bold text-primary">{user.Name}</p>
                        <p className="mr-2 text-sm">{user.Role}</p>
                    </span>
                    <div tabIndex={0} role="button" className="inline-block btn btn-ghost btn-circle avatar">
                        <div className="w-12 border-2 rounded-full shadow border-primary">
                            <img alt="Avatar" src={user.Avatar || avatar} />
                        </div>
                    </div>

                    <ul className="mt-3 z-[1] p-2 drop-shadow-2xl menu menu-md dropdown-content bg-base-100 rounded-box w-60">
                        <li>
                            <a href="/profile" className="text-lg hover:text-lime-700">
                                <CgProfile className="w-5 h-5" /> Thông tin tài khoản
                            </a>
                        </li>
                        <li>
                            <a href="/setting" className="text-lg hover:text-lime-700">
                                <PiPassword className="w-5 h-5" /> Đổi mật khẩu
                            </a>
                        </li>
                        <li>
                            <a href="/setting" className="text-lg hover:text-lime-700">
                                <IoSettingsOutline className="w-5 h-5" /> Cài đặt
                            </a>
                        </li>
                        <li
                            onClick={() => {
                                dispatch(action.logout());
                            }}
                        >
                            <a href="#" className="text-lg border-t-2 hover:text-lime-700">
                                <HiOutlineLogout className="w-5 h-5" /> Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;