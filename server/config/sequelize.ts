import config from "./config"
import { Sequelize } from "sequelize-typescript"
import path from 'path'
const sequelizeInstance = new Sequelize(
  config.sequelize.database, config.sequelize.userName, config.sequelize.password,
  {
    port: config.sequelize.port,
    host: config.sequelize.host,
    dialect: config.sequelize.dialect as 'mysql'
  });

sequelizeInstance.addModels([path.resolve(__dirname, '../models/*.model.ts')])
// 创建表
sequelizeInstance.sync()