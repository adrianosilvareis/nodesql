import { Model, DataTypes } from 'sequelize'

import { connection } from '../../../database'

class MdaSession extends Model {
  static init(sequelize) {
    super.init(
      {
        token: DataTypes.STRING,
        token_expiration: {
          type: DataTypes.DATE,
          get() {
            return () => this.getDataValue('token_expiration')
          }
        },
        active: {
          type: DataTypes.BOOLEAN
        }
      },
      {
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.MdaUser, { foreignKey: 'user_id', as: 'user' })
  }
}

MdaSession.init(connection)
MdaSession.associate(connection.models)

export default MdaSession
