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
    PetLikes.belongsTo(Pets, fkOptions({ foreignKey: 'pet_id' }))
    PetLikes.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(PetLikes, fkOptions({ foreignKey: 'user_id' }))
    Pets.hasMany(PetLikes, fkOptions({ foreignKey: 'pet_id' }))

    // petMeetings:
    Meetings.belongsTo(Users, fkOptions({ as: 'sender_user_id' }))
    Meetings.belongsTo(Users, fkOptions({ as: 'recipient_user_id' }))

    // petImages
    PetImages.belongsTo(Pets, fkOptions({ foreignKey: 'petId' }))
    Pets.hasOne(PetImages, fkOptions({ foreignKey: 'petId' }))

    // userImages:
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasOne(UserImages, fkOptions({ foreignKey: 'userId' }))

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
}


module.exports = defineRelations
