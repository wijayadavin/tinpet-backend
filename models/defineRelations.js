const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages');
const UserNotifications = require('./UserNotifications');
const Meetings = require('./Meetings');
const PetImages = require('./PetImages');

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
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'userId' }))

    // petImages
    PetImages.belongsTo(Pets, fkOptions({ foreignKey: 'pet_id' }))
    Pets.hasMany(PetImages, fkOptions({ foreignKey: 'pet_id' }))
}


module.exports = defineRelations
