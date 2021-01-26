import React, { useState } from "react";
import UserCard from "../components/UserCard";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import Modal from 'react-modal'
import Search from "../components/Search";
import Logo from '../img/AppIcon.jpg'


const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #ff8080;
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
  justify-content: start;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  padding-left:30px;
`;

const SearchButton = styled.button`
  position:sticky;
  top:0;
  all: unset;
  padding: 0.7rem;
  margin: 1rem;
  border: 2px solid #ff8080;
  border-radius: 10px;
  color: #ff8080;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s linear;
  :hover {
    background-color: #ff8080;
    color: white;
  }
  @media(max-width:375px) {
    padding:0.3rem;
    font-size:12px;
    font-weight:500;
  }
`;

const InModalContents = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    color: #ff8080;
    font-weight:500;
    flex-wrap:wrap;
`

const CloseBtn = styled.button`
    all:unset;
    cursor:pointer;
    position:relative;
    right:100;
    font-size:20px;
    position:absolute;
    right:0;
    :hover {
        transform:scale(1.2)
    }
`

const ModalHeader = styled.div`
    font-size:30px;
    color:gray;
    text-align:center;
`

const Img = styled.img`
  width:60px;
  height:60px;
  margin-right:10px;
  border-radius:50%;
`


const Home = () => {
  const [viewSearch, setViewSearch] = useState(false);

  const onClickSearch = () => {
    setViewSearch(true);
  };
  const onClickSearchClose = () => {
    setViewSearch(false);
  };
  return (
    <>
      <Header>
        <Img src={Logo}/>SPRINT User Admin 
      </Header>
      

      <SearchButton onClick={onClickSearch}>User Search</SearchButton>
      
      <Modal isOpen={viewSearch} ariaHideApp={false}>
      
          
        <InModalContents>
            <ModalHeader>User Search<IoSearch size='30px'/></ModalHeader>
            <CloseBtn onClick={onClickSearchClose}>❌</CloseBtn>
            <Search />
        </InModalContents>
      </Modal>
      <UserCard />
      
    </>
  );
};
export default Home;
