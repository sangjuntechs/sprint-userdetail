import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../img/AppIconNoopac.png";
import { Link } from "react-router-dom";
import Axios from "axios";

const Header = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  font-size: 22px;
  align-items: center;
  font-weight: 700;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
`;

const Card = styled.div`
  display: flex;
  padding: 15px;
  box-shadow: 4px 8px 12px gray;
  border-radius: 15px;
  margin: 15px;
  width: 30%;
  justify-content:space-around;
  align-items: center;
  z-index: 10;
  min-width:500px;
  max-width: 500px;
  background-color: white;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  height: 500px;
  overflow: scroll;
  cursor: all-scroll;
`;

const CardImg = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
  border-radius: 8px;
  z-index:10;
`;

const Input = styled.input`
  all: unset;
  padding: 0.8rem;
  color: gray;
  border-radius: 10px;
  border: 2px solid gray;
  background-color: white;
  font-size: 16px;
  font-weight:700;
`;

const Button = styled.button`
  all: unset;
  margin-left: 10px;
  color: gray;
  padding: 0.9rem;
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

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputSet = styled.div`
  box-sizing:border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  flex-direction: column;
  background-color: rgba(240, 240, 240, 0.8);
  padding: 15px;
  border-radius: 10px;
  @media (max-width: 375px) {
    width: 320px;
  }
`;

const EvaluationContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 50px;
  font-weight: 600;
  justify-content: space-around;
  border-bottom: 2px solid rgba(200, 200, 200);
`;
const BeforeEval = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow: scroll;
  align-items: center;
  flex-direction: column;
  min-width: 350px;
  padding: 30px;
  height: 690px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 10px;
  cursor: all-scroll;
`;
const BeforeEvalCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 15px;
  box-shadow: 2px 4px 8px gray;
  padding: 15px;
  margin: 15px;
  max-width: 600px;
  background-color: white;
`;

const SubmitButton = styled.button`
  all: unset;
  margin-top: 10px;
  color: #41d2a2;
  padding: 0.7rem;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #41d2a2;
  cursor: pointer;
  font-weight: 700;
  transition: 0.2s linear;
  margin-right: 5px;
  :hover {
    background-color: #41d2a2;
    color: white;
  }
`;

const FoodDetail = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-top:15px;
  flex-direction: column;
  justify-content: center;
  background-color:rgba(220,220,220,0.5);
  border-radius:5px;
  padding:10px;
  min-width:210px;
  max-width:270px;
`;

const UserInfoContainer = styled.div`
  background-color: rgba(240, 240, 240, 0.8);
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
`;

const Grid1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const AllNutrition = styled.div`
  padding: 15px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const CardMemo = styled.div`
  display: flex;
  padding: 15px;
  box-shadow: 4px 8px 12px gray;
  border-radius: 15px;
  margin: 15px;
  width: 30%;
  justify-content:space-around;
  align-items: center;
  z-index: 10;
  min-width:500px;
  max-width: 500px;
  background-color: #E9F3F9;
`

