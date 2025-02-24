const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//@route GET /api/admin/users
//@desc Get all users
//@access Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log('Error in fetching users : ', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


//@route POST /api/admin/add-user
//@desc Add a user
//@access Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email})
        if(user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();
        res.status(200).json({ message: 'User added successfully' , user});


    } catch (error) {
        console.log('Error in adding user : ', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//@route PUT /api/admin/users/:id
//@desc Update a user
//@access Private/Admin

router.put('/:id' , protect , admin , async (req,res) => {

    
    try {
        const {name , email , role} = req.body;
        console.log(req.body);


        const user = await User.findById(req.params.id);


        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.role = role || user.role;
        }

        const updatedUser = await user.save();
        res.json({message : 'User updated successfully' , user : updatedUser});


        
    } catch (error) {
        console.log('Error in updating user : ', error);
        res.status(500).json({message : 'Server Error'});
    }
});

//@route DELETE /api/admin/users/:id
//@desc Delete a user
//@access Private/Admin
router.delete('/:id' , protect , admin , async (req,res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        await user.deleteOne();
        res.json({message : 'User deleted successfully'});

    } catch (error) {
        console.log('Error in deleting user : ', error);
        res.status(500).json({message : 'Server Error'});
    }
});

module.exports = router;