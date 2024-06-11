const sequelize = require('../db')

const{DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},

})

const Basket = sequelize.define('basket', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 

})

const BasketGroup = sequelize.define('basket_group', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},


})

const Group = sequelize.define('group', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull: false},

})

const Type = sequelize.define('type', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull: false},

})

const Brand = sequelize.define('brand', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull: false},

})

const TypeBrand = sequelize.define('type_brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketGroup)
BasketGroup.belongsTo(Basket)

Type.hasMany(Group)
Group.belongsTo(Type)

Brand.hasMany(Group)
Group.belongsTo(Brand)

Group.hasMany(BasketGroup)
BasketGroup.belongsTo(Group)




Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketGroup,
    Group,
    Type,
    Brand
}