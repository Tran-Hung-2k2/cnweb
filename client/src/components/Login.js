import { useState } from 'react';
import fields from '../constants/loginFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';

let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
    const [state, setState] = useState(fieldsState);

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = `/api/auth/login`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert(data.details.body[0].message);
            })
            .catch((error) => console.error('Error:', error.message));
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        onChange={handleChange}
                        value={state[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength={30}
                    />
                ))}
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Đăng nhập" />
        </form>
    );
}
