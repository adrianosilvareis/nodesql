import { Model, DataTypes } from 'sequelize'

import { connection } from '../../../database'

class MdaUser extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        validation_token: {
          type: DataTypes.STRING,
          get() {
            return () => this.getDataValue('validation_token')
          }
        },
        token_expiration: {
          type: DataTypes.DATE,
          get() {
            return () => this.getDataValue('token_expiration')
          }
        },
        password: {
          type: DataTypes.STRING,
          get() {
            return () => this.getDataValue('password')
          }
        },
        active_account: DataTypes.BOOLEAN
      },
      {
        sequelize
      }
    )
  }
}

MdaUser.init(connection)

export default MdaUser
