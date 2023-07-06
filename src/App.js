import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";


// const usuariosLocal = [
//   {
//     id: 1,
//     name: "Muri"
//   },
//   {
//     id: 2,
//     name: "Paulinha"
//   },
//   {
//     id: 3,
//     name: "Marcelo"
//   },
//   {
//     id: 4,
//     name: "Rodrigo"
//   },
// ]

function App() {
  const [usuarios, setUsuarios] = useState([])

  const headers = {
    headers:{
      Authorization: "luan-moura-easley"
    }
  }

  useEffect(() =>{
    getAllUsers()
  },[])
  
  
  const getAllUsers = () => { axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",headers)
   .then(response => setUsuarios(response.data))
   .catch(err => console.log("caso de erro",err))};



  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario getAllUsers={getAllUsers} />
      <hr/>
      {usuarios.map((usuario) => {
        return <Usuario getAllUsers={getAllUsers} key={usuario.id} usuario={usuario} />
      })}
    </>
  )
}

export default App;
