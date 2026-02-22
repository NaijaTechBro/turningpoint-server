const bcrypt = require('bcryptjs');

const generateHash = async () => {
    const password = 'AdminPassword2026!'; // The password you will use in Postman
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Your hashed password is:');
    console.log(hash);
};

generateHash();