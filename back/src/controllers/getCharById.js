const axios = require('axios');
const URL =  "https://rym2.up.railway.app/api/character/"
const APIKEY = "pi-vrmoya"



const getCharById = async (req, res) => {
  // const { id }  = req.params;
  const id = Number(req.params.id);

  try {
    const { data } = await axios(`${URL}${id}?key=${APIKEY}`);
    const { name, status, gender, species, origin, image } = data;
    const character = { id, name, status, gender, species, origin, image };

    return character.name
      ? res.status(200).json(character)
      : res.status(404).send('Personaje no encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCharById;

// const getCharById = (res, id) => {
//   const getCharById = (req, res) => {
//     // const { id }  = req.params;
//     const id = Number(req.params.id);
  
//     axios(`${URL}${id}?key=${API_KEY}`)
//       .then(({ data }) => {
//         const { name, status, gender, species, origin, image } = data;
//         const character = { id, name, status, gender, species, origin, image };
  
//         return character.name
//           ? res.status(200).json(character)
//           : res.status(404).send('Not found');
//       })
//       .catch((error) => {
//         res.status(500).json({ error: error.message });
//       });
//   };
// }


// module.exports = getCharById;







// const getCharById = (res, id) => {
//  axios(`https://rym2.up.railway.app/api/character/${id}?key=pi-vrmoya`)
//     .then(({data}) => {
      
//       const {name, gender, species, origin, image, status} = data;
//       const character =  {id, name, gender, species, origin, image, status};
      
//       res.writeHead(200, {"Content-Type": "Application/json"})
//       return res.end(JSON.stringify(character))
//     }) 
    
    
//     .catch((error) => {
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         return res.end(error.message);
//     });
// }

// module.exports = getCharById;