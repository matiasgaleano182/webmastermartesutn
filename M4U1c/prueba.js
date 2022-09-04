const moment = require('moment');
moment.locale('es')
console.log('naci ' + moment('08/10/1986', 'DD/MM/YYYY').fromNow())