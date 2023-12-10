import icon_search from '../assets/images/search.png';
export default function Header({ heading, paragraph, linkName, linkUrl = '#' }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a style={{ color: '#0077cc', fontSize: '1.5rem' }}>COURSERA</a>
            </div>
            <select className="select select-primary w-full max-w-xs" style={{ width: '150px', backgroundColor: '#0077cc', borderColor: '#0077cc', color: '#ffffff' }}>
                <option disabled selected>EXPLORE</option>
                <option>Game of Thrones</option>
                <option>Lost</option>
                <option>Breaking Bad</option>
                <option>Walking Dead</option>
            </select>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <button className="btn btn-square">

                    <img src={icon_search} alt="Description" className="icon" />
                </button>
            </div>
            <select className="select w-full max-w-xs">
                <option disabled selected>Online degrees</option>
                <option>Homer</option>
                <option>Marge</option>
            </select>
            <button className="btn btn-link">
                <span className="button-text">Find your New Career</span>
            </button>
            <button className="btn btn-link">
                <span className="button-text">Log in</span>
            </button>
            <button className="btn btn-active btn-primary" color="#ffffff">Join for Free</button>

        </div>
    );
}
