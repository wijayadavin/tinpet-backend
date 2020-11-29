const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages')


const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    Users.hasMany(Pets, fkOptions({ foreignKey: 'user_id' }))
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))

    Users.hasMany(UserImages, fkOptions({ foreignKey: 'user_id' }))
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
}


<<<<<<< HEAD
module.exports = defineRelations
=======
module.exports = defineRelations
>>>>>>> dev.0.1.0
