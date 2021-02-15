/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../css/Home.css";
import Puser from "../components/Puser";
import Logo from "../img/AppIcon.jpg";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 250px;
  max-width: 300px;
  box-shadow: 2px 8px 12px darkgray;
  border-radius: 30px;
  margin: 30px;
  transition: 0.2s linear;
  max-height: 500px;
  cursor: pointer;
  :hover {
    transform: translateY(-3px);
    background-color: rgb(200, 200, 200, 0.6);
    box-sizing: border-box;
  }
`;

const CardName = styled.h1`
  display: inline-block;
  font-size: 30px;
  color: gray;
  margin: 15px;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
`;
const UserImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-left: 15px;
`;

const CardContents = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const CardDetail = styled.div`
  display: block;
  font-size: 13px;
  margin: 30px;
  margin-top: 20px;
  color: black;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: wrap-reverse;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  all: unset;
  padding: 0.7rem;
  color: gray;
  border-radius: 10px;
  border: 2px solid gray;
  background-color: white;
`;

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

const Button2 = styled.div`
  top: 5px;
  all: unset;
  padding: 0.7rem;
  border: 2px solid rgba(223, 221, 56);
  font-weight: 700;
  color: rgba(223, 221, 56);
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s linear;
  :hover {
    color: white;
    background-color: rgba(223, 221, 56);
  }
`;

const SearchBox = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

/*
const SButton = styled.button`
  all: unset;
  font-size: 12px;
  margin: 15px;
  margin-top: 0px;
  padding: 0.4rem;
  border: 1.5px solid #3d5a86;
  color: #3d5a86;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.2 linear;
  z-index: 10;
  :hover {
    color: white;
    background-color: #3d5a86;
  }
`;

const EButton = styled.button`
  all: unset;
  font-size: 12px;
  padding: 0.4rem;
  border: 1.5px solid #aa0000;
  color: #aa0000;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.2 linear;
  z-index: 10;
  :hover {
    color: white;
    background-color: #aa0000;
  }
`;
*/

const Search = () => {
  const [searchList, setSearchList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  const [premiumUser, setPremiumUser] = useState([]);
  const [premiumUserId, setPremiumUserId] = useState([]);


  useEffect(() => {
    Axios.get(
      "http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/"
    ).then((response) => {
      setSearchList(response.data);
      console.log(response.data, "user");
    });
    Axios.get(
      "http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/premium-user"
    ).then((response) => {
      setPremiumUser(response.data);
    });
  }, []);

  const getPremiumUser = () => {
    const id = premiumUser.map((user) => {
      return user.userId;
    });
    setPremiumUserId(id);
  };

  //서치 벨류 상태관리
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "user") {
        setSearchInput(value);
    }
  };

  //인풋 상태와 유저 이름 비교 후 맞는 값 filterUser에 상태관리
  const filterUserFn = () => {
    // eslint-disable-next-line array-callback-return
    const filterUsers = searchList.filter((users) => {
      if (users.userName) {
        return (
          users.userName.toLowerCase().includes(searchInput) ||
          users.userId.includes(searchInput) ||
          users.userBirthday.includes(searchInput) ||
          String(users.userWeight).includes(searchInput) ||
          String(users.userHeight).includes(searchInput) ||
          (`${String(users.userHeight)}+${String(users.userWeight)}`).includes(searchInput)
        );
      }
    });
    setFilterUser(filterUsers);
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

  const onKeyPressHistory = (e) => {
    if (e.key === "Enter") {
      filterUserFn();
    }
  };

  return (
    <>
      <SearchBox>
        <Input
          name="user"
          value={searchInput}
          onChange={onChange}
          placeholder="Search User"
          onKeyPress={onKeyPressHistory}
        />
        <Button onClick={filterUserFn}>검색</Button>
        <Button2 onClick={getPremiumUser}>프리미엄 유저 찾기</Button2>
      </SearchBox>

      <UserBox>
        {filterUser.map((user) => {
          return (
            <Card key={user.userId}>
              <Link to={`user/${user.userId}`} key={user.userKey}>
                <CardContents>
                  {premiumUserId.includes(user.userId) ? <Puser /> : ""}
                  <CardName>{user.userName}</CardName>
                  <UserImage
                    src={user.userPhoto === "-" ? Logo : user.userPhoto}
                  />
                  <CardDetail>
                    <p id="1">USER ID : {user.userId}</p>
                    <p id="2">Email : {user.userEmail}</p>
                    <p id="3">Height : {user.userHeight}</p>
                    <p id="4">Weight : {user.userWeight}</p>
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
      </UserBox>
    </>
  );
};
export default Search;
