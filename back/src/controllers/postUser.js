const { User } = require("../DB_connection");

const postUser = async (req,res) => {
    const {username, email, password} = req.body;
    if(username === "" || email === "" || password === "") res.status(400).send("Faltan datos");
try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { 
        username,
        email,
        password  
      }
    });

    if(!created) {
      return res.status(400).send('El usuario ya existe');
    }

    res.json({user});

  } catch (error) {

    res.status(500).send(error.message); 
  }
}

module.exports = postUser;