import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../img/AppIconNoopac.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../css/EvaluationCard.css";

const Header = styled.div`
  box-sizing: border-box;
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
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 4px 8px 12px gray;
  border-radius: 15px;
  margin: 15px;
  width: 30%;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  background-color: white;
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  height: 600px;
  overflow: scroll;
  width: 100%;
  cursor: all-scroll;
`;

const CardImg = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
  margin-left: 10px;
  border-radius: 8px;
  z-index: 10;
`;

const Input = styled.input`
  all: unset;
  padding: 0.8rem;
  color: gray;
  border-radius: 10px;
  border: 2px solid gray;
  background-color: white;
  font-size: 16px;
  font-weight: 700;
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
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  flex-direction: column;
  background-color: rgba(240, 240, 240, 0.8);
  padding: 15px;
  border-radius: 10px;
  height: 100%;
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
  @media (max-width: 500px) {
    flex-flow: wrap;
  }
`;
const BeforeEval = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow: scroll;
  align-items: center;
  flex-direction: column;
  min-width: 350px;
  padding: 30px;
  height: 840px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 10px;
  cursor: all-scroll;
  width: 100%;
`;
const BeforeEvalCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 15px;
  box-shadow: 2px 4px 8px gray;
  padding: 15px;
  margin: 15px;
  max-width: 800px;
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
  margin-top: 15px;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(220, 220, 220, 0.5);
  border-radius: 5px;
  padding: 10px;
  min-width: 210px;
  max-width: 270px;
`;

const UserInfoContainer = styled.div`
  box-sizing: border-box;
  background-color: rgba(240, 240, 240, 0.8);
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
`;

const Grid1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AllNutrition = styled.div`
  padding: 15px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 110%;
`;

const CardMemo = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 15px;
  box-shadow: 4px 8px 12px gray;
  border-radius: 15px;
  margin: 15px;
  width: 30%;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  background-color: #e9f3f9;
`;

const MemoSearchInput = styled.input`
  padding: 10px;
  width: 70%;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 5px;
`;

const ResetButton = styled.button`
  margin-top:10px;
  cursor:pointer;
`

