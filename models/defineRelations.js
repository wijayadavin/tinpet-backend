const Users = require('./users');
const UserImages = require('./UserImages')


const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))
}

module.exports = defineRelations
