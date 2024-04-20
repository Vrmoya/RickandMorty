const { Favorite } = require("../DB_connection");

const deleteFav = async (req, res) => {
  const { id } = req.params;

  try {
    const fav = await Favorite.findByPk(id);
    await fav.destroy();

    const favorites = await Favorite.findAll();
    res.send(favorites);

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message); 
  }
}

  module.exports = deleteFav;