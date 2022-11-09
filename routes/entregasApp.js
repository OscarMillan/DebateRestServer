const { Router } = require("express");
const {
	getEntregas,
	getLogin,
} = require("../controllers/entregasAppController");

const router = Router();

router.get("/getEntregas/:fecha/:usuario", [], getEntregas);

router.post("/login", getLogin);

module.exports = router;
