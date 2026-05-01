const Usuario = require('../models/usuario.model')

const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    return res.json({ ok: true, data: usuarios })
  } catch (err) {
    console.error('[listar usuarios]', err)
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

const limpiar = async (req, res) => {
  try {
    const eliminados = await Usuario.deletePrueba()
    return res.json({ ok: true, data: { eliminados } })
  } catch (err) {
    console.error('[limpiar usuarios]', err)
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

const eliminar = async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (id === req.usuario.id) {
      return res.status(400).json({ ok: false, error: 'No puedes eliminarte a ti mismo' })
    }
    const afectados = await Usuario.deleteById(id)
    if (afectados === 0) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado o es administrador' })
    }
    return res.json({ ok: true })
  } catch (err) {
    console.error('[eliminar usuario]', err)
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' })
  }
}

module.exports = { listar, limpiar, eliminar }
