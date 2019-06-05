module.exports = {
  development: {
    username: 'travelsAdmin',
    password: 'travels1234',
    database: 'My2Travels',
    host: 'localhost',
    dialect: "mysql",
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL'
  }
};