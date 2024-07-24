const User = require('../model/signup');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretOrPrivateKey = 'GCD@18'; 
// Sign-up user
exports.signUp = async (req, res) => {
    const { name,email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password, name });
        await user.save();

        // const token = jwt.sign({ id: user._id }, secretOrPrivateKey, { expiresIn: '1h' });

        res.status(201).json( 'User sign up sucessfully' );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Log-in user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, secretOrPrivateKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
