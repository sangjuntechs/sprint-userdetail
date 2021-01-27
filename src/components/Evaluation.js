/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from 'axios';
import Logo from "../img/AppIcon.jpg";
import { Link } from "react-router-dom";

const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items:center;
  font-size:22px;
  font-weight:700;
  padding:30px;
`;

const Img = styled.img`
  width:60px;
  height:60px;
  margin-right:10px;
  border-radius:50%;
`

const Button = styled.button`
  all: unset;
  margin-left: 10px;
  color: gray;
  padding: 0.7rem;
  border-radius: 10px;
  text-align: center;
  border: 2px solid gray;
  cursor: pointer;
  font-weight: 700;
  transition: 0.2s linear;
  margin-right: 5px;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const Input = styled.input`
  all: unset;
  padding: 0.7rem;
  color: gray;
  border-radius: 10px;
  border: 2px solid gray;
  background-color: white;
`;

const SearchBox = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
    position:relative;
    width:40%;
    min-width:300px;
    padding:15px;
    box-shadow:4px 8px 12px gray;
    border-radius:15px;
    margin:30px;
    font-size:14px;
    color:rgb(50,50,50);
    @media(max-width:375px) {
    width:300px;
    font-size:12px;
  }
`
const CardBox = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

const DcardButton = styled.button`
    all:unset;
    border: 2px solid #41D2A2;
    color:#41D2A2;
    font-weight:600;
    border-radius:5px;
    position:absolute;
    right:15px;
    bottom:15px;
    padding:5px;
    transition:0.1s linear;
    cursor:pointer;
    :hover {
        color:white;
        background-color:#41D2A2;
    }
    @media(max-width:375px) {
    padding:0.2rem;
    font-size:10px;
    font-weight:500;
  }
`

const Evaluation = () => {

    const [searchInput, setSearchInput] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [filterUser, setFilterUser] = useState(searchList);
    useEffect(() => {
        //프리미엄 유저 id가져오기
    
        //유저 리스트 가져오기
        Axios.get("http://54.180.61.201:8080/premium-user").then((response) => {
          setSearchList(response.data);
        });
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 

      const onChange = (event) => {
        const {
          target: { name, value },
        } = event;
        if (name === "adminId") {
          setSearchInput(value);
        }
      };

      const filterUserFn = () => {
        const filterUsers = searchList.filter((users) => {
         if (users.adminId) {
            return users.adminId.toLowerCase().includes(searchInput)
         }
        });
        setFilterUser(filterUsers.reverse());
      };

  return (
    <>
      <Header>
      <Link to='/'><Img src={Logo} alt="logo" /></Link>
        SPRINT Feedback
      </Header>
      
      <SearchBox>
        <Input
          name="adminId"
          value={searchInput}
          onChange={onChange}
          placeholder="Push your admin ID"
        />
        <Button onClick={filterUserFn}>검색</Button>
      </SearchBox>
      {filterUser.map((user) => {
          return (
              <CardBox key={user.puKey}>
              <Card>
                <h2>{user.userName}</h2>
                <p><b>유저 아이디:</b> {user.userId}</p>
                <p><b>유저 관리자:</b> {user.adminId}</p>
                <Link to = {`evaluations/${user.userId}`}>
                <DcardButton>카드보기</DcardButton>
                </Link>
              </Card>
              
              </CardBox>
          )
          
      })}
    </>
  );
};

export default Evaluation;
