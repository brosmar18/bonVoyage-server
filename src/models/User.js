'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [2, 50],
            },
        },
        lastName: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [2, 50],
            },
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [2, 50],
            },
        },
        picturePath: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        friends: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        location: {
            type: DataTypes.STRING,
        },
        occupation: {
            type: DataTypes.STRING,
        },
        viewedProfile: {
            type: DataTypes.INTEGER,
        },
        impressions: {
            type: DataTypes.INTEGER,
        },
    });

    return User;
};

