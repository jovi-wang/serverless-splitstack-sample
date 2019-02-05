const dynamoose = require('dynamoose');
const { DB_PREFIX } = require('../config/setting');

const UserSchema = new dynamoose.Schema({
    email: {
        type: String,
        hashKey: true,
        trim: true,
    },
    sub: {
        type: String,
        rangeKey: true,
        trim: true,
    },
    userId: {
        type: String,
        trim: true,
        index: {
            global: true,
            project: true,
            name: `${DB_PREFIX}User-userId-index`,
        },
    },
    name: {
        type: String,
        trim: true,
    },
    favourites: {
        type: [Object],
        trim: true,
        default: [],
    },
    locale: {
        type: String,
        trim: true,
        default: '',
    },
    picture: {
        type: String,
        trim: true,
        default: '',
    },
    familyName: {
        type: String,
        trim: true,
        default: '',
    },
    givenName: {
        type: String,
        trim: true,
        default: '',
    },
    emailVerified: {
        type: String,
        trim: true,
        default: '',
    },
    deleted: {
        type: Boolean,
        default: false,
        index: {
            global: true,
            project: true,
            name: `${DB_PREFIX}User-deleted-index`,
        },
    },
},
{
    timestamps: true,
});

module.exports = UserSchema;
