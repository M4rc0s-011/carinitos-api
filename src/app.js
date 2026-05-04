const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRoutes       = require('./routes/auth.routes')
const productosRoutes  = require('./routes/productos.routes')
const categoriasRoutes = require('./routes/categorias.routes')
const pedidosRoutes    = require('./routes/pedidos.routes')
const usuariosRoutes   = require('./routes/usuarios.routes')
const carritoRoutes    = require('./routes/carrito.routes')
const { apiLimiter }   = require('./middlewares/rateLimit.middleware')
const sanitize         = require('./middlewares/sanitize.middleware')

const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.set('Access-Control-Allow-Credentials', 'true')
  res.set('Access-Control-Max-Age', '86400')
  res.sendStatus(204)
})
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:5173',
      'https://xn--cariitosbyjossy-1qb.com',
      process.env.FRONTEND_URL,
    ]
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  maxAge: 86400,
}))
app.use(express.json())
app.use(apiLimiter)
app.use(sanitize)

app.use('/api/auth',       authRoutes)
app.use('/api/productos',  productosRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/pedidos',    pedidosRoutes)
app.use('/api/usuarios',   usuariosRoutes)
app.use('/api/carrito',    carritoRoutes)

app.get('/', (req, res) => res.json({ mensaje: 'API Cariñitos funcionando' }))

module.exports = app
