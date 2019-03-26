module.exports = process.env.NODE_ENV === 'production' ? require('./production.config') : (process.env.NODE_ENV === 'development' ? require('./env.config') : require('./local.config'))
