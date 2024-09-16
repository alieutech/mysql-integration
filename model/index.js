const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require('../config/db-config');
const { config } = require("process");

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    { host: dbConfig.host, dialect: dbConfig.dialect }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./users')(sequelize, DataTypes);
db.Expense = require('./expense')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.PaymentMethod  = require('./paymentMethod')(sequelize, DataTypes);
db.Budget = require('./budget')(sequelize, DataTypes);

db.User.hasMany(db.Expense, { foreignKey: 'user_id' });
db.User.hasMany(db.Category, { foreignKey: 'user_id' });
db.User.hasMany(db.PaymentMethod, { foreignKey: 'user_id' });
db.User.hasMany(db.Budget, { foreignKey: 'user_id' });
db.Category.hasMany(db.Expense, { foreignKey: 'category_id' });
db.Category.hasMany(db.Budget, { foreignKey: 'category_id' });

db.Expense.belongsTo(db.User, { foreignKey: 'user_id' });
db.Expense.belongsTo(db.Category, { foreignKey: 'category_id' });
db.Category.belongsTo(db.User, { foreignKey: 'user_id' });
db.PaymentMethod.belongsTo(db.User, { foreignKey: 'user_id' });
db.Budget.belongsTo(db.User, { foreignKey: 'user_id' });
db.Budget.belongsTo(db.Category, { foreignKey: 'category_id' });


module.exports = db;
