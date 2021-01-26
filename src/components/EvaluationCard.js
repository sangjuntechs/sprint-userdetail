import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../img/AppIcon.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";

const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #ff8080;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding-left: 30px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 50%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-shadow: 4px 8px 12px gray;
  border-radius: 15px;
  margin: 15px;
  width: 30%;
  max-width: 350px;
  min-height: 400px;
  justify-content: center;
  align-items: center;
  min-width: 300px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: wrap;
  margin-top: 30px;
`;

const CardImg = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const Input = styled.input`
  all: unset;
  padding: 0.8rem;
  color: gray;
  border-radius: 10px;
  border: 2px solid gray;
  background-color: white;
  font-size: 16px;
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

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const InputSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  flex-direction: column;
  @media (max-width: 375px) {
    width: 320px;
  }
`;

const EvaluationContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 50px;
  font-weight: 600;
  flex-flow: wrap;
  justify-content: space-around;
  border-bottom: 2px solid rgba(200, 200, 200);
  border-top: 2px solid rgba(200, 200, 200);
`;
const BeforeEval = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow: scroll;
  align-items: center;
  flex-direction: column;
  width: 50%;
  min-width: 350px;
  padding: 10px;
  height: 400px;
  cursor: all-scroll;
`;
const BeforeEvalCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 15px;
  box-shadow: 2px 4px 8px gray;
  padding: 15px;
  margin: 15px;
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
  margin-bottom: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SumNutreintContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid rgba(200, 200, 200);
`;

