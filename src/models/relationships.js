import User from './User..js'
import Category from './category.js'
import Price from './price.js'
import Property from './property.js'

Property.belongsTo(User, {
    foreignKey:'user_ID'
})//ForeingKeys

Category.hasOne(Property, {
    foreignKey:'property_ID'
})//ForeingKeys

Price.hasOne(Property, {
    foreignKey:'property_ID'
})//ForeingKeys

export{User, Property}