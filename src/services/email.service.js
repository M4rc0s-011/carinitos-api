const transporter = require('../config/mailer')

const enviarVerificacion = async (email, nombre, token) => {
  const link = `${process.env.FRONTEND_URL}/verificar-email?token=${token}`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verifica tu cuenta — Cariñitos by Jossy',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#ffffff;font-family:sans-serif;">
        <div style="max-width:480px;margin:40px auto;padding:32px 24px;">
          <h1 style="font-size:28px;color:#3d2314;margin:0 0 16px;font-weight:600;">
            Cariñitos by Jossy
          </h1>
          <p style="font-size:15px;color:#3d2314;margin:0 0 8px;">
            ¡Hola, ${nombre}!
          </p>
          <p style="font-size:14px;color:rgba(61,35,20,0.7);line-height:1.6;margin:0 0 28px;">
            Gracias por registrarte. Haz clic en el botón para verificar tu cuenta:
          </p>
          <a href="${link}"
             style="display:inline-block;background:#3d2314;color:#fbddc3;text-decoration:none;
                    padding:12px 32px;border-radius:999px;font-size:14px;font-weight:500;">
            Verificar mi cuenta
          </a>
          <p style="font-size:12px;color:rgba(61,35,20,0.4);margin:28px 0 0;line-height:1.6;">
            Este enlace expira en 24 horas.<br>
            Si no creaste esta cuenta, puedes ignorar este mensaje.
          </p>
        </div>
      </body>
      </html>
    `,
  })
}

module.exports = { enviarVerificacion }
