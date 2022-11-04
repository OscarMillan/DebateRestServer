const axios = require("axios");
const getCoordenadas = require("./../services/peticiones/peticiones");

const apiEntregas =
	"http://proteccln01.eldebate.com.mx:8080/ords/shi/api/reparto-suscriptores/5/";

const getEntregas = async (req, res) => {
	const { fecha } = req.params;
	const test = `http://proteccln01.eldebate.com.mx:8080/ords/shi/api/reparto-suscriptores/5/${fecha}/(CLN)%20JESUS%20ALBERTO%20RODRIGUEZ%20VALLE`;
	console.log(`fecha recibida ${fecha}`);
	console.log(`realizando llamada`);
	console.log(`test`);
	try {
		const response = await axios.get(test);
		console.log(response.data.items);
		//const rutasCoordenadas = await getCoordenadas(response.data.items);
		return res.json(response.data);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json("Something goes wrong");
	}
};

module.exports = {
	getEntregas,
};
