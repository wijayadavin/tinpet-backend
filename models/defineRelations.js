const Users = require('./Users');
const Pets = require('./Pets');
const UserImages = require('./UserImages')


const defineRelations = () => {
    const fkOptions = (options) => ({
        ...options,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })

    // Pengaturan relationship antar database:
    Pets.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
    Users.hasOne(Pets, fkOptions({ foreignKey: 'user_id' }))

    Users.hasOne(UserImages, fkOptions({ foreignKey: 'user_id' }))
    UserImages.belongsTo(Users, fkOptions({ foreignKey: 'user_id' }))
}


module.exports = defineRelations