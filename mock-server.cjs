const http = require('http');
const url = require('url');

// Template de Admissao para demonstracao
const admissionTemplateData = {
  root: {
    props: {
      primaryColor: '#3B9EEB',
      secondaryColor: '#10B981',
      backgroundColor: '#F8FAFC',
      textColor: '#1E293B',
      fontFamily: 'Inter, sans-serif',
    },
  },
  content: [
    {
      type: 'Hero',
      props: {
        id: 'hero-1',
        title: 'Processo Seletivo 2026',
        subtitle: 'Inscricoes abertas para o primeiro semestre. De o primeiro passo para transformar sua carreira.',
        backgroundImage: '',
        backgroundColor: '#3B9EEB',
        textColor: '#FFFFFF',
        buttonColor: '#10B981',
        backgroundOverlay: false,
        ctaText: 'Iniciar Inscricao',
        ctaLink: '#form',
        alignment: 'center',
        height: 'large',
      },
    },
    {
      type: 'Stats',
      props: {
        id: 'stats-1',
        title: '',
        stats: [
          { value: '15.000', label: 'Alunos formados', prefix: '+', suffix: '' },
          { value: '98', label: 'Empregabilidade', prefix: '', suffix: '%' },
          { value: '45', label: 'Anos de historia', prefix: '', suffix: '' },
          { value: 'A', label: 'Nota MEC', prefix: '', suffix: '' },
        ],
        columns: '4',
        customBgColor: '#1E3A5F',
        customTextColor: '#FFFFFF',
      },
    },
    {
      type: 'Features',
      props: {
        id: 'features-1',
        title: 'Por que escolher nossa instituicao?',
        subtitle: 'Oferecemos formacao completa para os desafios do mercado',
        features: [
          { icon: 'GraduationCap', title: 'Excelencia Academica', description: 'Corpo docente qualificado com experiencia de mercado' },
          { icon: 'Target', title: 'Foco no Mercado', description: 'Curriculo atualizado com as demandas das empresas' },
          { icon: 'Award', title: 'Reconhecimento', description: 'Diploma valorizado e reconhecido pelo MEC' },
        ],
        columns: '3',
      },
    },
    {
      type: 'AdmissionForm',
      props: {
        id: 'form-1',
        mockMode: true,
        processId: '',
        institutionName: 'Universidade Orchestra',
        title: 'Faca sua Inscricao',
        description: 'Preencha o formulario para iniciar seu processo de admissao.',
        backgroundColor: 'muted',
        padding: 'lg',
        accentColor: '#3B9EEB',
        buttonColor: '#10B981',
      },
    },
  ],
};