const EvaluationCard = ({ match }) => {
  const [userCards, setUserCards] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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
    Axios.get(`http://54.180.61.201:8080/user-card/${match.params.id}`).then(
      (response) => {
        setUserCards(response.data);
        console.log(response.data)
      }
    );
    Axios.get(`http://54.180.61.201:8080/${match.params.id}`).then(
      (response) => {
        setUserInfo(response.data);
        console.log(response.data)
      }
    );
    Axios.get(`http://54.180.61.201:8080/card-food/${match.params.id}`).then(
      (response) => {
        setAcardFood(response.data);
        console.log(response.data)
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
    setDate(searchInput+'T00:00:00');
    console.log(date)
  };
  //메뉴 지방 총 합
  let sumFoodsFat = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gGFat/100 * curr.cfGram;
  }, 0);

  //메뉴 단백질 총 합
  let sumFoodsProt = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gGProtein/100 * curr.cfGram;
  }, 0);

  //메뉴 탄수화물 총 합
  let sumFoodsCarbo = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gGCarbohydrate/100 * curr.cfGram;
  }, 0);

  //메뉴 포화지방 총 합
  let sumSatFat = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gGSaturatedfat/100 * curr.cfGram;
  }, 0);

  //메뉴 당 총 합
  let sumSugar = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gGSugar/100 * curr.cfGram;
  }, 0);

  //메뉴 트랜스지방 총 합
  let sumTransFat = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gGTransfat/100 * curr.cfGram;
  }, 0);

  //메뉴 콜레스테롤 총 합
  let sumCholesterol = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gMgCholesterol/100 * curr.cfGram;
  }, 0);

  //메뉴 나트륨 총 합
  let sumSodium = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gMgSodium/100 * curr.cfGram;
  }, 0);

  //메뉴 열량 총 합
  let sumCalorie = dayFoods.reduce((acc, curr) => {
    return acc + curr.food100gCalorie/100 * curr.cfGram
  }, 0)



  return (
    <>
      <Header>
        <Link to="/">
          <Img src={Logo} alt="logo" />
        </Link>
        SPRINT 영양사 피드백
      </Header>
      <InputContainer>
        <Input
          name="date"
          value={searchInput}
          onChange={onChange}
          type="date"
          id='date'
        />

        <Button onClick={filterCardFn}>찾기</Button>
      </InputContainer>

      <EvaluationContainer>
        <InputSet>
          유저 아이디
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            name="userId"
            value={match.params.id}
            disabled
          />
          날짜
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            name="date2"
            value={searchInput}
            disabled
          />
          작성자
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            name="writer"
            value={writer}
            onChange={onChange}
            placeholder="push your admin id"
          />
          평가 점수
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            name="evalGrade"
            placeholder="0~5"
            value={evalGrade}
            onChange={onChange}
          />
          평가
          <textarea
            style={{ width: "340px", height: "150px" }}
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

        <BeforeEval>
          <b>이전 피드백 내용</b>
          {managerEval.map((beval) => {
            return (
              <BeforeEvalCard key={beval.meKey}>
                <p>내용 : {beval.meMemo}</p>
                <p style={{ color: "gray", fontSize: "12px" }}>
                  날짜 : {beval.meShowDt}
                </p>
                <p style={{ color: "gray", fontSize: "12px" }}>
                  점수 : {beval.meScore}
                </p>
                <p style={{ color: "gray", fontSize: "12px" }}>
                  작성자 : {beval.managerId}
                </p>
              </BeforeEvalCard>
            );
          })}
        </BeforeEval>
      </EvaluationContainer>
      <SumNutreintContainer>
        <p
          style={{
            color: "gray",
            fontSize: "22px",
            fontWeight: "600",
            margin: "20px",
          }}
        >
          전체 영양정보
        </p>
        {/*전체 영양정보 표시*/}
        <p
          style={{ marginBottom: "5px", fontWeight: "700" }}
        >{`열량: ${sumCalorie.toFixed(1)}kcal 탄수화물: ${sumFoodsCarbo.toFixed(
          1
        )}g(${sumFoodsCarbo.toFixed(1) * 4}kcal) 단백질: ${sumFoodsProt.toFixed(1)}g(${sumFoodsProt.toFixed(1) * 4}kcal) 지방: ${sumFoodsFat.toFixed(
          1
        )}g(${(sumFoodsFat.toFixed(1) * 9).toFixed(1)}kcal)`}</p>
        <p
          style={{ marginBottom: "30px", fontSize: "14px", textAlign: 'center'}}
        >{`포화지방: ${Math.floor(sumSatFat)}g 트랜스지방: ${Math.floor(
          sumTransFat
        )}g 당류: ${Math.floor(sumSugar)}g 콜레스테롤: ${Math.floor(
          sumCholesterol
        )}mg 나트륨: ${Math.floor(sumSodium)}mg`}</p>

        <p
          style={{
            color: "gray",
            fontSize: "22px",
            fontWeight: "600",
            margin: "15px",
          }}
        >
          유저 정보
        </p>
        <p style={{ fontWeight: "700", marginBottom: "5px", textAlign:'center'}}>
          {/* 성별 별 표준몸무게,칼로리 및 기초대사량 구하기 */}
          {userInfo
            ? userInfo.userGender === 1
              ? `표준 몸무게: ${(
                  (parseInt(String(userInfo.userHeight).slice(-4, 3)) ** 2 /
                    10000) *
                  22
                ).toFixed(1)}kg 표준 칼로리: ${
                  (
                    (parseInt(String(userInfo.userHeight).slice(-4, 3)) **
                      2 /
                      10000) *
                    22
                  ).toFixed(1) * 30
                }kcal
                기초대사량: ${
                  parseInt(String(userInfo.userWeight).slice(-3, 2)) *
                  24 *
                  1
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
                  parseInt(String(userInfo.userWeight).slice(-3, 2)) *
                  24 *
                  0.9
                }kcal`
            : ""}
        </p>
        <p style={{ marginBottom: "20px", fontSize: "14px" }}>
          {userInfo
            ? `이름: ${userInfo.userName} 몸무게: ${String(
                userInfo.userWeight
              ).slice(-3, 2)}kg 키: ${String(userInfo.userHeight).slice(
                -4,
                3
              )}cm`
            : ""}
        </p>
      </SumNutreintContainer>
      <CardContainer>
        {filterCards.map((cards) => {
          return (
            <Card key={cards.userId + cards.cardKey}>
              <p style={{ fontSize: "13px" }}>
                <b>카드 번호:</b> {cards.cardKey}
              </p>
              <p style={{ color: "green", fontSize: "13px" }}>
                <b>먹은 시간:</b> {cards.cardShowDt}
              </p>
              <p style={{ fontSize: "13px" }}>
                <b>생성 시간:</b> {cards.cardCreateDt}
              </p>
              <p style={{ fontSize: "13px" }}>
                <b>카드 타입:</b> {cards.cardType}
              </p>

              <h3>{cards.cardMemo}</h3>
              <CardImg src={cards.cardImage ? cards.cardImage : Logo} />

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
            </Card>
          );
        })}
      </CardContainer>
    </>
  );
};

export default EvaluationCard;
