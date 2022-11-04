const express = require("express");
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();

		this.port = process.env.PORT;

		this.paths = {
			raiz: "/",
			get: "/ords/deb/shop",
			entregas: "/entregas-app",
		};

		this.middlewares();

		this.routes();
	}

	middlewares() {
		this.app.use(cors());

		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.paths.raiz, require("../routes/raiz"));
		this.app.use(this.paths.get, require("../routes/aprobaciones"));
		this.app.use(this.paths.entregas, require("../routes/entregasApp"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor corriendo en el puerto ${this.port} `);
		});
	}
}

module.exports = Server;
