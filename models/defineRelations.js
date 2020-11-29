const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages');
const UserNotifications = require('./UserNotifications');
const PetMeetings = require('./PetMeetings')

const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    // pets:
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(Pets, fkOptions({ foreignKey: 'user_id' }))

    // user_images:
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))

    // pet_meetings:
    PetMeetings.belongsTo(Users, fkOptions({ as: 'sender_user_id' }))
    PetMeetings.belongsTo(Users, fkOptions({ as: 'recipient_user_id' }))

    // user_notifications:
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'user_id' }))
}


module.exports = defineRelations
