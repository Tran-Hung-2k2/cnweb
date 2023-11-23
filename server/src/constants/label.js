const label = {
    role: {
        ADMIN: 'admin',
        ORGANIZATION: 'organization',
        STUDENT: 'student',
    },
    org: {
        APPROVAL: 'approval',
        PENDING_APPROVAL: 'pending approval',
    },
    course: {
        VISIBLE: 'visible',
        HIDDEN: 'hidden',
        PENDING_APPROVAL: 'pending approval',
    },
    course_level: {
        BEGINNER: 'beginner',
        INTERMEDIATE: 'intermediate',
        ADVANCED: 'advanced',
        EXPERT: 'expert',
    },
    parti_course: {
        COMPLETED: 'completed',
        NOT_COMPLETED: 'not completed',
        PENDING_APPROVAL: 'pending approval',
    },
    lesson_type: {
        READING: 'reading',
        VIDEO: 'video',
    },
};

module.exports = label;