const landingPages = [
  {
    id: '1',
    tenantId: 'tenant-1',
    companyId: 'company-1',
    name: 'Processo Seletivo 2025',
    slug: 'processo-seletivo-2025',
    description: 'Landing page para o processo seletivo 2025',
    puckData: admissionTemplateData,
    seoTitle: 'Processo Seletivo 2025 - Universidade Orchestra',
    seoDescription: 'Inscreva-se no processo seletivo e transforme sua carreira',
    status: 'published',
    publishedAt: '2025-01-16T08:00:00Z',
    formConfig: { enabled: true, notificationEmails: ['admin@test.com'] },
    viewsCount: 1250,
    submissionsCount: 89,
    version: 1,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-18T14:30:00Z'
  },
  {
    id: '2',
    tenantId: 'tenant-1',
    companyId: 'company-1',
    name: 'Vestibular Medicina',
    slug: 'vestibular-medicina',
    description: 'Vestibular para o curso de Medicina',
    puckData: { content: [], root: { props: {} } },
    seoTitle: 'Vestibular Medicina 2025',
    status: 'draft',
    formConfig: { enabled: true },
    viewsCount: 0,
    submissionsCount: 0,
    version: 1,
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-01-17T11:00:00Z'
  },
  {
    id: '3',
    tenantId: 'tenant-1',
    companyId: 'company-1',
    name: 'MBA Executivo',
    slug: 'mba-executivo',
    description: 'Programa de MBA Executivo',
    puckData: { content: [], root: { props: {} } },
    seoTitle: 'MBA Executivo',
    status: 'published',
    publishedAt: '2025-01-06T12:00:00Z',
    formConfig: { enabled: true },
    viewsCount: 890,
    submissionsCount: 45,
    version: 2,
    createdAt: '2025-01-05T08:00:00Z',
    updatedAt: '2025-01-19T10:00:00Z'
  }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /landing-pages
  if (pathname === '/landing-pages' && req.method === 'GET') {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = landingPages.slice(start, end);

    res.writeHead(200);
    res.end(JSON.stringify({
      data: paginatedData,
      total: landingPages.length,
      page: page,
      limit: limit
    }));
    return;
  }

  // GET /landing-pages/:id
  const match = pathname.match(/^\/landing-pages\/([^\/]+)$/);
  if (match && req.method === 'GET') {
    const id = match[1];
    const page = landingPages.find(p => p.id === id);
    if (page) {
      res.writeHead(200);
      res.end(JSON.stringify(page));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // POST /landing-pages
  if (pathname === '/landing-pages' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const input = JSON.parse(body);
      const newPage = {
        id: String(landingPages.length + 1),
        tenantId: 'tenant-1',
        companyId: 'company-1',
        name: input.name,
        slug: input.slug,
        description: input.description || '',
        puckData: input.puckData || { content: [], root: { props: {} } },
        seoTitle: input.seoTitle || input.name,
        seoDescription: input.seoDescription || '',
        status: 'draft',
        formConfig: { enabled: true },
        viewsCount: 0,
        submissionsCount: 0,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      landingPages.push(newPage);
      res.writeHead(201);
      res.end(JSON.stringify(newPage));
    });
    return;
  }

  // PUT /landing-pages/:id
  const updateMatch = pathname.match(/^\/landing-pages\/([^\/]+)$/);
  if (updateMatch && req.method === 'PUT') {
    const id = updateMatch[1];
    const pageIndex = landingPages.findIndex(p => p.id === id);
    if (pageIndex !== -1) {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const input = JSON.parse(body);
        landingPages[pageIndex] = { ...landingPages[pageIndex], ...input, updatedAt: new Date().toISOString() };
        res.writeHead(200);
        res.end(JSON.stringify(landingPages[pageIndex]));
      });
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // DELETE /landing-pages/:id
  const deleteMatch = pathname.match(/^\/landing-pages\/([^\/]+)$/);
  if (deleteMatch && req.method === 'DELETE') {
    const id = deleteMatch[1];
    const pageIndex = landingPages.findIndex(p => p.id === id);
    if (pageIndex !== -1) {
      landingPages.splice(pageIndex, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // POST /landing-pages/:id/publish
  const publishMatch = pathname.match(/^\/landing-pages\/([^\/]+)\/publish$/);
  if (publishMatch && req.method === 'POST') {
    const id = publishMatch[1];
    const pageIndex = landingPages.findIndex(p => p.id === id);
    if (pageIndex !== -1) {
      landingPages[pageIndex].status = 'published';
      landingPages[pageIndex].publishedAt = new Date().toISOString();
      landingPages[pageIndex].updatedAt = new Date().toISOString();
      res.writeHead(200);
      res.end(JSON.stringify(landingPages[pageIndex]));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // POST /landing-pages/:id/unpublish
  const unpublishMatch = pathname.match(/^\/landing-pages\/([^\/]+)\/unpublish$/);
  if (unpublishMatch && req.method === 'POST') {
    const id = unpublishMatch[1];
    const pageIndex = landingPages.findIndex(p => p.id === id);
    if (pageIndex !== -1) {
      landingPages[pageIndex].status = 'draft';
      landingPages[pageIndex].updatedAt = new Date().toISOString();
      res.writeHead(200);
      res.end(JSON.stringify(landingPages[pageIndex]));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // POST /landing-pages/:id/duplicate
  const duplicateMatch = pathname.match(/^\/landing-pages\/([^\/]+)\/duplicate$/);
  if (duplicateMatch && req.method === 'POST') {
    const id = duplicateMatch[1];
    const page = landingPages.find(p => p.id === id);
    if (page) {
      const newPage = {
        ...page,
        id: String(landingPages.length + 1),
        name: page.name + ' (Copy)',
        slug: page.slug + '-copy',
        status: 'draft',
        publishedAt: undefined,
        viewsCount: 0,
        submissionsCount: 0,
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      landingPages.push(newPage);
      res.writeHead(201);
      res.end(JSON.stringify(newPage));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // GET /public/lp/:slug - Public landing page by slug
  const publicSlugMatch = pathname.match(/^\/public\/lp\/([^\/]+)$/);
  if (publicSlugMatch && req.method === 'GET') {
    const slug = publicSlugMatch[1];
    const page = landingPages.find(p => p.slug === slug && p.status === 'published');
    if (page) {
      res.writeHead(200);
      res.end(JSON.stringify(page));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Page not found' }));
    }
    return;
  }

  // POST /public/lp/:slug/view - Track page view
  const viewMatch = pathname.match(/^\/public\/lp\/([^\/]+)\/view$/);
  if (viewMatch && req.method === 'POST') {
    const slug = viewMatch[1];
    const pageIndex = landingPages.findIndex(p => p.slug === slug);
    if (pageIndex !== -1) {
      landingPages[pageIndex].viewsCount++;
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // POST /public/applications - Submit form (mock)
  if (pathname === '/public/applications' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const input = JSON.parse(body);
      console.log('New application received:', input);

      // Update submission count for the landing page
      const pageIndex = landingPages.findIndex(p => p.id === input.processId);
      if (pageIndex !== -1) {
        landingPages[pageIndex].submissionsCount++;
      }

      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        applicationId: 'APP-' + Date.now().toString(36).toUpperCase(),
        message: 'Inscricao recebida com sucesso!'
      }));
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3080, () => {
  console.log('Mock API server running on http://localhost:3080');
  console.log('');
  console.log('Admin Endpoints:');
  console.log('  GET    /landing-pages');
  console.log('  GET    /landing-pages/:id');
  console.log('  POST   /landing-pages');
  console.log('  PUT    /landing-pages/:id');
  console.log('  DELETE /landing-pages/:id');
  console.log('  POST   /landing-pages/:id/publish');
  console.log('  POST   /landing-pages/:id/unpublish');
  console.log('  POST   /landing-pages/:id/duplicate');
  console.log('');
  console.log('Public Endpoints (Orchestra pattern):');
  console.log('  GET    /public/lp/:slug        - View published landing page');
  console.log('  POST   /public/lp/:slug/view   - Track page view');
  console.log('  POST   /public/applications    - Submit admission form');
});
