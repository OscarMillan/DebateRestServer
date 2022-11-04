const { Router } = require("express")
const { getController, getAprobacionGenerales,aprobacionEjecutar,acceso } = require("../controllers/aprobaciones")

const router = Router();


router.get("/aprobaciones-pendientes/:nombre", getController)

router.get("/aprobacion-generales/:notificacion_id", getAprobacionGenerales)

router.get("/aprobacion-detalle/:notificacion_id", getAprobacionGenerales)

router.post("/aprobacion-ejecutar", aprobacionEjecutar)

router.post("/acceso", acceso)




module.exports = router