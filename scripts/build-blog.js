/**
 * Cover+ Blog Builder
 * Fetches all published blogPost entries from Contentful and regenerates:
 *   - blog/[slug].html  (one per post)
 *   - blog/index.html   (listing page)
 *
 * Usage:
 *   node scripts/build-blog.js
 *
 * Env vars (in scripts/.env):
 *   SPACE_ID
 *   DELIVERY_TOKEN   ← Contentful Delivery API token (read-only, public)
 */

try { require('dotenv').config({ path: __dirname + '/.env' }); } catch (e) {}
const fs = require('fs');
const path = require('path');

const SPACE_ID = process.env.SPACE_ID;
const DELIVERY_TOKEN = process.env.DELIVERY_TOKEN;

if (!SPACE_ID || !DELIVERY_TOKEN) {
  console.error('Missing SPACE_ID or DELIVERY_TOKEN in scripts/.env');
  process.exit(1);
}

const BLOG_DIR = path.join(__dirname, '../blog');

// ─── Contentful Delivery API fetch ───────────────────────────────────────────

async function fetchPosts() {
  const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=blogPost&include=2&order=-fields.publishedDate&limit=200`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${DELIVERY_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Contentful error: ${res.status} ${await res.text()}`);
  const data = await res.json();

  // Build author lookup from includes
  const authorMap = {};
  for (const item of data.includes?.Entry || []) {
    if (item.sys.contentType.sys.id === 'author') {
      authorMap[item.sys.id] = item.fields.name || '';
    }
  }

  // Build asset URL lookup from includes
  const assetMap = {};
  for (const asset of data.includes?.Asset || []) {
    assetMap[asset.sys.id] = 'https:' + (asset.fields.file?.url || '');
  }

  return data.items.map((item) => {
    const f = item.fields;
    const authorId = f.author?.sys?.id;
    const desktopAssetId = f.heroImageDesktop?.sys?.id;
    const mobileAssetId = f.heroImageMobile?.sys?.id;
    return {
      title: f.title || '',
      slug: f.slug || '',
      publishedDate: f.publishedDate || '',
      author: authorMap[authorId] || 'Gonzalo Domínguez',
      metaTitle: f.metaTitle || '',
      metaDescription: f.metaDescription || '',
      heroImageDesktopUrl: desktopAssetId ? assetMap[desktopAssetId] : (f.heroImageDesktopUrl || ''),
      heroImageMobileUrl: mobileAssetId ? assetMap[mobileAssetId] : (f.heroImageMobileUrl || ''),
      body: f.body || null,
    };
  });
}

// ─── Rich Text → HTML ─────────────────────────────────────────────────────────

function richTextToHtml(node) {
  if (!node) return '';

  if (node.nodeType === 'document') {
    return node.content.map(richTextToHtml).join('\n');
  }
  if (node.nodeType === 'paragraph') {
    const inner = node.content.map(inlineToHtml).join('');
    return `<p>${inner}</p>`;
  }
  if (node.nodeType === 'heading-2') {
    const inner = node.content.map(inlineToHtml).join('');
    return `<h2>${inner}</h2>`;
  }
  if (node.nodeType === 'heading-3') {
    const inner = node.content.map(inlineToHtml).join('');
    return `<h3>${inner}</h3>`;
  }
  if (node.nodeType === 'blockquote') {
    const inner = node.content.map(richTextToHtml).join('');
    return `<div class="blockquote">${inner}</div>`;
  }
  if (node.nodeType === 'unordered-list') {
    const items = node.content.map((li) => `<li>${li.content.map(richTextToHtml).join('')}</li>`).join('');
    return `<ul>${items}</ul>`;
  }
  if (node.nodeType === 'ordered-list') {
    const items = node.content.map((li) => `<li>${li.content.map(richTextToHtml).join('')}</li>`).join('');
    return `<ol>${items}</ol>`;
  }
  if (node.nodeType === 'list-item') {
    return node.content.map(richTextToHtml).join('');
  }
  if (node.nodeType === 'hr') {
    return '<hr>';
  }
  return '';
}

