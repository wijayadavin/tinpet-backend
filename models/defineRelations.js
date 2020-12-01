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
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(Pets, fkOptions({ foreignKey: 'user_id' }))

    // userImages:
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))

    // petMeetings:
    Meetings.belongsTo(Users, fkOptions({ as: 'sender_user_id' }))
    Meetings.belongsTo(Users, fkOptions({ as: 'recipient_user_id' }))

    // userNotifications:
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'user_id' }))

    // userChats:
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user_id1' }))
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user_id2' }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user_id1' }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user_id2' }))

    // userChatLines:
    UserChatLines.belongsTo(UserChats, fkOptions({ foreignKey: 'user_chat_id' }))
    UserChats.hasMany(UserChatLines, fkOptions({ foreignKey: 'user_chat_id' }))

    // petImages
    PetImages.belongsTo(Pets, fkOptions({ foreignKey: 'pet_id' }))
    Pets.hasMany(PetImages, fkOptions({ foreignKey: 'pet_id' }))

    //PetLikes
    PetLikes.belongsTo(Pets, fkOptions({ foreignKey: 'pet_id' }))
    PetLikes.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(PetLikes, fkOptions({ foreignKey: 'user_id' }))
    Pets.hasMany(PetLikes, fkOptions({ foreignKey: 'pet_id' }))
}


module.exports = defineRelations
