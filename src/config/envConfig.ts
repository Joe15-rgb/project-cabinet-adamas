import type { Dialect, Options } from "sequelize";
import { Sequelize } from "sequelize"

class SequelizeConnection {

  private static instance: Sequelize
  static getInstance(): Sequelize {
    if (!SequelizeConnection.instance) {
      const dbConfig = {
        dialect: 'mysql' as Dialect,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'cabinets_adamas',
        logging: false,
      } as Options
      SequelizeConnection.instance = new Sequelize(dbConfig);
    }
    return SequelizeConnection.instance;
  }

  static async connect(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance()
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      return sequelize

    } catch (error) {
      console.error(`Error while creation connection to database ${error}`)
      return sequelize
    }
  }
}

export default SequelizeConnection