function inlineToHtml(node) {
  if (node.nodeType === 'text') {
    let text = escapeHtml(node.value);
    if (node.marks) {
      for (const mark of node.marks) {
        if (mark.type === 'bold') text = `<strong>${text}</strong>`;
        if (mark.type === 'italic') text = `<em>${text}</em>`;
        if (mark.type === 'underline') text = `<u>${text}</u>`;
        if (mark.type === 'code') text = `<code>${text}</code>`;
      }
    }
    return text;
  }
  if (node.nodeType === 'hyperlink') {
    const href = node.data?.uri || '#';
    const inner = node.content.map(inlineToHtml).join('');
    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }
  return '';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatDateEs(isoDate) {
  const [year, month, day] = isoDate.split('T')[0].split('-').map(Number);
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${day} de ${months[month - 1]} de ${year}`;
}

// ─── HTML templates ───────────────────────────────────────────────────────────

const HEAD = (metaTitle, metaDescription, slug, ogImage = '', post = {}) => `<!DOCTYPE html>
<html lang="es-AR">

<!--------------------------------------------------------------------------------------------------------->
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <!-- CANONICAL TAG -->
    <link rel="canonical" href="https://coverplus.com.ar/blog/${slug}"/>
    <link rel="alternate" hreflang="es-AR" href="https://coverplus.com.ar/blog/${slug}" />
    <link rel="alternate" hreflang="x-default" href="https://coverplus.com.ar/blog/${slug}" />
    <meta name="robots" content="index, follow">
    <title>${metaTitle}</title>
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@cover.ar" />
    <meta name="twitter:title" content="${metaTitle}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://coverplus.com.ar/blog/${slug}" />
    <meta property="og:description" content="${metaDescription}" />
    <meta property="og:image" content="${ogImage}" />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M57L49HQ');</script>
    <!-- End Google Tag Manager -->

    <!-- Favicons -->
    <link href="../assets/img/favicon.png" rel="icon">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="../assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="../assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="../assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Main CSS File -->
    <link href="../assets/css/main.css" rel="stylesheet">
    <link href="../assets/css/estilos-propios.css" rel="stylesheet">

    <!-- Post CSS File -->
    <link rel="stylesheet" href="../assets/css/post-styles.css">

    <!-- FONT AWESOME -->
    <script src="https://kit.fontawesome.com/09674008a9.js" crossorigin="anonymous"></script>

    <!-- Schema: Article -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${metaTitle}",
      "description": "${metaDescription}",
      "image": "${ogImage}",
      "datePublished": "${post.publishedDate || ''}",
      "dateModified": "${post.publishedDate || ''}",
      "author": {
        "@type": "Person",
        "name": "${post.author || 'Gonzalo Domínguez'}",
        "jobTitle": "Productor Asesor de Seguros"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cover+",
        "logo": {
          "@type": "ImageObject",
          "url": "https://coverplus.com.ar/assets/img/c-header-new.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://coverplus.com.ar/blog/${slug}"
      }
    }
    </script>

    <!-- Schema: BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://coverplus.com.ar/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://coverplus.com.ar/blog" },
        { "@type": "ListItem", "position": 3, "name": "${metaTitle}", "item": "https://coverplus.com.ar/blog/${slug}" }
      ]
    }
    </script>

</head>`;

const BODY_OPEN = () => `
<!--------------------------------------------------------------------------------------------------------->
<body class="index-page">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M57L49HQ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- WP ICON -->
    <a href="https://wa.me/5491140275158" target="_blank" class="wp-float">
        <i class="fa-brands fa-whatsapp"></i>
    </a><!-- /WP ICON -->

<!--------------------------------------------------------------------------------------------------------->

<div data-component="header"></div>

