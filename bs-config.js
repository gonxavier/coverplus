const history = require('connect-history-api-fallback');

module.exports = {
  server: {
    baseDir: './',
    middleware: [
      history({
        rewrites: [
          { from: /^\/faq\/?$/, to: '/faq/index.html' },
          { from: /^\/contacto\/?$/, to: '/contacto/index.html' },
          { from: /^\/coberturas\/?$/, to: '/coberturas/index.html' },
          { from: /^\/coberturas\/auto\/?$/, to: '/coberturas/auto/index.html' },
          { from: /^\/coberturas\/hogar\/?$/, to: '/coberturas/hogar/index.html' },
          { from: /^\/coberturas\/moto\/?$/, to: '/coberturas/moto/index.html' },
          { from: /^\/blog\/?$/, to: '/blog/index.html' },
          { from: /^\/blog\/que-hacer-seguro-accidente-transito$/, to: '/blog/que-hacer-seguro-accidente-transito.html' },
          { from: /^\/blog\/fraude-en-seguros-estrategias-efectivas$/, to: '/blog/fraude-en-seguros-estrategias-efectivas.html' },
          { from: /^\/blog\/errores-comunes-al-elegir-seguro-auto$/, to: '/blog/errores-comunes-al-elegir-seguro-auto.html' },
          { from: /^\/blog\/servicio-de-asistencia-aseguradoras$/, to: '/blog/servicio-de-asistencia-aseguradoras.html' },
          { from: /^\/blog\/ranking-ventas-autos-agosto-2025$/, to: '/blog/ranking-ventas-autos-agosto-2025.html' },
          { from: /^\/blog\/freelance-a-pymes-proteccion-de-tu-negocio$/, to: '/blog/freelance-a-pymes-proteccion-de-tu-negocio.html' }
        ]
      })
    ]
  }
};