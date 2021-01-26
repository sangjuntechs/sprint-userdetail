import React from "react";
import styled from "styled-components";
import {Ring} from 'react-awesome-spinners';

const LoadingStyle = styled.div`
  font-size: 20px;
  margin-top:18vh;
  color: black;
  margin-left:15px;
  font-weight:600;
`;

const LoadingBody = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color: gray;
  margin-top:20px;
`;

const Loading = () => {
  return (
      <LoadingBody>
        <LoadingStyle>Loading sprint user</LoadingStyle>
        <LoadingBody>
            <Ring color='gray' size='64'/>
        </LoadingBody>
      </LoadingBody>
  );
};

export default Loading;
