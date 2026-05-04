require('dotenv').config()
const { Resend } = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY)

resend.emails.send({
  from: 'Carinitos <noreply@xn--cariitosbyjossy-1qb.com>',
  to: 'marcosrodriguez9856@gmail.com',
  subject: 'Test email',
  html: '<p>Test</p>'
}).then(r => console.log('Respuesta:', JSON.stringify(r))).catch(e => console.error('Error:', e))
