'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Categories", deps: []
 * createTable "Users", deps: []
 * createTable "Courses", deps: [Users, Categories]
 * createTable "Weeks", deps: [Courses]
 * createTable "Lectures", deps: [Weeks]
 * createTable "Lessons", deps: [Lectures]
 * createTable "Completed_Lessons", deps: [Users, Lessons]
 * createTable "Participating_Courses", deps: [Users, Courses]
 * createTable "Notes", deps: [Lessons]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-11-27T12:18:19.486Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Categories",
            {
                "Category_ID": {
                    "type": Sequelize.UUID,
                    "field": "Category_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "unique": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "field": "User_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true,
                    "allowNull": false
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password",
                    "allowNull": false
                },
                "Avatar": {
                    "type": Sequelize.STRING,
                    "field": "Avatar"
                },
                "Status": {
                    "type": Sequelize.STRING,
                    "field": "Status",
                    "allowNull": false
                },
                "Role": {
                    "type": Sequelize.STRING,
                    "field": "Role",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Courses",
            {
                "Course_ID": {
                    "type": Sequelize.UUID,
                    "field": "Course_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "User_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "field": "User_ID",
                    "allowNull": false
                },
                "Category_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "Category_ID"
                    },
                    "field": "Category_ID",
                    "allowNull": false
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name",
                    "allowNull": false
                },
                "Description": {
                    "type": Sequelize.STRING,
                    "field": "Description",
                    "allowNull": false
                },
                "Image": {
                    "type": Sequelize.STRING,
                    "field": "Image",
                    "allowNull": false
                },
                "Level": {
                    "type": Sequelize.STRING,
                    "field": "Level",
                    "allowNull": false
                },
                "Need_Approval": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Need_Approval",
                    "allowNull": false
                },
                "Status": {
                    "type": Sequelize.STRING,
                    "field": "Status",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Weeks",
            {
                "Week_ID": {
                    "type": Sequelize.UUID,
                    "field": "Week_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Course_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Courses",
                        "key": "Course_ID"
                    },
                    "field": "Course_ID",
                    "allowNull": false
                },
                "Title": {
                    "type": Sequelize.STRING,
                    "field": "Title",
                    "allowNull": false
                },
                "Index": {
                    "type": Sequelize.INTEGER,
                    "field": "Index",
                    "allowNull": false
                },
                "Description": {
                    "type": Sequelize.STRING,
                    "field": "Description",
                    "allowNull": false
                },
                "Target": {
                    "type": Sequelize.STRING,
                    "field": "Target",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Lectures",
            {
                "Lecture_ID": {
                    "type": Sequelize.UUID,
                    "field": "Lecture_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Week_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Weeks",
                        "key": "Week_ID"
                    },
                    "field": "Week_ID",
                    "allowNull": false
                },
                "Lecture_Title": {
                    "type": Sequelize.STRING,
                    "field": "Lecture_Title",
                    "allowNull": false
                },
                "Index": {
                    "type": Sequelize.INTEGER,
                    "field": "Index",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Lessons",
            {
                "Lesson_ID": {
                    "type": Sequelize.UUID,
                    "field": "Lesson_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Lecture_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Lectures",
                        "key": "Lecture_ID"
                    },
                    "field": "Lecture_ID",
                    "allowNull": false
                },
                "Title": {
                    "type": Sequelize.STRING,
                    "field": "Title",
                    "allowNull": false
                },
                "Type": {
                    "type": Sequelize.STRING,
                    "field": "Type",
                    "allowNull": false
                },
                "Index": {
                    "type": Sequelize.INTEGER,
                    "field": "Index",
                    "allowNull": false
                },
                "Duration": {
                    "type": Sequelize.INTEGER,
                    "field": "Duration",
                    "allowNull": false
                },
                "Content": {
                    "type": Sequelize.STRING,
                    "field": "Content",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Completed_Lessons",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "unique": "Completed_Lessons_User_ID_Lesson_ID_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "primaryKey": true,
                    "field": "User_ID",
                    "allowNull": false
                },
                "Lesson_ID": {
                    "type": Sequelize.UUID,
                    "unique": "Completed_Lessons_User_ID_Lesson_ID_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Lessons",
                        "key": "Lesson_ID"
                    },
                    "primaryKey": true,
                    "field": "Lesson_ID",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Participating_Courses",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "unique": "Participating_Courses_User_ID_Course_ID_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "primaryKey": true,
                    "field": "User_ID",
                    "allowNull": false
                },
                "Course_ID": {
                    "type": Sequelize.UUID,
                    "unique": "Participating_Courses_User_ID_Course_ID_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Courses",
                        "key": "Course_ID"
                    },
                    "primaryKey": true,
                    "field": "Course_ID",
                    "allowNull": false
                },
                "Review_Content": {
                    "type": Sequelize.STRING,
                    "field": "Review_Content"
                },
                "Review_Star": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Review_Star"
                },
                "Date_Achieved": {
                    "type": Sequelize.DATE,
                    "field": "Date_Achieved"
                },
                "Status": {
                    "type": Sequelize.STRING,
                    "field": "Status",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Notes",
            {
                "Note_ID": {
                    "type": Sequelize.UUID,
                    "field": "Note_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Lesson_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Lessons",
                        "key": "Lesson_ID"
                    },
                    "field": "Lesson_ID",
                    "allowNull": false
                },
                "Note_Content": {
                    "type": Sequelize.STRING,
                    "field": "Note_Content"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
