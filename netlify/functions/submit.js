exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DATABASE_ID = process.env.DATABASE_ID;

  if (!NOTION_TOKEN || !DATABASE_ID) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing environment variables' }) };
  }

  const data = JSON.parse(event.body);

  // Notion no acepta comas en campos Select — las reemplazamos
  const clean = (val) => val ? val.replace(/,/g, ' /') : 'Por definir';

  const properties = {
    'Nombre del cliente': {
      title: [{ text: { content: data.cliente || 'Sin nombre' } }]
    },
    'Tipo de proyecto': {
      select: { name: clean(data.tipo) }
    },
    'Industria': {
      rich_text: [{ text: { content: data.industria || '' } }]
    },
    'Fecha objetivo': {
      rich_text: [{ text: { content: data.fecha_objetivo || '' } }]
    },
    'Deadline duro': {
      select: { name: clean(data.deadline) }
    },
    'Nuevo / rediseño': {
      select: { name: clean(data.tipo_proyecto) }
    },
    'Materiales existentes': {
      multi_select: (data.materiales || []).map(m => ({ name: m.replace(/,/g, ' /') }))
    },
    'Referencias': {
      rich_text: [{ text: { content: data.referencias || '' } }]
    },
    'Presupuesto': {
      select: { name: clean(data.presupuesto) }
    },
    'Propuesta preferida': {
      select: { name: clean(data.propuesta) }
    },
    'Soporte post-lanzamiento': {
      select: { name: clean(data.soporte) }
    },
    'Responsable aprobación': {
      rich_text: [{ text: { content: data.responsable || '' } }]
    },
    'Detalles del proyecto': {
      rich_text: [{ text: { content: data.detalles || '' } }]
    },
    'Comentarios': {
      rich_text: [{ text: { content: data.comentarios || '' } }]
    },
    'Fecha de envío': {
      date: { start: new Date().toISOString().split('T')[0] }
    }
  };

  if (data.url_actual) {
    properties['URL actual'] = { url: data.url_actual };
  }

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties
      })
    });

    if (!notionRes.ok) {
      const error = await notionRes.json();
      console.error('Notion error:', error);
      return { statusCode: 500, body: JSON.stringify({ error: 'Error al guardar en Notion' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (err) {
    console.error('Server error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error interno' }) };
  }
};
