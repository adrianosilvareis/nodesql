'use strict'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('mda_users', [
      {
        username: 'admin',
        email: 'admin@email.com',
        password:
          '$2b$10$Rb/ExinIBy3FrlVcVcQsUe7e.radLPKOFgGkAisvAkrM5Zs0WAHCq', // Administration@1
        active_account: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('mda_users', null, {})
  }
}
