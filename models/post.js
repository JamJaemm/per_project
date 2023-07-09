module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  
    Post.associate = models => {
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      Post.hasMany(models.Comment);
    };
  
    return Post;
  };