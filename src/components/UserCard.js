/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "../css/Home.css";
import Puser from "../components/Puser";
import Logo from "../img/AppIcon.jpg";
import Pagination from "../components/Pagination";

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 250px;
  max-width: 300px;
  box-shadow: 2px 8px 12px darkgray;
  border-radius: 30px;
  transition: 0.2s linear;
  margin: 30px;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    transform: translateY(-3px);
    background-color: rgba(128, 128, 128, 0.15);
  }
`;

const CardName = styled.h1`
  display: inline-block;
  font-size: 26px;
  color: gray;
  margin: 15px;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
`;
const UserImage = styled.img`
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-left: 15px;
`;

const CardContents = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const CardDetail = styled.div`
  display: block;
  font-size: 13px;
  margin: 30px;
  color: black;
  text-decoration: none;
`;

const Button = styled.div`
  top: 5px;
  all: unset;
  padding: 0.7rem;
  border: 2px solid gray;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  margin-right:17px;
  transition: 0.2s linear;
  :hover {
    color: white;
    background-color: gray;
  }
  @media(max-width:375px) {
    padding:0.3rem;
    font-size:12px;
    font-weight:500;
  }
`;
/*
const SButton = styled.button`
  position: relative;
  all: unset;
  font-size: 12px;
  margin: 15px;
  margin-top: 0px;
  padding: 0.4rem;
  border: 1.5px solid #3d5a86;
  color: #3d5a86;
  border-radius: 5px;
  font-weight: 600;
  z-index: 10;
  :hover {
    color: white;
    background-color: #3d5a86;
  }
  
`;

const EButton = styled.button`
  position: relative;
  all: unset;
  font-size: 12px;
  padding: 0.4rem;
  border: 1.5px solid #aa0000;
  color: #aa0000;
  border-radius: 5px;
  font-weight: 600;
  z-index: 10;
  :hover {
    color: white;
    background-color: #aa0000;
  }
`;
*/
const Cp = styled.div`
  position: absolute;
  top: 120px;
  right: 15px;
  font-weight: 600;
  font-size: 14px;
  @media (max-width:600px) {
    font-size:8px;
    font-weight:500;
  }

  
`;

const EvalButton = styled.button`
  all: unset;
  padding: 0.7rem;
  margin: 1.2rem;
  margin-left:0;
  border: 2px solid #41D2A2;
  border-radius: 10px;
  font-weight: 700;
  color:#41D2A2;
  cursor: pointer;
  transition: 0.2s linear;
  :hover {
    background-color: #41D2A2;
    color: white;
  }
  @media(max-width:375px) {
    padding:0.3rem;
    font-size:12px;
    font-weight:500;
  }
`

const UserCard = () => {
  const [premiumUserId, setPremiumUserId] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [premiumUser, setPremiumUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(60);

  useEffect(() => {
    //프리미엄 유저 id가져오기

    //유저 리스트 가져오기
    Axios.get("http://54.180.61.201:8080/").then((response) => {
      setUserList(response.data.reverse());
      console.log(response.data)
      setIsLoading(false);
    });
    Axios.get("http://54.180.61.201:8080/premium-user").then((response) => {
      setPremiumUser(response.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //전체 유저 리스트에서 프리미엄 유저 찾기
  const getPremiumUser = () => {
    const id = premiumUser.map((user) => {
      return user.userId;
    });
    setPremiumUserId(id);
  };

  /*
  const deletePremium = (user_id) => {
    Axios.delete(`http://localhost:4000/user/delete/${user_id}`);
    window.location.reload();
  };

  const pushPremium = (user_id) => {
    Axios.post(`http://localhost:4000/user/update/${user_id}`);
    window.location.reload();
  };
  */

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Cp>현재 페이지: {currentPage}page</Cp>
          <Button onClick={getPremiumUser}>프리미엄 유저 찾기</Button>
          <Link to='/evaluation'>
          <EvalButton>평가하기</EvalButton>
          </Link>
          
          
         
          <Body>
            {currentPosts(userList).map((user) => {
              return (
                <Card key={user.userId}>
                  <Link to={`user/${user.userId}`} key={user.userId}>
                    <CardContents>
                      {premiumUserId.includes(user.userId) ? <Puser /> : ""}
                      <CardName>{user.userName}</CardName>
                      <UserImage
                        src={user.userPhoto === "-" ? Logo : user.userPhoto}
                      />
                      <CardDetail>
                        <p id="1">USER ID : {user.userId}</p>
                        <p id="2">Email : {user.userEmail}</p>
                      </CardDetail>
                    </CardContents>
                  </Link>
                  {/* 
                  <div>
                    <SButton
                      onClick={() => {
                        pushPremium(user.user_id);
                      }}
                    >
                      시작
                    </SButton>
                    <EButton
                      onClick={() => {
                        deletePremium(user.user_id);
                      }}
                    >
                      종료
                    </EButton>
                  </div>
                  */}
                  
                </Card>
              );
            })}
          </Body>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={userList.length}
            paginate={setCurrentPage}
          ></Pagination>
        </>
      )}
    </>
  );
};

export default UserCard;
