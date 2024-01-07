const UserModel = require('../models/usermodel');

exports.addUser = async (req, res) => {
    try {

        if(!req.body.phone){
            throw new Error('Phone number is mandatory');
        }

        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone; 
    //   const { name, phone, email } = req.body;

    const userData = await UserModel.create({ name: name, email: email, phone: phone });
    res.status(201).json({newUserDetail: userData});
  } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.findAll();
    res.status(200).json({ allUsers });
  } catch (err) {
    // console.error(err);
    console.log('Get user is failing', JSON.stringify(err));
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// exports.deleteUser = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     await UserModel.destroy({ where: { id: userId } });
//     res.sendStatus(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await UserModel.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await UserModel.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { name, email, phone } = req.body;
  
      if (name) {
        user.name = name;
      }
  
      if (email) {
        user.email = email;
      }
  
      if (phone) {
        user.phone = phone;
      }
  
      await user.save();
  
      res.json({ message: 'User updated successfully', updatedUser: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
