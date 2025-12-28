import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Contacto } from "../components/Contacto.jsx";
import { useEffect, useContext } from "react";
import  funciones from "../funciones.js"

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	// const { añadirContacto } = useContext(ContactContext)

	/* useEffect(() => {
		fetch(`https://playground.4geeks.com/contact/agendas/lista_santiago`, {
			method: 'POST',
		})
			.then(resp => resp.json())
			.then(data =>
				console.log(data))
			.catch(error =>
				console.log(error));
	}, [])*/

	useEffect(() => {
        funciones.getContactos();
    }, []);

	const numeroContactos = store.contactos.length;

	return (
		<div className="pb-5 ">
			<div className="list-group">
				{numeroContactos > 0 ? (
					store.contactos.map(contacto => (
						<Contacto key={contacto.id} contacto={contacto}/>)) ) : ( 
				<p className="text-center">Tu Agenda tiene {numeroContactos} contactos.</p>)}
			</div>
		</div>
	);
};