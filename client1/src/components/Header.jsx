const Header = () => {
    return (
        <div className="gap-10 my-1 justify-evenly navbar bg-base-100">
            <div className="flex-1 px-5 form-control">
                <input type="text" placeholder="Search" className="w-full input input-bordered" />
            </div>
            <div className="flex-none mr-20">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        // <div className="bg-white shadow-md navbar drop-shadow-1">
        //     <div className="flex-none">
        //         <button className="btn btn-square btn-ghost drawer-button">
        //             <GiHamburgerMenu className="w-5 h-5 translate-y-0.5" />
        //         </button>
        //     </div>
        //     <div className="flex-1">
        //         <a className="text-xl btn btn-ghost text-primary">Coursera</a>
        //     </div>
        //     <div className="flex-none">
        //         <button className="btn btn-square btn-ghost">
        //             <svg
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 fill="none"
        //                 viewBox="0 0 24 24"
        //                 className="inline-block w-5 h-5 stroke-current"
        //             >
        //                 <path
        //                     strokeLinecap="round"
        //                     strokeLinejoin="round"
        //                     strokeWidth="2"
        //                     d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        //                 ></path>
        //             </svg>
        //         </button>
        //     </div>
        // </div>
    );
};

export default Header;
