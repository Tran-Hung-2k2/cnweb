import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import fields from '../constants/signupFields';
import service from '../services/auth.service';
import label from '../constants/label';

const fieldsState = fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {});

export default function SignUp() {
    const [state, setState] = useState(fieldsState);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await service.register({
            ...state,
            Role: searchParams.get('role') == label.role.ORGANIZATION ? label.role.ORGANIZATION : label.role.STUDENT,
        });
        navigate('/signin');
    };

    return (
        <form className="m-auto -translate-x-36 w-200" onSubmit={handleSubmit}>
            <h3 className="mb-2 text-2xl font-bold text-primary">
                {searchParams.get('role') == label.role.ORGANIZATION
                    ? 'Bạn đang đăng ký tài khoản dành cho tổ chức giáo dục'
                    : 'Đăng ký'}
            </h3>
            <div>
                {searchParams.get('role') == label.role.ORGANIZATION
                    ? 'Tổ chức của bạn đã có tài khoản?'
                    : 'Bạn đã có tài khoản?'}
                <NavLink to="/signin" className="ml-2 text-primary">
                    Đăng nhập ngay
                </NavLink>
            </div>
            <div className="flex flex-col my-6 space-y-4 w-80">
                {fields.map((field) => (
                    <input
                        key={field.id}
                        onChange={handleChange}
                        {...field}
                        className="w-full max-w-xl input input-bordered input-primary"
                    />
                ))}
            </div>

            <button type="submit" className="btn btn-active btn-primary">
                Đăng ký
            </button>
        </form>
    );
}
