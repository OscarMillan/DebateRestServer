const { Router } = require("express");
const { getEntregas } = require("../controllers/entregasAppController");

const router = Router();

router.get("/getEntregas/:fecha", [], getEntregas);

module.exports = router;
