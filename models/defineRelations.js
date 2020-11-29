const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages');
const UserNotifications = require('./UserNotifications');
const Meetings = require('./Meetings')

const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    // pets:
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(Pets, fkOptions({ foreignKey: 'userId' }))

    // userImages:
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(UserImages, fkOptions({ foreignKey: 'userId' }))

    // petMeetings:
    Meetings.belongsTo(Users, fkOptions({ as: 'senderUserId' }))
    Meetings.belongsTo(Users, fkOptions({ as: 'recipientUserId' }))

    // userNotifications:
    UserNotifications.belongsTo(Users, fkOptions({ foreignKey: 'userId' }))
    Users.hasMany(UserNotifications, fkOptions({ foreignKey: 'userId' }))
}


module.exports = defineRelations
