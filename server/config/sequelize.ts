import config from "./config"
import { Sequelize } from "sequelize-typescript"
import path from 'path'
// 连接mysql
const sequelizeInstance = new Sequelize(
  config.sequelize.database, config.sequelize.userName, config.sequelize.password,
  {
    port: config.sequelize.port,
    host: config.sequelize.host,
    dialect: config.sequelize.dialect as 'mysql'
  });
// 查找数据model
sequelizeInstance.addModels([path.resolve(__dirname, '../models/*.model.ts')])
// 创建表
sequelizeInstance.sync()