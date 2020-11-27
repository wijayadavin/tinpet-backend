const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages')
const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    //  Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))
}

module.exports = defineRelations