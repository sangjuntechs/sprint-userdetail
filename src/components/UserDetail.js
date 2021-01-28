import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Logo from "../img/AppIcon.jpg";

const UserDetailCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
const UserDetailImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;

const UserDetail = ({ match }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 유저 정보 가져오기
    Axios.get("http://54.180.61.201:8080/").then((response) => {
      setUsers(response.data);
    });
  }, []);

  //현재 url아이디와 선택한 유저의 아이디가 일치
  let getUser = users.find((user) => user.userId === match.params.id);
  return (
    <>
      {getUser ? (
        <UserDetailCard>
          <UserDetailImg
            src={getUser.userPhoto === "-" ? Logo : getUser.userPhoto}
            alt="userPhoto"
          />
          <h3>{getUser.userName}</h3>
          <p>유저 아이디 : {getUser.userId}</p>
          <p>이메일 : {getUser.userEmail}</p>
          <p>생일 : {getUser.userBirthday}</p>
          <p>유저삭제상태 : {getUser.userDeleteYn}</p>

          <Link to="/">Home</Link>
        </UserDetailCard>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserDetail;
