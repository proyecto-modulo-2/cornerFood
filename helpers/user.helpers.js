const hbs = require('hbs');

hbs.registerHelper('hasRole', (user, role, options) => {
  if (user.role !== undefined) {
    if (user.role === role) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  } else {
  return options.fn(this);
}
})