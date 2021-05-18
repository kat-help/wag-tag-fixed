const User = require('./Users');
const Pet = require('./Pets');
const Image = require('./Images');
const PetImage = require('./PetImages')

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

Pet.belongsTo(Image, {
  foreignKey: 'image_id',
  through: PetImage
})

// Image.belongsTo(Pet, {
//   foreignKey: "image_id",
//   through: PetImage
// })

module.exports = { User, Pet, Image, PetImage };