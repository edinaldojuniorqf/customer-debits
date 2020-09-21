module.exports = {
  type: 'mongodb',
  host: 'localhost',
  port: '27017',
  // username: '',
  password: '123',
  database: 'customer-debts',
  useUnifiedTopology: true,
  entities: [
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
      ? './src/modules/**/infra/typeorm/schemas/*.ts'
      : 'dist/modules/**/infra/**/typeorm/schemas/*.js',
  ],
};
