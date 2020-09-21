module.exports = {
  "type": "mongodb",
  "host": "localhost",
  "port": "27017",
  "username": "",
  "password": "",
  "database": "customer-debts",
  "useUnifiedTopology": true,
  "entities": ["./src/modules/**/infra/typeorm/schemas/*.ts"],
}