<!--------------------------------------------------------------------------------------------------------->`;

const FOOTER = () => `
<!--------------------------------------------------------------------------------------------------------->
<footer id="footer" class="footer">

    <div class="container footer-top">
        <div class="row gy-4">
            <div class="col-lg-4 col-md-6 footer-about">
            <a href="/" class="d-flex align-items-center">
            <img src="/assets/img/c-header-new.png" alt="Logo de Cover+, asesoramiento en seguros personalizado y digital" width="150px">
            </a>
            <div class="footer-contact pt-3">
            <p>Av. Santa Fe 768</p>
            <p>1059 - Ciudad Autónoma de Buenos Aires</p>
            <p><strong>Email:</strong> <span>info@coverplus.com.ar</span></p>
            </div>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
            <h4>Enlaces útiles</h4>
            <ul>
            <li><i class="bi bi-chevron-right"></i> <a href="/#hero">Inicio</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="/#about">Quienes Somos</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="/#services">Servicios</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="/#faq-2">FAQ</a></li>
            </ul>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
            <h4>Links de Interés</h4>
            <ul>
                <li><i class="bi bi-chevron-right"></i> <a href="https://www.argentina.gob.ar/superintendencia-de-seguros" rel="noopener noreferrer" target="_blank">Superintendencia de Seguros de la Nación</a></li>
                <li><i class="bi bi-chevron-right"></i> <a href="https://www.ssn.gob.ar/storage/registros/productores/productoresactivosfiltro.asp" rel="noopener noreferrer" target="_blank">Consulta de Matrícula</a></li>
                <li><i class="bi bi-chevron-right"></i> <a href="https://www.cleas.com.ar/" rel="noopener noreferrer" target="_blank">Portal CLEAS</a></li>
            </ul>
        </div>

        <div class="col-lg-4 col-md-12">
            <h4>Seguinos en redes</h4>
            <p>Para estar al día de todas las novedades y promociones</p>
            <div class="social-links d-flex">
            <a href="https://www.instagram.com/coverplus.ar/" target="_blank" aria-label="Ir al Instagram de Cover+"><i class="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/company/coverplusar/" target="_blank" aria-label="Ir al LinkedIn de Cover+"><i class="bi bi-linkedin"></i></a>
            </div>
        </div>

    </div>
    </div>

    <div class="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong class="px-1 sitename">Gonzalo Javier Domínguez</strong> <br> <span>Productor Asesor de Seguros (Mat SSN N°: 93065)</span></p>
    </div>

</footer>

<!-- Scroll Top -->
<a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Preloader -->
<div id="preloader"></div>

<!-- Main JS File -->
<script src="../assets/js/components.js"></script>
<script src="../assets/js/main.js"></script>

</body>
</html>`;

// ─── Generate post HTML ───────────────────────────────────────────────────────

function generatePostHtml(post) {
  const bodyHtml = richTextToHtml(post.body);
  const dateFormatted = formatDateEs(post.publishedDate);
  const desktopImg = post.heroImageDesktopUrl || '';
  const mobileImg = post.heroImageMobileUrl || '';

  return [
    HEAD(post.metaTitle, post.metaDescription, post.slug, desktopImg, post),
    BODY_OPEN(),
    `
    <section class="article-container">
        <div class="article">
            <div class="article-header">
                <h1 class="article-title">${escapeHtml(post.title)}</h1>
                <p class="article-meta">Publicado el ${dateFormatted} | Por ${escapeHtml(post.author)}</p>
            </div>

            <div class="article-content">
                ${desktopImg ? `<img class="img-desk" src="${escapeHtml(desktopImg)}" alt="${escapeHtml(post.title)}">` : ''}
                ${mobileImg ? `<img class="img-mobile" src="${escapeHtml(mobileImg)}" alt="${escapeHtml(post.title)}">` : ''}

                ${bodyHtml}
            </div>
        </div>
    </section>`,
    FOOTER(),
  ].join('\n');
}

// ─── Generate blog index HTML ─────────────────────────────────────────────────

function generateIndexHtml(posts) {
  const cards = posts.map((post) => {
    const dateFormatted = formatDateEs(post.publishedDate);
    const img = post.heroImageMobileUrl || '';
    return `
        <!-- ARTICLE CARD ---------------------------------------->
        <div class="card">
            <a href="/blog/${post.slug}" class="card-link">
            ${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(post.title)}">` : ''}
            <div class="card-content">
                <h2 class="card-title">${escapeHtml(post.title)}</h2>
                <p class="card-date">${dateFormatted}</p>
                <p class="card-description">${escapeHtml(post.metaDescription)}</p>
            </div>
            </a>
        </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="es-AR">

