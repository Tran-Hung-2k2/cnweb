import type from './course.type';

const initialState = {
    course: null,
    Course_ID: '',
    Week_ID: '',
    Lecture_ID: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_COURSE:
            return {
                ...state,
                course: action.payload,
            };

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

        case type.DELETE_WEEK:
            const updatedWeeks = state.course.Weeks.filter((week) => week.Week_ID !== action.payload);
            return {
                ...state,
                course: {
                    ...state.course,
                    Weeks: updatedWeeks,
                },
            };

        case type.ADD_LECTURE:
            return {
                ...state,
                Lecture_ID: action.payload,
            };

        case type.DELETE_LECTURE:
            const updatedLectures = state.course.Weeks.map((week) => {
                // Nếu Week có Lectures, thực hiện xóa lecture
                if (week.Lectures && week.Lectures.length > 0) {
                    const updatedLectures = week.Lectures.filter((lecture) => lecture.Lecture_ID !== action.payload);
                    return {
                        ...week,
                        Lectures: updatedLectures,
                    };
                }
                // Nếu không có Lectures, không cần thay đổi gì
                return week;
            });

            return {
                ...state,
                course: {
                    ...state.course,
                    Weeks: updatedLectures,
                },
            };

        default:
            return state;
    }
};

export default reducer;
