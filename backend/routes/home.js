const secrets = require('../config/secrets');

const router = require('express').Router();

// router.use('/users', require('./users.js')(router));
// router.use('/tasks', require('./tasks.js')(router));
router.get('/', function (req, res) {
    // return res.send({router:"home", route:req.route});
    var connectionString = secrets.token;
    res.json({ message: 'My connection string is ' + connectionString });
});
// router.use('/users', require('./users.js'));
router.use('/recipes', require('./recipes.js'));


module.exports = router;