const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages');
const UserNotifications = require('./UserNotifications');
const Meetings = require('./Meetings');
const PetImages = require('./PetImages');
const PetLikes = require('./PetLikes')
const UserChats = require('./UserChats');
const UserChatLines = require('../models/UserChatLines')


const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    // pets:
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(Pets, fkOptions({ foreignKey: 'userId' }))

    //PetLikes
    PetLikes.belongsTo(Pets, fkOptions({ foreignKey: 'petId' }))
    PetLikes.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(PetLikes, fkOptions({ foreignKey: 'userId' }))
    Pets.hasMany(PetLikes, fkOptions({ foreignKey: 'petId' }))

    // petMeetings:
    Meetings.belongsTo(Users, fkOptions({ as: 'senderUserId' }))
    Meetings.belongsTo(Users, fkOptions({ as: 'recipientUserId' }))

    // petImages
    PetImages.belongsTo(Pets, fkOptions({ foreignKey: 'petId' }))
    Pets.hasOne(PetImages, fkOptions({ foreignKey: 'petId' }))

    // userImages:
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasOne(UserImages, fkOptions({ foreignKey: 'userId' }))

    // userNotifications:
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'userId' }))

    // userChats:
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user1Id' }))
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user2Id' }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user1Id' }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user2Id' }))

    // userChatLines:
    UserChatLines.belongsTo(UserChats, fkOptions({ foreignKey: 'userChatId' }))
    UserChats.hasMany(UserChatLines, fkOptions({ foreignKey: 'userChatId' }))
}


module.exports = defineRelations
