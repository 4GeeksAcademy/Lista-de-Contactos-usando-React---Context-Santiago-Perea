// Import necessary components from react-router-dom and other parts of the application.
import { useNavigate, Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState, useContext, useEffect} from "react";
import actions from "../funciones"
// import { ContactContext } from "../hooks/useGlobalReducer";

export const Formulario = () => {
  const { store, dispatch } = useGlobalReducer()

  const inputInicial = {
    name: " ", 
    email: " ", 
    phone: " ", 
    address: " "
  };

  const [newInput, setNewInput] = useState(inputInicial);
  const navigate = useNavigate();
  const {id} = useParams();

  const inputOnChange = (event) => {
    setNewInput({ ...newInput, [event.target.name]: event.target.value })
  };

  const submitContacto = async(event) => {
    event.preventDefault()
    if (id) {
      await actions.editarContacto(dispatch, id, newInput)
    }else{
      await actions.añadirContacto(dispatch, newInput);
    /*if (newInput.name.trim() && newInput.email.trim() && newInput.phone.trim() && newInput.address.trim()){
      await actions.añadirContacto(dispatch, newInput);
      setNewInput(inputInicial)
      navigate('/')
    }else {
      alert('Datos insuficientes');
    }*/
    }
    navigate('/')
  };

  useEffect(() => {
    if (id) {
      const contacto = store.contactos.find(e => e.id == id)
      if (contacto ) {
        setNewInput(contacto)
      }
    }
  } , [id, store.contactos])

  return (
    <div className="py-5">
      <h1 className="text-center">Nuevo Contacto</h1>
      <form onSubmit={submitContacto} className="p-3">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control " name="name" placeholder='Nombre' value={newInput.name} onChange={inputOnChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control " name="email" placeholder='Email' value={newInput.email} onChange={inputOnChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input type="tel" className="form-control " name="phone" placeholder='Telefono' value={newInput.phone} onChange={inputOnChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control " name="address" placeholder='Dirección' value={newInput.address} onChange={inputOnChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar Contacto</button>
      </form>
      <Link to="/" className="d-block mt-1">Regresa a tu Agenda</Link>
    </div>
  );
};
