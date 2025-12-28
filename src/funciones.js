const API = 'https://playground.4geeks.com/contact/agendas/lista_santiago';

function getContactos(funciones) {
    fetch(`${API}/contacts`)
        .then(resp => resp.json())
        .then(data => {
            console.log("Lista de contactos:", data);
            funciones({ type: 'cargar_contactos', payload: data.contacts })
        })
        .catch(error => console.log(error))
        .catch(error => console.error('Error al obtener contactos:', error));
}

function añadirContacto(funciones, contacto) {
    fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
    })
        .then(response => response.json())
        .then(data => {
            funciones({ type: 'añadir_contacto', payload: data });
        })
        .catch(error => console.error('Error al añadir contacto:', error));
}

function editarContacto(funciones, id, contacto) {
    fetch(`${API}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                funciones({ type: 'editar_contacto', payload: data });
            }
        })
        .catch(error => console.error('Error al editar contacto:', error));
}

function eliminarContacto(funciones, id) {
    fetch(`${API}/contacts/${id}`, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.ok) {
                funciones({ type: 'eliminar_contacto', payload: id })
            };
        })
        .catch(error => console.error('Error al eliminar contacto:', error));
}

export default { getContactos, añadirContacto, editarContacto, eliminarContacto };
