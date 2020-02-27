import { Model, DataTypes } from 'sequelize'

import { connection } from '../../../database'

class CfgUser extends Model {
  static init(sequelize) {
    super.init(
      {
        key: DataTypes.STRING,
        value: DataTypes.STRING
      },
      {
        sequelize
      }
    )
  }
}

CfgUser.init(connection)

export default CfgUser
