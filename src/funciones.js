const API = 'https://playground.4geeks.com/contact/agendas/lista_santiago';

function getContactos(dispatch) {
    fetch(`${API}/contacts`)
        .then(resp => resp.json())
        .then(data => {
            console.log("Lista de contactos:", data);
            dispatch({ type: 'cargar_contactos', payload: data.contacts })
        })
        .catch(error => console.log(error))
        .catch(error => console.error('Error al obtener contactos:', error));
}

function añadirContacto(dispatch, contacto) {
    fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
    })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: 'añadir_contacto', payload: data });
        })
        .catch(error => console.error('Error al añadir contacto:', error));
}

function editarContacto(dispatch, id, contacto) {
    fetch(`${API}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                dispatch({ type: 'editar_contacto', payload: data });
            }
        })
        .catch(error => console.error('Error al editar contacto:', error));
}

function eliminarContacto(dispatch, id) {
    console.log(id)
    fetch(`https://playground.4geeks.com/contact/agendas/lista_santiago/contacts/${id}`, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.ok) {
                dispatch({ type: 'eliminar_contacto', payload: id })
            };
        })
        .catch(error => console.error('Error al eliminar contacto:', error));
}

export default { getContactos, añadirContacto, editarContacto, eliminarContacto };
