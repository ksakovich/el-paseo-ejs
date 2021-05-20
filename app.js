const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const app = express();
console.log("STARTING THE APP");

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/sequelize');
const User = require('./models/user');
const Associations = require('./util/associations');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>
{
    User.findByPk(1).then(user =>
    {
        req.user = user;
        next();
    }).catch(err =>
    {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Associations.associate();

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) =>
    {
        return User.findByPk(1);
    })
    .then((user) =>
    {
        if (!user)
        {
            return User.create({ user_name: 'Kirill', email: 'test@test.com', is_admin: true });
        }
        return user;
    })
    .then((user) =>
    {
        user.getCart().then((cart) =>
        {
            if (cart)
            {
                return cart;
            } else
            {
                return user.createCart();
            }
        });
    })
    .then((cart) =>
    {
        return app.listen(3000);
    })
    .catch((error) =>
    {
        console.log(error);
    });