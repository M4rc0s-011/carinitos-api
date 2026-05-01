const { Router } = require('express')
const ctrl = require('../controllers/usuarios.controller')
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware')

const router = Router()

router.get('/',              verificarToken, soloAdmin, ctrl.listar)
router.delete('/limpiar',    verificarToken, soloAdmin, ctrl.limpiar)
router.delete('/:id',        verificarToken, soloAdmin, ctrl.eliminar)

module.exports = router
