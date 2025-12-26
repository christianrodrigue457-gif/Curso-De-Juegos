// js/app.js - Carga dinámica de módulos con soporte para contenido HTML
const content = document.getElementById('content');

// Mapeo de pestañas a archivos
const tabFiles = {
  inicio: 'data-inicio.js',
  semana1: 'data-semana1.js',
  semana3: 'data-semana3.js',
  fase2: 'data-fase2.js',
  fase3: 'data-fase3.js',
  fase4: 'data-fase4.js',
  fase5: 'data-fase5.js',
  fase6: 'data-fase6.js',
  recursos: 'data-recursos.js'
};

// Función para cargar módulos dinámicamente
async function loadModule(tab) {
  try {
    // Mostrar indicador de carga
    content.innerHTML = `
      <div class="content-section active">
        <div class="loading">
          <h2>⏳ Cargando contenido...</h2>
        </div>
      </div>
    `;
    
    const module = await import(`./${tabFiles[tab]}`);
    renderContent(module.default);
  } catch (error) {
    console.error(`Error cargando ${tabFiles[tab]}:`, error);
    content.innerHTML = `
      <div class="content-section active">
        <div class="error-message">
          <h2>❌ Error al cargar el contenido</h2>
          <p>No se pudo cargar el módulo <code>${tabFiles[tab]}</code></p>
          <p>Detalles: ${error.message}</p>
          <button onclick="location.reload()" class="retry-btn">🔄 Reintentar</button>
        </div>
      </div>
    `;
  }
}

// Función para renderizar el contenido
function renderContent(data) {
  let html = `<div class="content-section active">`;
  html += `<h2>${data.titulo}</h2>`;

  if (data.descripcion) {
    html += `<p class="descripcion">${data.descripcion}</p>`;
  }

  // Si tiene campo 'contenido', renderizarlo directamente
  if (data.contenido) {
    html += data.contenido;
  }

  // Si tiene media (video/audio/imagen), renderizarlo con manejo de errores
  if (data.media) {
    const m = data.media;
    html += `<div class="media-container">`;
    if (m.tipo === 'video') {
      html += `
        <video controls src="${m.src}" poster="${m.poster || ''}" 
               onerror="this.parentElement.innerHTML='<p class=error-media>❌ Video no disponible</p>'">
          Tu navegador no soporta video HTML5.
        </video>`;
    } else if (m.tipo === 'audio') {
      html += `
        <audio controls src="${m.src}"
               onerror="this.parentElement.innerHTML='<p class=error-media>❌ Audio no disponible</p>'">
          Tu navegador no soporta audio HTML5.
        </audio>`;
    } else if (m.tipo === 'imagen') {
      html += `
        <img src="${m.src}" alt="${data.titulo}" 
             onerror="this.src='assets/imagenes/placeholder.png'; this.alt='Imagen no disponible'">`;
    }
    html += `</div>`;
  }

  // Si tiene features, renderizarlos
  if (data.features) {
    html += `<div class="feature-grid">`;
    data.features.forEach(f => {
      html += `
        <div class="feature-card">
          <div class="feature-icon">${f.icono}</div>
          <h3>${f.titulo}</h3>
          <p>${f.texto}</p>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Si tiene timeline, renderizarlo
  if (data.timeline) {
    html += `<h2>🗺️ Ruta de Aprendizaje</h2><div class="timeline">`;
    data.timeline.forEach((t, index) => {
      html += `
        <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
          <div class="timeline-marker">${index + 1}</div>
          <h3>${t.titulo}</h3>
          <p>${t.texto}</p>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Si tiene lecciones, renderizarlas
  if (data.lecciones) {
    data.lecciones.forEach((leccion, i) => {
      const id = leccion.titulo.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
      html += `
        <div class="week-card" onclick="toggleWeek('${id}')">
          <div class="week-header">
            <span class="week-title">${leccion.titulo}</span>
            <span class="toggle-icon">▼</span>
          </div>
          <div id="${id}" class="week-content">
            ${leccion.contenido}
          </div>
        </div>
      `;
    });
  }

  // Si tiene links, renderizarlos
  if (data.links) {
    html += `<div class="links-section"><h3>🔗 Enlaces útiles</h3>`;
    data.links.forEach(link => {
      html += `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
          📌 ${link.nombre}
        </a>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  content.innerHTML = html;
  
  // Scroll suave al inicio del contenido
  content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Función global para toggle de contenido
window.toggleWeek = function (id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('active');
    // Cambiar icono
    const card = el.parentElement;
    const icon = card.querySelector('.toggle-icon');
    if (icon) {
      icon.textContent = el.classList.contains('active') ? '▲' : '▼';
    }
  }
};

// Navegación con teclado (accesibilidad)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const tabs = Array.from(document.querySelectorAll('.tab-btn'));
    const activeIndex = tabs.findIndex(tab => tab.classList.contains('active'));
    
    let newIndex;
    if (e.key === 'ArrowRight') {
      newIndex = (activeIndex + 1) % tabs.length;
    } else {
      newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    }
    
    tabs[newIndex].click();
    tabs[newIndex].focus();
  }
});

// Navegación por pestañas
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadModule(btn.dataset.tab);
  });
  
  // Añadir atributos de accesibilidad
  btn.setAttribute('role', 'tab');
  btn.setAttribute('tabindex', '0');
});

// Cargar pestaña inicial
loadModule('inicio');

// Detectar si hay imágenes que fallan al cargar
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    console.warn('Imagen no encontrada:', e.target.src);
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="18"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
  }
}, true);