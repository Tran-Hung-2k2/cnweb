import image from '../assets/images/signin.png';

export default function SignIn({ children }) {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-3/5">
                <img className="w-full" src={image} alt="Coursera" />
            </div>
            {children}
        </div>
    );
}
