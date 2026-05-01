const { escape } = require('validator')

function sanitizeValue(val) {
  if (typeof val === 'string') return escape(val)
  if (Array.isArray(val)) return val.map(sanitizeValue)
  if (val !== null && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val).map(([k, v]) => [k, sanitizeValue(v)])
    )
  }
  return val
}

module.exports = (req, res, next) => {
  req.body   = sanitizeValue(req.body)
  req.params = sanitizeValue(req.params)
  req.query  = sanitizeValue(req.query)
  next()
}
