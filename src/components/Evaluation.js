/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import Logo from "../img/AppIconNoopac.png";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "../css/Calendar.css";
import Loading from '../components/Loading'

const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  padding: 30px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
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
  position: relative;
  width: 100%;
  min-width: 400px;
  padding: 15px;
  box-shadow: 4px 8px 12px gray;
  border-radius: 15px;
  margin: 10px;
  font-size: 14px;
  color: rgb(50, 50, 50);
  background-color: white;
  @media (max-width: 375px) {
    width: 300px;
    font-size: 12px;
  }
`;
const CardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DcardButton = styled.button`
  all: unset;
  border: 2px solid #41d2a2;
  color: #41d2a2;
  font-weight: 600;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 5px;
  transition: 0.1s linear;
  cursor: pointer;
  :hover {
    color: white;
    background-color: #41d2a2;
  }
  @media (max-width: 375px) {
    padding: 0.2rem;
    font-size: 10px;
    font-weight: 500;
  }
`;

const MyUserContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 15px;
  width: 100%;
  background-color: rgba(220, 220, 220, 0.5);
  border-radius: 10px;
  min-height:700px;
`;

const EvalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 15px;
  width: 50%;
`;

const Evaluation = ({match}) => {
  const [searchInput, setSearchInput] = useState(match.params.adminid);
  const [searchList, setSearchList] = useState([]);
  const [filterUser, setFilterUser] = useState(searchList);
  const [startDate, setStartDate] = useState(new Date());
  const [searchEval, setSearchEval] = useState([]);
  const [filterAdminId, setFilterAdminId] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    //프리미엄 유저 id가져오기

    // userlist + evaluationcard
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/premium-user/evaluation`
    ).then((response) => {
      setSearchEval(response.data);
      console.log(response.data, 'eval');
    });
    
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/admin`
    ).then((response) => {
      setAdmin(response.data);
      console.log(response.data)
    });
    //유저 리스트 가져오기
    Axios.get(
      "http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/premium-user"
    ).then((response) => {
      setSearchList(response.data);
      console.log(response.data)

    });
    
  },[]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "adminId") {
      setSearchInput(value);
    }
  };

  //날짜 포멧 맞추기
  const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };

  let formatDate = getFormatDate(startDate);

  //adminid 일치하는 경우 필터링
  const filterUserFn = () => {
    const filterUsers = searchEval.filter((users) => {
      if (users.adminId) {
        return (
          users.meShowDt.toLowerCase().includes(formatDate) &&
          users.managerId.toLowerCase().includes(searchInput)
        );
      }
    });

    setFilterUser(filterUsers);

    const filterIds = searchList.filter((users) => {
      if (users.adminId) {
        return users.adminId.toLowerCase().includes(searchInput) && users.puExpireYn === "N";
      }
    });

    setFilterAdminId(filterIds);
    console.log(filterAdminId,'admin')
  };

  //엔터키 클릭
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      filterUserFn();
    }
  };

  //back-end와 날짜 형식 맞추기

  const getShowingDate = (date) => {
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return month + "월 " + day + "일";
  };

  let showingDate = getShowingDate(startDate);
  let getAdmin = admin.find((admin) =>  admin.adminId === match.params.adminid);

  return (
    <>
      {getAdmin ? (<><Header>
        <Link to={`/${match.params.adminid}/evaluation`}>
          <Img src={Logo} alt="logo" />
        </Link>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>SPRINT Feedback</p>
        </div>
      </Header>

      <SearchBox>
        <Input
          name="adminId"
          value={searchInput}
          onChange={onChange}
          placeholder="Push your admin ID"
          onKeyPress={onKeyPress}
        />
        <Button onClick={filterUserFn}>검색</Button>
      </SearchBox>
      <EvalContainer>
        <CalendarContainer>
          <div style={{ margin: "20px", fontWeight: "600" }}>
            📆 카드 날짜 선택
          </div>
          <Calendar
            value={startDate}
            onChange={setStartDate}
            onKeyPress={onKeyPress}
          />
        </CalendarContainer>
        <MyUserContainer>
          <div style={{ margin: "20px", fontWeight: "600" }}>
             🌍 모든 유저
          </div>

          {searchList[0] ? (<><div style={{ height: "600px", overflow: "scroll" }}>
            
            {filterAdminId.map((user) => {
              return (
                <>
                {user.puExpireYn === 'N' ? (<CardBox key={user.userId + user.meCreateDt}>
                  <Card>
                    <h2>{user.userName ? user.userName : "이름이 없는 유저 😱"}</h2>
                    <p>
                      <b>유저 아이디:</b> {user.userId}
                    </p>
                    <p>
                      <b>유저 관리자:</b> {user.adminId}
                    </p>
                    <Link to={`evaluations/${user.userId}`}>
                      <DcardButton>카드보기</DcardButton>
                    </Link>
                  </Card>
                </CardBox>) : ''}
                
                </>
              );
            })}
          </div></>) : <Loading />}
          
          
        </MyUserContainer>
        <MyUserContainer>
          <div style={{ margin: "20px", fontWeight: "600" }}>
            {`🌲 ${showingDate} 피드백된 유저`}
          </div>
          {searchEval[0] ? (<><div style={{ height: "600px", overflow: "scroll" }}>
            {filterUser.map((user) => {
              return (
                <>
                 <CardBox key={user.userId + user.meCreateDt}>
                  <Card>
                    <h2>{user.userName ? user.userName : "이름이 없는 유저 😱"}</h2>
                    <p style={{fontSize:'12px', color:'gray', fontWeight:'600'}}>
                      {user.meCreateDt} 작성
                    </p>
                    <p>
                      <b>유저 아이디:</b> {user.userId}
                    </p>
                    <p>
                      <b>작성자:</b> {user.managerId}
                    </p>
                    
                    <Link to={`evaluations/${user.userId}`}>
                      <DcardButton>카드보기</DcardButton>
                    </Link>
                  </Card>
                </CardBox>
               
                </>
              );
            })}
          </div></>) : <Loading />}
          
        </MyUserContainer>
      </EvalContainer></>) : ""}
      
    </>
  );
};

export default Evaluation;
