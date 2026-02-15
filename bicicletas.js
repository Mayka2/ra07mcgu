async function cargarBicicletas(cat = '') {
  try {
    const params = cat ? `?cat=${encodeURIComponent(cat)}` : '';
    const response = await fetch(`https://api.raulserranoweb.es/rest.php${params}`);
    const bicis = await response.json();
    mostrarBicicletas(bicis);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('bicicletas').innerHTML = '<p>Error al cargar datos.</p>';
  }
}

function mostrarBicicletas(data) {
  const contenedor = document.getElementById('bicicletas');
  if (!Array.isArray(data)) {
    contenedor.innerHTML = '<p>No hay datos.</p>';
    return;
  }

  contenedor.innerHTML = data.map(b => `
    <div class="bicicleta">
      <img src="https://api.raulserranoweb.es/imagenes_art/${b.cod}" alt="${b.cod}">
      <p><span class="label">Nombre: </span><span class="dato">${b.nom}</span></p>
      <p><span class="label">Descripción: </span><span class="dato">${b.des}</span></p>
      <p><span class="label">Categoría: </span><span class="dato">${b.cat}</span></p>
    </div>
  `).join('');
}

// eventos
document.getElementById('categoria').addEventListener('change', (e) => {
  cargarBicicletas(e.target.value);
});

// carga inicial
window.onload = () => cargarBicicletas();
