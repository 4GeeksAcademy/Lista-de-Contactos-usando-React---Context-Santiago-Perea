export const initialStore = () => {
  return {
    contactos: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'cargar_contactos':
      return { ...store, contactos: action.payload };

    case 'añadir_contacto':
      return { ...store, contactos: [...store.contactos, action.payload] };
    case 'editar_contacto':
      return {
        ...store,
        contactos: store.contactos.map((contacto) => (
          contacto.id === action.payload.id ? action.payload : contacto))
      };
    case 'eliminar_contacto':
      return {
        ...store,
        contactos: store.contactos.filter((contacto) => (
          contacto.id !== action.payload))
      };

    default:
      return store;
  }
}
