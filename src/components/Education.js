import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import Highlighter from 'react-highlight-words'

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const Input = styled.input`
  padding: 10px;
`;

const FilterEvalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 700px;
  height: 700px;
  overflow: scroll;
  padding: 30px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EvalCard = styled.div`
  margin: 15px;
`;


const Education = () => {
  useEffect(() => {
    Axios.get(
      `http://54.180.61.201:8080/space_for_nutrition_managers-0.0.1-SNAPSHOT/manager-evaluation`
    ).then((response) => {
      setEvaluation(response.data);
      console.log(response.data);
    });
  }, []);

  const [evaluation, setEvaluation] = useState([]);
  const [findMemo, setFindMemo] = useState([]);
  const [searchMemo, setSearchMemo] = useState([]);
  const [word, setWord] = useState("");

  const findMemos = () => {
    const searchMemos = evaluation.filter((findEval) => {
      return findEval.meMemo.toLowerCase().includes(findMemo);
    });
    setSearchMemo(searchMemos);
    searchMemos.reverse();
  };

  const searchWord = () => {
    setWord(findMemo);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "memo") {
      setFindMemo(value);
      console.log(findMemo);
    }
  };
  const onKeyPressHistory = (e) => {
    if (e.key === "Enter") {
      findMemos();
      searchWord();
    }
  };

  return (
    <BodyContainer>
      <InputContainer>
        <p style={{ fontSize: "14px" }}>단어 작성 후 Enter를 누르세요.</p>
        <Input
          type="text"
          name="memo"
          onKeyPress={onKeyPressHistory}
          onChange={onChange}
          placeholder="찾을 단어를 검색하세요."
        />
      </InputContainer>
      {searchMemo[0] ? (
        <p style={{ color: "red", marginTop: "15px" }}>
          '{word}'(으)로 검색된 결과입니다.
        </p>
      ) : (
        <p style={{ color: "red", marginTop: "15px" }}>
          '{word}'에 대한 검색 결과가 없습니다.
        </p>
      )}
      <FilterEvalContainer>
        {searchMemo.map((evals) => {
          return (
            <EvalCard>
              <p style={{lineHeight:'20px'}}>
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[word]}
                autoEscape={true}
                textToHighlight ={evals.meMemo}
              / >
              </p>
              <p style={{ fontSize: "13px", color: "gray" }}>
                {evals.meCreateDt}
              </p>
              <p style={{ fontSize: "13px", color: "gray" }}>
                {evals.managerId}
              </p>
            </EvalCard>
          );
        })}
      </FilterEvalContainer>
    </BodyContainer>
  );
};

export default Education;
