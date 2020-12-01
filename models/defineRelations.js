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
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'userId', as: 'petOwner' }))
    Users.hasMany(Pets, fkOptions({ foreignKey: 'userId', as: 'petOwner' }))

    //PetLikes
    PetLikes.belongsTo(Pets, fkOptions({ foreignKey: 'pet_id', as: 'likeRecipientPet' }))
    PetLikes.belongsTo(Users, fkOptions({ foreignKey: 'user_id', as: 'likeSenderUser' }))
    Users.hasMany(PetLikes, fkOptions({ foreignKey: 'user_id', as: 'likeSenderUser' }))
    Pets.hasMany(PetLikes, fkOptions({ foreignKey: 'pet_id', as: 'likeRecipientPet' }))

    // petMeetings:
    Meetings.belongsTo(Users, fkOptions({ as: 'sender_user_id', as: 'meetingSenderUser' }))
    Meetings.belongsTo(Users, fkOptions({ as: 'recipient_user_id', as: 'meetingRecipientUser' }))

    // petImages
    PetImages.belongsTo(Pets, fkOptions({ foreignKey: 'petId', as: 'petImageOwner' }))
    Pets.hasOne(PetImages, fkOptions({ foreignKey: 'petId', as: 'petImageOwner' }))

    // userImages:
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'userId', as: 'userImageOwner' }))
    Users.hasOne(UserImages, fkOptions({ foreignKey: 'userId', as: 'userImageOwner' }))

    // userNotifications:
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'user_id', as: 'userNotificationOwner' }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'user_id', as: 'userNotificationOwner' }))

    // userChats:
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user_id1', as: 'chatParticipant1' }))
    UserChats.belongsTo(Users, fkOptions({ foreignKey: 'user_id2', as: 'chatParticipant2' }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user_id1', as: 'chatParticipant1' }))
    Users.hasMany(UserChats, fkOptions({ foreignKey: 'user_id2', as: 'chatParticipant2' }))

    // userChatLines:
    UserChatLines.belongsTo(UserChats, fkOptions({ foreignKey: 'user_chat_id', as: 'userChatRoom' }))
    UserChats.hasMany(UserChatLines, fkOptions({ foreignKey: 'user_chat_id', as: 'userChatRoom' }))
}


module.exports = defineRelations
