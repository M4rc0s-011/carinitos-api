const { escape } = require('validator')

const EMAIL_FIELDS = new Set(['email'])

function sanitizeValue(val, key) {
  if (typeof val === 'string') return EMAIL_FIELDS.has(key) ? val.trim() : escape(val)
  if (Array.isArray(val)) return val.map((v) => sanitizeValue(v, key))
  if (val !== null && typeof val === 'object') {
    return Object.fromEntries(
      Object.entries(val).map(([k, v]) => [k, sanitizeValue(v, k)])
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
