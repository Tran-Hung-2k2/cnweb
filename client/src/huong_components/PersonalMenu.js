export default function PersonalMenu() {
    return (
        <div className="menu">
            <div tabIndex={0} role="button" className="btn m-1">Click</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>My Courses</a></li>
                <li><a>Profile</a></li>
                <li><a>My Purchases</a></li>
                <li><a>Settings</a></li>
                <li><a>Updates</a></li>
                <li><a>Help center</a></li>
                <li><a>Log Out</a></li>
            </ul>
        </div>
    );
}