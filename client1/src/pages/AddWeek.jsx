import { useState } from 'react';
import fields from '../constants/addWeekFields';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextEditor from '../components/TextEditor';
import courseService from '../services/course.service';

const fieldsState = fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {});

export default function AddWeek() {
    const [state, setState] = useState(fieldsState);
    const { Course_ID } = useSelector((state) => state.course);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ Course_ID, ...state });
        courseService.addWeek({ Course_ID, ...state });
        navigate(-1);
    };

    return (
        <form className="m-6 space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-primary">Thêm tuần học</h3>
            <div className="flex flex-col space-y-4">
                {fields.map((field) => {
                    switch (field.type) {
                        case 'editor':
                            return <TextEditor {...field} key={field.id} onChange={handleChange} className="" />;
                        case 'textarea':
                            return (
                                <textarea
                                    {...field}
                                    key={field.id}
                                    onChange={handleChange}
                                    className="textarea textarea-primary"
                                ></textarea>
                            );
                        default:
                            return (
                                <input
                                    key={field.id}
                                    onChange={handleChange}
                                    {...field}
                                    className="w-full max-w-xl input input-bordered input-primary"
                                />
                            );
                    }
                })}
            </div>

            <button type="submit" className="btn btn-active btn-primary">
                Thêm khóa học
            </button>
        </form>
    );
}
