const axios = require("axios");
const sql = require("mssql");
const { getCoordenadas } = require("../services/peticiones/peticiones");

const getEntregas = async (req, res) => {
	const { fecha, usuario } = req.params;
	const url = `http://proteccln01.eldebate.com.mx:8080/ords/shi/api/reparto-suscriptores/5/${fecha}/${usuario}`;
	console.log(`fecha recibida ${fecha}`);
	console.log(`usuario ->  ${usuario}`);
	console.log(`obteniendo rutas...`);
	try {
		const response = await axios.get(url);
		const getCoord = await getCoordenadas(response.data.items);
		return res.json(getCoord);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json("Something goes wrong");
	}
};

const dbSettings = {
	user: "sa",
	password: "S3rvifact#",
	server: "100.100.62.89",
	database: "TPOINT_ElDebate",
	options: {
		trustServerCertificate: true,
		cryptoCredentialsDetails: {
			minVersion: "TLSv1",
		},
	},
};
const getLogin = async (req, res) => {
	const { body } = req;
	try {
		const pool = await sql.connect(dbSettings);
		const result = await pool
			.request()
			.query(
				`SELECT * from TPOINT_USUARIOS_REPARTO where usuario='${body.usuario}' AND contraseña='${body.password}'`
			);
		if (result.recordsets[0].length > 0) {
			return res.json(result.recordsets[0][0]);
		} else {
			return res.json(false);
		}
	} catch (e) {
		console.log(e);
		return res.json(f);
	}
};
module.exports = {
	getEntregas,
	getLogin,
};
