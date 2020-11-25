const Users = require('./users');
const Pets = require('./pets');

const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    Users.hasMany(Pets, fkOptions({ foreignKey: 'user_id' }))
    // Users.hasMany(userImages, fkOptions({ foreignKey: 'user_id' }))
}

module.exports = defineRelations