const EvaluationCard = ({ match }) => {
  const [userCards, setUserCards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterCards, setFilterCards] = useState([]);
  const [aCardFood, setAcardFood] = useState([]);
  const [managerEval, setManagerEval] = useState([]);
  const [evalLength, setEvalLength] = useState("");
  const [dayFoods, setDayFoods] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [evalGrade, setEvalGrade] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(match.params.id);
  const [writer, setWriter] = useState("");


  useEffect(() => {
    Axios.get(`http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/user-card/${match.params.id}`).then(
      (response) => {
        setUserCards(response.data);
        console.log(response.data);
      }
    );
    Axios.get(`http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/${match.params.id}`).then(
      (response) => {
        setUserInfo(response.data);
        console.log(response.data);
      }
    );
    Axios.get(`http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/card-food/${match.params.id}`).then(
      (response) => {
        setAcardFood(response.data);
        console.log(response.data);
      }
    );
    Axios.get(
      `http://54.180.61.201:8080/manager-evaluation/${match.params.id}`
    ).then((response) => {
      setManagerEval(response.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "date") {
      setSearchInput(value);
    }
    if (name === "evaluation") {
      setEvalLength(value);
    }
    if (name === "evalGrade") {
      setEvalGrade(value);
    }
    if (name === "userId") {
      setUserId(value);
    }
    if (name === "writer") {
      setWriter(value);
    }
  };

  const SubmitEval = () => {
    Axios.post("http://54.180.61.201:8080/manager-evaluation", {
      userId: userId,
      meShowDt: date,
      meScore: evalGrade,
      meMemo: evalLength,
      managerId: writer,
    }).then(console.log("success"));
    window.location.reload();
  };

  const filterCardFn = () => {
    // eslint-disable-next-line array-callback-return
    const filterCds = userCards.filter((cards) => {
      if (cards.cardShowDt) {
        return cards.cardShowDt.toLowerCase().includes(searchInput);
      }
    });
    // eslint-disable-next-line
    const filterFoods = aCardFood.filter((foods) => {
      if (foods.cfWriteDt) {
        return foods.cfWriteDt.toLowerCase().includes(searchInput);
      }
    });
    setDayFoods(filterFoods);
    setFilterCards(filterCds);
    setDate(searchInput + " 00:00:00");
    console.log(date);
  };
  //메뉴 지방 총 합
  let sumFoodsFat = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gGFat / 100) * curr.cfGram;
  }, 0);

  //메뉴 단백질 총 합
  let sumFoodsProt = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gGProtein / 100) * curr.cfGram;
  }, 0);

  //메뉴 탄수화물 총 합
  let sumFoodsCarbo = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gGCarbohydrate / 100) * curr.cfGram;
  }, 0);

  //메뉴 포화지방 총 합
  let sumSatFat = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gGSaturatedfat / 100) * curr.cfGram;
  }, 0);

  //메뉴 당 총 합
  let sumSugar = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gGSugar / 100) * curr.cfGram;
  }, 0);

  //메뉴 트랜스지방 총 합
  let sumTransFat = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gGTransfat / 100) * curr.cfGram;
  }, 0);

  //메뉴 콜레스테롤 총 합
  let sumCholesterol = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gMgCholesterol / 100) * curr.cfGram;
  }, 0);

  //메뉴 나트륨 총 합
  let sumSodium = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gMgSodium / 100) * curr.cfGram;
  }, 0);

  //메뉴 열량 총 합
  let sumCalorie = dayFoods.reduce((acc, curr) => {
    return acc + (curr.food100gCalorie / 100) * curr.cfGram;
  }, 0);


  
  let evalDay = new Date();

  let evalMonth = evalDay.getMonth() + 1;
  let evalDate = evalDay.getDate();

  const evalDays = `${evalMonth}월 ${evalDate}일`;

  const onKeyPress = (e) => {
    if(e.key === 'Enter') {
      filterCardFn();
    }
  }

  return (
    <>
      <Header>
        <Link to="/">
          <Img src={Logo} alt="logo" />
        </Link>
        평가날짜 : {evalDays}
      </Header>
      <InputContainer>
        <Input
          name="date"
          value={searchInput}
          onChange={onChange}
          type="date"
          id="date"
          onKeyPress={onKeyPress}
        />

        <Button onClick={filterCardFn}>찾기</Button>
      </InputContainer>

      <EvaluationContainer>
        <Grid1>
          <UserInfoContainer>
            <p
              style={{ fontSize: "20px", color: "gray", marginBottom: "15px" }}
            >
              👤 유저 정보
            </p>

            <p
              style={{
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              {/* 성별 별 표준몸무게,칼로리 및 기초대사량 구하기 */}
              {userInfo
                ? userInfo.userGender === 1
                  ?`표준 몸무게: ${(
                      (parseInt(String(userInfo.userHeight).slice(-4, 3)) ** 2 /
                        10000) *
                      22
                    ).toFixed(1)}kg 표준 칼로리:${
                      (
                        (parseInt(String(userInfo.userHeight).slice(-4, 3)) **
                          2 /
                          10000) *
                        22
                      ).toFixed(1) * 30
                    }kcal
                    
                기초대사량: ${
                  parseInt(String(userInfo.userWeight).slice(-3, 2)) * 24 * 1
                }kcal`
                  : `표준몸무게: ${(
                      (parseInt(String(userInfo.userHeight).slice(-4, 3)) ** 2 /
                        10000) *
                      21
                    ).toFixed(1)}kg 표준 칼로리: ${
                      (
                        (parseInt(String(userInfo.userHeight).slice(-4, 3)) **
                          2 /
                          10000) *
                        21
                      ).toFixed(1) * 30
                    }kcal
                기초대사량: ${
                  parseInt(String(userInfo.userWeight).slice(-3, 2)) * 24 * 0.9
                }kcal`
                : ""}
            </p>
            <p style={{ marginBottom: "20px", fontSize: "14px" }}>
              {userInfo
                ? `${userInfo.userName} ${String(
                    userInfo.userWeight
                  ).slice(-3, 2)}kg ${String(userInfo.userHeight).slice(
                    -4,
                    3
                  )}cm`
                : ""}
            </p>
          </UserInfoContainer>
          <InputSet>
            유저 아이디
            <input
              style={{ marginBottom: "10px", padding: "5px" }}
              type="text"
              name="userId"
              value={match.params.id}
              disabled
            />
            날짜
            <input
              style={{ marginBottom: "10px", padding: "5px" }}
              type="text"
              name="date2"
              value={searchInput}
              disabled
            />
            작성자
            <input
              style={{ marginBottom: "10px", padding: "5px" }}
              type="text"
              name="writer"
              value={writer}
              onChange={onChange}
              placeholder="push your admin id"
            />
            평가 점수
            <input
              style={{ marginBottom: "10px", padding: "5px" }}
              type="text"
              name="evalGrade"
              placeholder="0.0~5.0"
              value={evalGrade}
              onChange={onChange}
            />
            평가
            <textarea
              style={{ width: "340px", height: "150px", padding: "5px" }}
              type="textarea"
              placeholder="평가하세요."
              name="evaluation"
              value={evalLength}
              onChange={onChange}
            />
            <p
              style={{ fontSize: "12px", fontWeight: "500" }}
            >{`${evalLength.length}/8000`}</p>
            <SubmitButton onClick={SubmitEval}>제출</SubmitButton>
          </InputSet>
        </Grid1>
        <AllNutrition>
          <p
            style={{
              color: "gray",
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
           🧐 전체 영양정보
          </p>
          {/*전체 영양정보 표시*/}
          <p
            style={{ marginBottom: "5px", fontWeight: "700" }}
          >{`열량: ${sumCalorie.toFixed(
            1
          )}kcal 탄수화물: ${sumFoodsCarbo.toFixed(1)}g(${
            sumFoodsCarbo.toFixed(1) * 4
          }) 단백질: ${sumFoodsProt.toFixed(1)}g(${
            sumFoodsProt.toFixed(1) * 4
          }) 지방: ${sumFoodsFat.toFixed(1)}g(${(
            sumFoodsFat.toFixed(1) * 9
          ).toFixed(1)})`}</p>
          <p
            style={{
              fontSize: "14px",
            }}
          >
            {`포화지방: ${Math.floor(sumSatFat)}g 트랜스지방: ${Math.floor(
              sumTransFat
            )}g 당류: ${Math.floor(sumSugar)}g 콜레스테롤: ${Math.floor(
              sumCholesterol
            )}mg 나트륨: ${Math.floor(sumSodium)}mg`}
          </p>
          <CardContainer>
            
            {filterCards.map((cards) => {
              return (
                cards.cardType === 'food' ?
                <Card key={cards.userId + cards.cardKey}>
                  <div>
              
                  <p style={{ color: "#94CB94", fontSize: "15px" ,margin:'0', marginBottom:'5px', fontWeight:'700'}}>
                    {cards.cardShowDt}에 식사 👏🏻
                  </p>

                  <p
                    style={{
                      fontSize: "17px",
                      margin:'0',
                      fontWeight:'500'
                    }}
                  >
                    {cards.cardMemo}
                  </p>

                  {/* a_card_food내용 card에 가져오기 */}
                  {aCardFood
                    .filter((foods) => {
                      return foods.cardKey === cards.cardKey;
                    })
                    .map((food) => {
                      return (
                        <FoodDetail key={food.cfKey}>
                          <p style={{margin:'0', fontSize:'14px' }}>
                            {`${food.cfFoodName}, ${food.cfCalorie}kcal, ${food.cfGram}g `}
                            
                          </p>
                          <p style={{ fontSize: "12px", margin:'0' }}>
                            {/* 메뉴 별 g당 탄단지 */}
                            {` (${(
                              (food.food100gGCarbohydrate / 100) *
                              food.cfGram
                            ).toFixed(1)}/ ${(
                              (food.food100gGProtein / 100) *
                              food.cfGram
                            ).toFixed(1)}/ ${(
                              (food.food100gGFat / 100) *
                              food.cfGram
                            ).toFixed(1)})`}
                          </p>
                        </FoodDetail>
                      );
                    })}
                    </div>
                  <CardImg src={cards.cardImage ? cards.cardImage : Logo} />
                  {aCardFood.filter((foods) => {
                    return foods.cardKey === cards.cardKey
                  }).reduce((acc, curr) => {
                    return acc + curr.cfGram
                  },0)}
                </Card>
               : <CardMemo key={cards.userId + cards.cardKey}>
               <div>
               
               <p style={{ fontSize: "13px" }}>
                 {cards.cardCreateDt}에 생성
               </p>

               <p
                 style={{
                   fontSize: "18px",
                   marginTop:'10px',
                   marginBottom:'10px',
                   fontWeight: "700",
                 }}
               >
                 {cards.cardMemo}
               </p>

               {/* a_card_food내용 card에 가져오기 */}
               {aCardFood
                 .filter((foods) => {
                   return foods.cardKey === cards.cardKey;
                 })
                 .map((food) => {
                   return (
                     <FoodDetail key={food.cfKey}>
                       <p style={{ color: "rgba(80,80,80)" }}>
                         {" "}
                         <b>{`${food.cfFoodName}, ${food.cfCalorie}kcal, ${food.cfGram}g `}</b>
                       </p>
                       <p style={{ fontSize: "12px" }}>
                         {/* 메뉴 별 g당 탄단지 */}
                         {food.cfGram}g
                         {` 탄:${(
                           (food.food100gGCarbohydrate / 100) *
                           food.cfGram
                         ).toFixed(1)} 단:${(
                           (food.food100gGProtein / 100) *
                           food.cfGram
                         ).toFixed(1)} 지:${(
                           (food.food100gGFat / 100) *
                           food.cfGram
                         ).toFixed(1)}`}
                       </p>
                     </FoodDetail>
                   );
                 })}
                 </div>
               <CardImg src={cards.cardImage ? cards.cardImage : Logo} />
             </CardMemo>);
            })}
          </CardContainer>
        </AllNutrition>
        <BeforeEval>
          <b>🍕 과거 히스토리</b>
          {managerEval.map((beval) => {
            return (
              <BeforeEvalCard key={beval.meKey}>
                <p
                  style={{
                    color: "#94CB94",
                    fontSize: "16px",
                    fontWeight: "700",
                    margin:'0',
                    marginBottom:'15px'
                  }}
                >
                  {String(beval.meShowDt).slice(0, 10)} 피드백
                </p>
                <p style={{ color: "gray", fontSize: "12px", margin:'0' }}>
                  {beval.meCreateDt}
                </p>
                <p style={{ color: "gray", fontSize: "12px",margin:'0'  }}>
                  {beval.managerId}
                </p>
                
                <p style={{ color: "black", fontSize: "14px", fontWeight:'700',margin:'0', marginTop:'5px'  }}>
                  Score : {beval.meScore}
                </p>
                <p style={{ marginTop: "15px", fontWeight:'400', fontSize:'15px'}}>{beval.meMemo}</p>
              </BeforeEvalCard>
            );
          })}
        </BeforeEval>
      </EvaluationContainer>
    </>
  );
};

export default EvaluationCard;
