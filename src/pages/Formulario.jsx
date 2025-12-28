// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState, useContext } from "react";
// import { ContactContext } from "../hooks/useGlobalReducer";

export const Formulario = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  // const { añadirContacto } = useContext(ContactContext)
  const inputInicial = {name: " ", email: " ", phone: " ", address: " "};

  const [newInput, setNewInput] = useState(inputInicial);

  const inputOnChange = (event) => {
    setNewInput({ ...newInput, [event.target.name]: event.target.value });
  }

  const submitContacto = () => {
    if (newInput.name != "" && newInput.email != "" && newInput.phone != "" && newInput.address != "")
      store.añadirContacto(newInput)
    else {
      alert('Datos insuficientes')
    }
  }

  return (
    <div className="py-5">
      <h1 className="text-center">Nuevo Contacto</h1>
      <form onSubmit={submitContacto}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control borde-personalizado" name="name" placeholder='Nombre' value={newInput.name} onChange={inputOnChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control borde-personalizado " name="email" placeholder='Email' value={newInput.email} onChange={inputOnChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input type="tel" className="form-control borde-personalizado " name="phone" placeholder='Telefono' value={newInput.phone} onChange={inputOnChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control borde-personalizado " name="address" placeholder='Dirección' value={newInput.address} onChange={inputOnChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar Contacto</button>
      </form>
      <Link to="/" className="d-block mt-1 enlace-atras">Regresa a tu Agenda</Link>
    </div>
  );
};
