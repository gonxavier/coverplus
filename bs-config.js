const history = require('connect-history-api-fallback');

module.exports = {
  server: {
    baseDir: './',
    middleware: [
      history({
        rewrites: [
          { from: /^\/blog$/, to: '/blog/index.html' },
          { from: /^\/blog\/que-hacer-seguro-accidente-transito$/, to: '/blog/que-hacer-seguro-accidente-transito.html' },
          { from: /^\/blog\/fraude-en-seguros-estrategias-efectivas$/, to: '/blog/fraude-en-seguros-estrategias-efectivas.html' },
          { from: /^\/blog\/errores-comunes-al-elegir-seguro-auto$/, to: '/blog/errores-comunes-al-elegir-seguro-auto.html' },
          { from: /^\/blog\/servicio-de-asistencia-aseguradoras$/, to: '/blog/servicio-de-asistencia-aseguradoras.html' }
        ]
      })
    ]
  }
};