const EvaluationCard = ({ match }) => {
  //날짜 형식
  const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };
  let now = new Date();

  let formatDay = getFormatDate(now);
  const [userCards, setUserCards] = useState([]);
  const [searchInput, setSearchInput] = useState(formatDay);
  const [filterCards, setFilterCards] = useState([]);
  const [aCardFood, setAcardFood] = useState([]);
  const [managerEval, setManagerEval] = useState([]);
  const [evalLength, setEvalLength] = useState("");
  const [dayFoods, setDayFoods] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [evalGrade, setEvalGrade] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState(match.params.id);
  const [writer, setWriter] = useState(match.params.adminid);
  const [userWeight, setUserWeight] = useState([]);
  const [findMemo, setFindMemo] = useState("");
  const [findMemoArr, setFindMemoArr] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/user-card/${match.params.id}`
    ).then((response) => {
      setUserCards(response.data);
    });
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/${match.params.id}`
    ).then((response) => {
      setUserInfo(response.data);
      console.log(response.data, "user");
    });
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/card-food/${match.params.id}`
    ).then((response) => {
      setAcardFood(response.data);
    });
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/manager-evaluation/${match.params.id}`
    ).then((response) => {
      setManagerEval(response.data);
    });
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/weight/${match.params.id}`
    ).then((response) => {
      setUserWeight(response.data);
      console.log(response.data, "weight");
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
    if (name === "searchMemo") {
      setFindMemo(value);
      console.log(findMemo)
    }
  };
  

  function reload() {
    window.location.reload();
  }

  const findMemoWord = () => {
    const fineMemoWords = managerEval.filter((evals) => {
      return evals.meMemo.includes(findMemo);
    });
    setFindMemoArr(fineMemoWords);
  };

  const SubmitEval = () => {
    Axios.post(
      "http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/manager-evaluation",
      {
        userId: userId,
        meShowDt: date,
        meScore: evalGrade,
        meMemo: evalLength,
        managerId: writer,
      }
    ).then(console.log("success"));
    setTimeout(reload, 500);
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
    console.log(dayFoods);
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
    if (e.key === "Enter") {
      filterCardFn();
    }
  };

  const onKeyPressHistory = (e) => {
    if (e.key === "Enter") {
      findMemoWord();
    }
  };

  let userWeightReverse = userWeight.reverse();
  
  //검색 초기화 함수
  const resetFind = () => {
    setFindMemoArr([]);
    setFindMemo('');
  }

  return (
    <>
      <Header>
        <Link to={`/${match.params.adminid}/evaluation`}>
          <Img src={Logo} alt="logo" />
        </Link>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>SPRINT Evaluation</p>
          <p style={{ fontSize: "13px", marginTop: "0", fontWeight: "500" }}>
            오늘 평가날짜는 {evalDays} 👍🏻
          </p>
        </div>
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
              style={{
                margin: "0",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              👤 유저 정보
            </p>
            <p style={{ marginBottom: "10px", fontSize: "14px" }}>
              {userInfo
                ? `${userInfo.userName} ${String(userInfo.userWeight).slice(
                    -3,
                    2
                  )}kg ${String(userInfo.userHeight).slice(-4, 3)}cm`
                : ""}
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
                  ? `표준 몸무게: ${(
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
            <p
              style={{
                margin: "0",
                marginTop: "15px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              👊🏻 몸무게 히스토리
            </p>
            <div
              style={{
                fontSize: "13px",
                color: "gray",
                maxHeight: "50px",
                overflow: "scroll",
                marginTop: "5px",
              }}
            >
              {userWeightReverse.map((weight) => {
                return (
                  <p className="weight">{`${String(weight.weightValue).slice(
                    0,
                    2
                  )}.${String(weight.weightValue).slice(
                    2,
                    3
                  )}kg / ${weight.weightCreateDt.slice(0, 10)}`}</p>
                );
              })}
            </div>
          </UserInfoContainer>
          <InputSet>
            <p
              style={{
                margin: "0",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              👋🏻 평가하기
            </p>
            유저 아이디
            <input
              style={{
                marginBottom: "10px",
                padding: "7px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              type="text"
              name="userId"
              value={match.params.id}
              disabled
            />
            작성자
            <input
              style={{
                marginBottom: "10px",
                padding: "7px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              type="text"
              name="writer"
              value={writer}
              onChange={onChange}
              placeholder="ID"
              disabled
            />
            날짜
            <input
              style={{
                marginBottom: "10px",
                padding: "7px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              type="text"
              name="date2"
              value={searchInput}
              disabled
            />
            평가 점수
            <input
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "2px solid gray",
                borderRadius: "5px",
                width: "90%",
              }}
              type="text"
              name="evalGrade"
              placeholder="점수를 입력해주세요. (0.0~5.0)"
              value={evalGrade}
              onChange={onChange}
              maxLength="3"
            />
            평가
            <textarea
              style={{
                width: "90%",
                height: "150px",
                padding: "10px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              type="textarea"
              placeholder="내용을 입력해주세요."
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
              margin: "0",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            🧐 전체 영양정보
          </p>
          {/*전체 영양정보 표시*/}
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            모든 음식 섭취량{" "}
            {dayFoods.reduce((acc, curr) => {
              return acc + curr.cfGram;
            }, 0)}
            g
          </p>
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
              marginBottom: "10px",
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
              return cards.cardType === "food" ? (
                <Card key={cards.userId + cards.cardKey}>
                  <div>
                    <p
                      style={{
                        color: "#94CB94",
                        fontSize: "15px",
                        margin: "0",
                        marginBottom: "5px",
                        fontWeight: "700",
                      }}
                    >
                      {`${cards.cardShowDt.slice(
                        10,
                        13
                      )}시 ${cards.cardShowDt.slice(14, 16)}분에 식사 👏🏻`}
                    </p>

                    <p
                      style={{
                        fontSize: "17px",
                        margin: "0",
                        fontWeight: "500",
                      }}
                    >
                      {cards.cardMemo}
                    </p>

                    <p style={{ margin: "0", fontSize: "12px", color: "gray" }}>
                      총 섭취량{" "}
                      {aCardFood
                        .filter((foods) => {
                          return foods.cardKey === cards.cardKey;
                        })
                        .reduce((acc, curr) => {
                          return acc + curr.cfGram;
                        }, 0)}
                      g
                    </p>

                    {/* a_card_food내용 card에 가져오기 */}
                    {aCardFood
                      .filter((foods) => {
                        return foods.cardKey === cards.cardKey;
                      })
                      .map((food) => {
                        return (
                          <FoodDetail key={food.cfKey}>
                            <p style={{ margin: "0", fontSize: "14px" }}>
                              {`${food.cfFoodName}, ${food.cfCalorie}kcal, ${food.cfGram}g `}
                            </p>
                            <p style={{ fontSize: "12px", margin: "0" }}>
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
                </Card>
              ) : (
                <CardMemo key={cards.userId + cards.cardKey}>
                  <div>
                    <p style={{ fontSize: "13px" }}>
                      {cards.cardCreateDt}에 생성
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontWeight: "500",
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
                </CardMemo>
              );
            })}
          </CardContainer>
        </AllNutrition>
        <BeforeEval>
          <b>🍕 과거 히스토리</b>
            
          <MemoSearchInput
            value={findMemo}
            onChange={onChange}
            name="searchMemo"
            type="text"
            placeholder="이 말을 했었나? 라고 생각하는 단어를 적고 Enter!"
            onKeyPress={onKeyPressHistory}
          />
          {findMemoArr[0] ? <ResetButton onClick={resetFind}>검색 초기화</ResetButton> : ""}
          {findMemoArr.map((feval) => {
            return (
              <BeforeEvalCard key={feval.meKey}>
                <p style={{
                    color: "red",
                    fontSize: "12px",
                    fontWeight: "600",
                    margin: "0",
                    marginBottom: "5px",
                  }}>🔍 검색된 평가</p>
                <p
                  style={{
                    color: "#94CB94",
                    fontSize: "16px",
                    fontWeight: "700",
                    margin: "0",
                    marginBottom: "15px",
                  }}
                >
                  {String(feval.meShowDt).slice(0, 10)} 피드백
                </p>
                <p style={{ color: "gray", fontSize: "12px", margin: "0" }}>
                  {feval.meCreateDt}
                </p>
                <p style={{ color: "gray", fontSize: "12px", margin: "0" }}>
                  {feval.managerId}
                </p>

                <p
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "700",
                    margin: "0",
                    marginTop: "5px",
                  }}
                >
                  Score : {feval.meScore}
                </p>
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    margin: "0",
                    marginTop: "15px",
                  }}
                >
                  {feval.meMemo}
                </p>
              </BeforeEvalCard>
            );
          })}



          {managerEval.map((beval) => {
            return (
              <BeforeEvalCard key={beval.meKey}>
                <p
                  style={{
                    color: "#94CB94",
                    fontSize: "16px",
                    fontWeight: "700",
                    margin: "0",
                    marginBottom: "15px",
                  }}
                >
                  {String(beval.meShowDt).slice(0, 10)} 피드백
                </p>
                <p style={{ color: "gray", fontSize: "12px", margin: "0" }}>
                  {beval.meCreateDt}
                </p>
                <p style={{ color: "gray", fontSize: "12px", margin: "0" }}>
                  {beval.managerId}
                </p>

                <p
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "700",
                    margin: "0",
                    marginTop: "5px",
                  }}
                >
                  Score : {beval.meScore}
                </p>
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    margin: "0",
                    marginTop: "15px",
                  }}
                >
                  {beval.meMemo}
                </p>
              </BeforeEvalCard>
            );
          })}
        </BeforeEval>
      </EvaluationContainer>
    </>
  );
};

export default EvaluationCard;
