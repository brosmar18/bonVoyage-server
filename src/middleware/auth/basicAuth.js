const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { userCollection} = require('../../models');

const basicAuth = async (req, res, next) => {
    let { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send('No authorization header provided');
        return;
    }

    let authString = authorization.split(' ')[1];
    let decodedAuthString = base64.decode(authString);
    let [email, password] = decodedAuthString.split(':');

    console.log(`Authenticating user: ${email}`);

    let user = await userCollection.findOne({ where: { email }});

    if (user) {
        let validUser = await bcrypt.compare(password, user.password);
        console.log('Valid User: ', validUser);

        if (validUser) {
            req.user = user;
            console.log('Authentication successful, calling next();');
            next();
        } else {
            console.log('Authentication failed: password incorrect');
            res.status(403).send('Not authorized (incorrect password)');
        }
    } else {
        console.log('Authentication failed: User does not exist');
        res.status(403).send('Not Authorized (user doesn\'t exist in DB');
    }
};

module.exports = basicAuth;