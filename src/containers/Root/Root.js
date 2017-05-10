console.log('in root');
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod'); // eslint-disable-line global-require
} else {
    module.exports = require('./Root.dev'); // eslint-disable-line global-require
}
