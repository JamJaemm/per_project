module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    });
  
    User.associate = models => {
      User.hasMany(models.Post);
      User.hasMany(models.Comment);
    };
  
    return User;
  };