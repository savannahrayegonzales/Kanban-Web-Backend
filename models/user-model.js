const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
});

const boardSchema = new Schema({
    name: String,
    boardId: String,
    backgroundImg: String,
    boardUsers: [userSchema],
    swimlanes: {
        title: String,
        id: String,
        cards: {
            title: String,
            description: String,
            id: String,
            comments: [{
                comment: String,
                id: String,
            }],
            attachments: [{
                location: String,
                id: String,
            }],
            users: [{
                name: String,
                id: String,
            }],
            labels: [{
                color: String,
                title: String,
                id: String,
            }],
            dueDates: Date,
        },
    },
    labels: [{
        color: String,
        title: String,
    }]


});

const User = mongoose.model('user', userSchema);
const Board = mongoose.model('board', boardSchema);

module.exports = User;
module.exports = Board;
