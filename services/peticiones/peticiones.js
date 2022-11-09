const axios = require("axios");
const NodeGeocoder = require("node-geocoder");
const url = "http://ora-prod.eldebate.com.mx:8080/ords/deb/shop/";

const getPendientes = async (nombre) => {
	try {
		const res = await axios.get(`${url}aprobaciones-pendientes/${nombre}`);
		return res.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const getGenerales = async (notificacion_id) => {
	try {
		const res = await axios.get(
			`${url}aprobacion-generales/${notificacion_id}`
		);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const getDetalle = async (notificacion_id) => {
	try {
		const res = await axios.get(`${url}aprobacion-detalle/${notificacion_id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const ejecutarAprobacion = async (body) => {
	try {
		const res = await axios.post(`${url}aprobacion-ejecutar/`, body);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const login = async (body) => {
	try {
		const res = await axios.post(`${url}acceso/`, body);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const options = {
	provider: "google",
	apiKey: "AIzaSyA1Vt6RwwSUWihq5ud_MX3EHQum7jvwTAQ", // for Mapquest, OpenCage, Google Premier
	formatter: null, // 'gpx', 'string', ...
};
const getCoordenadas = async (rutas) => {
	const rutasBien = rutas.filter(
		(ruta) => ruta.latitud != 0 && ruta.longitud != 0 && ruta.longitud != null
	);
	const rutasMal = rutas.filter(
		(ruta) => ruta.latitud == 0 || ruta.longitud == 0 || ruta.longitud == null
	);
	const geocoder = NodeGeocoder(options);
	const rutasCorregidas = rutasMal.map(async (ruta, i) => {
		const res = await geocoder.geocode(
			`${ruta.direccion} ${ruta.numvia} ${ruta.poblacion}`
		);

		return {
			...ruta,
			latitud: res.length > 0 ? res[0].latitude : 0,
			longitud: res.length > 0 ? res[0].longitude : 0,
			status: 0,
		};
	});
	const promesaResuelta = await Promise.all(rutasCorregidas);

	return [...promesaResuelta, ...rutasBien];
};

module.exports = {
	getPendientes,
	getGenerales,
	getDetalle,
	ejecutarAprobacion,
	login,
	getCoordenadas,
};
