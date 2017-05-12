module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Queue', 'In Progress', 'Done'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('Urgent', 'High', 'Medium', 'Low'),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.User, {
          onDelete: "CASCADE",
          as: 'Creator',
          foreignKey: {
            allowNull: false,
            name: 'created_by'
          }
        });
        Card.belongsTo(models.User, {
          onDelete: "CASCADE",
          as: 'Assigned',
          foreignKey: {
            name: 'assigned_to'
          }
        });
      }
    }
  });

  return Card;
};