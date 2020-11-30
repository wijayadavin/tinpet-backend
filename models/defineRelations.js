const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages');
const PetImages = require('./PetImages');
const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    Users.hasMany(Pets, fkOptions({ foreignKey: 'user_id' }))
    Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))
    Pets.hasMany(PetImages, fkOptions({ foreignKey: 'pets_id' }))
}

module.exports = defineRelations
