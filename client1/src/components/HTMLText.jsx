import { Children } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function HTMLText({ children, ...field }) {
    return <ReactQuill {...field} value={children} readOnly={true} theme={'bubble'} />;
}

export default HTMLText;
