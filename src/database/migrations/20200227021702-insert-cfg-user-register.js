'use strict'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cfg_users', [
      {
        key: 'session_limit',
        value: '3',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cfg_users', null, {})
  }
}