<!--------------------------------------------------------------------------------------------------------->
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link rel="canonical" href="https://coverplus.com.ar/blog/"/>
    <link rel="alternate" hreflang="es-AR" href="https://coverplus.com.ar/blog/" />
    <link rel="alternate" hreflang="x-default" href="https://coverplus.com.ar/blog/" />
    <meta name="robots" content="index, follow">
    <title>Todo lo Que Tenés Que Saber Sobre Seguros | Blog | Cover+</title>
    <meta name="description" content="Artículos informativos sobre seguros personalizados, consejos prácticos y novedades del sector para proteger lo que más valorás">
    <meta name="keywords" content="">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@cover.ar" />
    <meta name="twitter:title" content="Todo lo Que Tenés Que Saber Sobre Seguros | Blog | Cover+" />
    <meta property="og:url" content="https://coverplus.com.ar/blog" />
    <meta property="og:description" content="Artículos informativos sobre seguros personalizados, consejos prácticos y novedades del sector para proteger lo que más valorás." />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M57L49HQ');</script>
    <!-- End Google Tag Manager -->

    <link href="/assets/img/favicon.png" rel="icon">
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="/assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
    <link href="/assets/css/main.css" rel="stylesheet">
    <link href="/assets/css/estilos-propios.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/blog-styles.css">
    <script src="https://kit.fontawesome.com/09674008a9.js" crossorigin="anonymous"></script>
</head>

<!--------------------------------------------------------------------------------------------------------->
<body class="index-page">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M57L49HQ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <a href="https://wa.me/5491140275158" target="_blank" class="wp-float">
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <div data-component="header"></div>

    <main class="blog-container">
        <div class="blog-title"><h1>Todo lo Que Tenés Que Saber Sobre <strong>Seguros</strong></h1></div>
        <section>
        ${cards}
        </section>
    </main>

    <footer id="footer" class="footer">
        <div class="container footer-top">
            <div class="row gy-4">
                <div class="col-lg-4 col-md-6 footer-about">
                <a href="/" class="d-flex align-items-center">
                <img src="/assets/img/c-header-new.png" alt="Logo de Cover+, asesoramiento en seguros personalizado y digital" width="150px">
                </a>
                <div class="footer-contact pt-3">
                <p>Av. Santa Fe 768</p>
                <p>1059 - Ciudad Autónoma de Buenos Aires</p>
                <p><strong>Email:</strong> <span>info@coverplus.com.ar</span></p>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 footer-links">
                <h4>Enlaces útiles</h4>
                <ul>
                <li><i class="bi bi-chevron-right"></i> <a href="/#hero">Inicio</a></li>
                <li><i class="bi bi-chevron-right"></i> <a href="/#about">Quienes Somos</a></li>
                <li><i class="bi bi-chevron-right"></i> <a href="/#services">Servicios</a></li>
                <li><i class="bi bi-chevron-right"></i> <a href="/#faq-2">FAQ</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-3 footer-links">
                <h4>Links de Interés</h4>
                <ul>
                    <li><i class="bi bi-chevron-right"></i> <a href="https://www.argentina.gob.ar/superintendencia-de-seguros" rel="noopener noreferrer" target="_blank">Superintendencia de Seguros de la Nación</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="https://www.ssn.gob.ar/storage/registros/productores/productoresactivosfiltro.asp" rel="noopener noreferrer" target="_blank">Consulta de Matrícula</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="https://www.cleas.com.ar/" rel="noopener noreferrer" target="_blank">Portal CLEAS</a></li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-12">
                <h4>Seguinos en redes</h4>
                <p>Para estar al día de todas las novedades y promociones</p>
                <div class="social-links d-flex">
                <a href="https://www.instagram.com/coverplus.ar/" target="_blank" aria-label="Ir al Instagram de Cover+"><i class="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/coverplusar/" target="_blank" aria-label="Ir al LinkedIn de Cover+"><i class="bi bi-linkedin"></i></a>
                </div>
            </div>
            </div>
        </div>
        <div class="container copyright text-center mt-4">
            <p>© <span>Copyright</span> <strong class="px-1 sitename">Gonzalo Javier Domínguez</strong> <br> <span>Productor Asesor de Seguros (Mat SSN N°: 93065)</span></p>
        </div>
    </footer>

    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
    <div id="preloader"></div>
    <script src="/assets/js/components.js"></script>
    <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching posts from Contentful...');
  const posts = await fetchPosts();
  console.log(`Found ${posts.length} posts.`);

  for (const post of posts) {
    if (!post.slug) { console.warn('  ⚠ Skipping post with no slug'); continue; }
    const html = generatePostHtml(post);
    const outPath = path.join(BLOG_DIR, `${post.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    console.log(`  ✓ ${post.slug}.html`);
  }

  const indexHtml = generateIndexHtml(posts);
  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), indexHtml, 'utf8');
  console.log('  ✓ index.html');

  console.log('\nBlog build complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
