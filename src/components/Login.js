import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/AppIconNoopac.png";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
`;



const Login = () => {

  
  const [id, setId] = useState('');
  const [password, setPassWord] = useState('');
  

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "id") {
      setId(value);
      console.log(id)
    }
    if (name === "password") {
      setPassWord(value);
    }
  };
  return (
    <LoginContainer>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          alt="logos"
          style={{ width: "70px", height: "70px", marginBottom: "10px" }}
        />
        <p style={{ fontWeight: "600" }}>SPRINT Manager</p>
        <input
          style={{ margin: "10px", padding: "10px", border:'2px solid gray', borderRadius:'5px' }}
          placeholder="ID"
          type="text"
          name='id'
          onChange={onChange}
        />
        <input
          style={{ margin: "5px", padding: "10px", border:'2px solid gray', borderRadius:'5px' }}
          placeholder="Password"
          type="password"
          name='password'
          onChange={onChange}
        />
        <Link to={`/${id}/${password}`}><button style={{ marginTop: "10px", padding:'5px' }}>로그인</button></Link>
      </form>
    </LoginContainer>
  );
};

export default Login;
