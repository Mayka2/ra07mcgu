let usuarios = [];

async function cargarUsuarios() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    usuarios = await response.json();
    mostrarUsuarios(usuarios);
  } catch (error) {
    console.error('Error:', error);
  }
}

function mostrarUsuarios(data) {
  const contenedor = document.getElementById('usuarios');
  contenedor.innerHTML = data.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.address.street}</td>
      <td>${u.address.city}</td>
    </tr>
  `).join('');
}

document.getElementById('buscar').addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(termino)
  );
  mostrarUsuarios(filtrados);
});

window.onload = cargarUsuarios;