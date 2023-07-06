import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
  background-color: beige;
  border: none;
  border-radius: 1rem;
  box-shadow: #d5ded9 5px 5px 2px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState([props.usuario]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getUsersById(props.usuario.id);
  }, [props.usuario]);

  const getUsersById = (id) => {
    const headers = {
      headers: {
        Authorization: "luan-moura-easley",
      },
    };

    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        headers
      )
      .then((response) => setUsuario(response.data));
  };

  const editUser = (id) => {
    const headers = {
      headers: {
        Authorization: "luan-moura-easley",
      },
    };
    const body = {
      name: nome,
      email: email,
    };

    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        body,
        headers
      )
      .then(
        () => props.getAllUsers(),
        setEmail(""),
        setNome(""),
        setEditar(false)
      );
  };

  const DeleteUsers = (id) => {
    const headers = {
      headers: {
        Authorization: "luan-moura-easley",
      },
    };

    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        headers
      )
      .then(() => props.getAllUsers());
  };

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => editUser(usuario.id)}>
            Enviar alterações
          </button>
        </div>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {usuario.name}
          </p>
          <p>
            <strong>E-mail:</strong> {usuario.email}
          </p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => DeleteUsers(usuario.id)}>Excluir</button>
    </User>
  );
}

export default Usuario;
