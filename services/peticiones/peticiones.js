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

const getCoordenadas = (rutas) => {
	const geocoder = NodeGeocoder(options);
	const nuevas = rutas.map(async (ruta, i) => {
		const res = await geocoder.geocode(
			`${ruta.direccion} ${ruta.numvia} ${ruta.poblacion}`
		);

		return {
			...ruta,
			latitude: res.length > 0 ? res[0].latitude : 0,
			longitude: res.length > 0 ? res[0].longitude : 0,
			status: 0,
		};
	});
	return Promise.all(nuevas)
		.then((result) => result)
		.catch((e) => e);
};

module.exports = {
	getPendientes,
	getGenerales,
	getDetalle,
	ejecutarAprobacion,
	login,
	getCoordenadas,
};
