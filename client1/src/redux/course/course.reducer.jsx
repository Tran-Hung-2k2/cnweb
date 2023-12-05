import type from './course.type';

const initialState = {
    Course_ID: '',
    Week_ID: '',
    Lecture_ID: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_COURSE:
            return {
                ...state,
                Course_ID: action.payload,
            };

        case type.ADD_WEEK:
            return {
                ...state,
                Week_ID: action.payload,
            };

        case type.ADD_LECTURE:
            return {
                ...state,
                Lecture_ID: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
