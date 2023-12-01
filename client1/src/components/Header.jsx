import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="gap-10 my-1 justify-evenly navbar bg-base-100">
            <div className="flex-1 px-5 form-control">
                <input type="text" placeholder="Search" className="w-full input input-bordered" />
            </div>
            <div className="flex-none mr-20">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 border-2 rounded-full shadow border-primary">
                            <img
                                alt="Avatar"
                                src={user.Avatar}
                            />
                        </div>
                    </div>
                    <ul className="mt-3 z-[1] p-2 drop-shadow-2xl menu menu-md dropdown-content bg-base-100 rounded-box w-60">
                        <li>
                            <a href="/profile" className="text-base hover:text-lime-700">
                                <CgProfile /> Thông tin tài khoản
                            </a>
                        </li>
                        <li>
                            <a href="/setting" className="text-base hover:text-lime-700">
                                <IoSettingsOutline /> Cài đặt
                            </a>
                        </li>
                        <li>
                            <a className="text-base border-t-2 hover:text-lime-700">
                                <HiOutlineLogout /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
