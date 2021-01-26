import React from "react";
import styled from 'styled-components';


const Ticket = styled.div`
    position:absolute;
    right:0;
    display:flex;
    background-color:rgba(223,221,56);
    font-size:12;
    padding:5px;
    border-radius:5px;
    color:white;
    font-weight:600;
`

const PUser = () => {
  
  return (
  <Ticket>Premium</Ticket>);
};

export default PUser;
