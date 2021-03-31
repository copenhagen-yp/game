module.exports = {
  'development': {
    'host': 'postgres',
    'port': 5432,
    'username': 'root',
    'password': 'rootPassword',
    'database': 'postgres-db',
    'dialect': 'postgres'
  },
  'production': {
    'host': process.env.POSTGRES_HOST,
    'port': process.env.POSTGRES_PORT,
    'username': process.env.POSTGRES_USER,
    'password': process.env.POSTGRES_PASSWORD,
    'database': process.env.POSTGRES_DATABASE,
    'dialect': 'postgres'
  }
};
