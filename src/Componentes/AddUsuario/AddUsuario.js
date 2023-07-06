import axios from "axios";
import React, { useState } from "react";

function AddUsuario(props) {
  
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");

  const postNewUsers = () => {
    const headers = {
      headers: {
        Authorization: "luan-moura-easley",
      }
    }
    

    const body = 
      {
        name,
        email
      }
    

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/",body,
        headers
      )
      .then(() =>props.getAllUsers(), setNome(""), setEmail(""))
      
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <>
      <h3>Adicionar novo usuario</h3>
      <input
        placeholder={"nome"}
        value={name}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={postNewUsers} >Enviar</button>
    </>
  );
}

export default AddUsuario;
