const { getPendientes, getGenerales, getDetalle,login,ejecutarAprobacion } = require("../services/peticiones/peticiones")

const getController = async (req, res) => {
    try {

        const { nombre } = req.params

        console.log("Creando peticion...")

        const api = await getPendientes(nombre)

        console.log("respuesta ")
        console.log(api)
        
        res.json(api)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}


const getAprobacionGenerales = async (req, res) => {
    try {

        const { notificacion_id } = req.params

        const api = await getGenerales(notificacion_id)

        res.json(api)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getAprobacionDetalle = async (req, res) => {
    try {

        const { notificacion_id } = req.params

        const api = await getDetalle(notificacion_id)

        res.json(api)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const aprobacionEjecutar = async (req, res) => {
    try {

        const { body } = req
        
        const api = await ejecutarAprobacion(body)

        res.json(api)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const acceso = async (req, res) => {
    try {
        const { body } = req
        
        const api = await login(body)

        res.json(api)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    getController,
    getAprobacionGenerales,
    getAprobacionDetalle,
    aprobacionEjecutar,
    acceso
}