const API_URL = 'http://localhost:3000/api/clientes';

// Función para obtener y mostrar los clientes en la tabla
async function obtenerClientes() {
    try {
        const respuesta = await fetch(API_URL);
        const clientes = await respuesta.json();

        const tabla = document.getElementById('tablaClientes');
        tabla.innerHTML = ''; // Limpiar la tabla antes de cargar

        clientes.forEach(cliente => {
            tabla.innerHTML += `
                <tr>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.cedula}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.telefono}</td>
                    <td>
                        <button class="btn-eliminar" onclick="eliminarCliente('${cliente._id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
    }
}

// Función para guardar un cliente nuevo
document.getElementById('clienteForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const nuevoCliente = {
        nombre: document.getElementById('nombre').value,
        cedula: document.getElementById('cedula').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoCliente)
        });

        document.getElementById('clienteForm').reset(); // Limpiar formulario
        obtenerClientes(); // Recargar la tabla
    } catch (error) {
        alert('Error al guardar el cliente');
    }
});

// Función para eliminar un cliente
async function eliminarCliente(id) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            obtenerClientes(); // Recargar la tabla
        } catch (error) {
            alert('Error al eliminar');
        }
    }
}

// Cargar los clientes apenas se abra la página
obtenerClientes();