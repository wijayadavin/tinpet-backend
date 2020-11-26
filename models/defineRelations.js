const Users = require('./users');
const Pets = require('./pets');
const UserImages = require('./UserImages')


const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    Users.hasMany(Pets, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))
}


module.exports = defineRelations