const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages');
const UserNotifications = require('./UserNotifications');
const Meetings = require('./Meetings');
const PetImages = require('./PetImages');
const PetLikes = require('./PetLikes')
const UserChats = require('./UserChats');
const UserChatLines = require('../models/UserChatLines');
const PetComments = require('./PetComments');


const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })


    // pets:
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'userId', allowNull: false }))
    Users.hasMany(Pets, fkOptions({ foreignKey: 'userId', allowNull: false }))


    //PetLikes
    PetLikes.belongsTo(Pets, fkOptions({ foreignKey: 'petId', allowNull: false }))
    PetLikes.belongsTo(Users, fkOptions({ foreignKey: 'userId', allowNull: false }))
    Users.hasMany(PetLikes, fkOptions({ foreignKey: 'userId', as: 'like', allowNull: false }))
    Pets.hasMany(PetLikes, fkOptions({ foreignKey: 'petId', as: 'like', allowNull: false }))


    //PetComments
    PetComments.belongsTo(Pets, fkOptions({ foreignKey: 'petId', allowNull: false }))
    PetComments.belongsTo(Users, fkOptions({ foreignKey: 'userId', allowNull: false }))
    Users.hasMany(PetComments, fkOptions({ foreignKey: 'userId', as: 'comment', allowNull: false }))
    Pets.hasMany(PetComments, fkOptions({ foreignKey: 'petId', as: 'comment', allowNull: false }))


    // petMeetings:
    Meetings.belongsTo(Users, fkOptions({ foreignKey: 'senderUserId', allowNull: false }))
    Meetings.belongsTo(Users, fkOptions({ foreignKey: 'recipientUserId', allowNull: false }))
    Meetings.belongsTo(Pets, fkOptions({ foreignKey: 'senderPetId', allowNull: false }))
    Meetings.belongsTo(Pets, fkOptions({ foreignKey: 'recipientPetId', allowNull: false }))

    Users.hasMany(Meetings, fkOptions({ foreignKey: 'senderUserId', allowNull: false }))
    Users.hasMany(Meetings, fkOptions({ foreignKey: 'recipientUserId', allowNull: false }))
    Pets.hasMany(Meetings, fkOptions({ foreignKey: 'senderPetId', allowNull: false }))
    Pets.hasMany(Meetings, fkOptions({ foreignKey: 'recipientPetId', allowNull: false }))


    // petImages
    PetImages.belongsTo(Pets, fkOptions({ foreignKey: 'petId', allowNull: false }))
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'userId', allowNull: false }))
    Pets.hasOne(PetImages, fkOptions({ foreignKey: 'petId', allowNull: false }))
    Users.hasOne(UserImages, fkOptions({ foreignKey: 'userId', allowNull: false }))


    // userNotifications:
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'userId', allowNull: false }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'userId', allowNull: false }))


    // userChats:
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user1Id', allowNull: false }))
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user2Id', allowNull: false }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user1Id', allowNull: false }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user2Id', allowNull: false }))


    // userChatLines:
    UserChatLines.belongsTo(UserChats, fkOptions({ foreignKey: 'userChatId', allowNull: false }))
    UserChatLines.belongsTo(Users, fkOptions({ foreignKey: 'userId', allowNull: false }))
    UserChats.hasMany(UserChatLines, fkOptions({ foreignKey: 'userChatId', allowNull: false }))
    Users.hasMany(UserChatLines, fkOptions({ foreignKey: 'userId', allowNull: false }))
}


module.exports = defineRelations
