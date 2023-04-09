const express= require('express');
const mongoose= require('mongoose');
const app= express();
const user= require('./models/User');
require('dotenv').config({path: './config/.env'});



app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('successfully Connected to database'))
  .catch(err => console.log(err));


// Return all users
app.get('/', async (req, res) => {
 
  try {
    const users = await user.find()
    res.status(200).json({msg:"users was found" , users })
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
});

// Add a new user to the database
app.post('/', async (req,res) =>{
   
  try {
    const addUsers = await user(req.body)
    await addUsers.save()
    res.status(200).json({msg: 'User added successfully' , addUsers})
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
})

// Edit a user by id
app.put('/:id', async (req, res) => {

  try {
    const updateUser = await user.findByIdAndUpdate(req.params.id, {...req.body})

    if (!updateUser) { return res.status(404).json({msg: 'User not found'})}
    res.status(200).json({msg: 'User updated successfully' , updateUser})
  } catch (err) {
    res.status(500).json({msg: err.message})
  }

});

// Delete a user by id
app.delete('/:id', async (req, res) => {

  try {
    const deleteUser = await user.findById(req.params.id)

    if(!deleteUser) { res.status(404).json({msg: 'User not found'})}

    res.status(200).json({msg: 'User deleted successfully'})

    await deleteUser.remove()
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
})

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, ()=> { console.log(`listening on port ${port}`)})


