import React from "react";
import styled from "styled-components";
import now from "../../utils/nowTime";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40vw;
`;
const Title = styled.input`
  width: 100%;
`;
const MainText = styled.textarea`
  margin-top: 16px;
  width: 100%;
  height: 50vh;
  resize: none;
`;

const TextForID = styled.input``;

const ButtonBox = styled.div``;
const SubmitBtn = styled.button``;

export default function Writing() {
  function inputChangeHandler(e) {
    e.preventDefault();
    const formdata = {
      title: e.target.title.value,
      user_id: "임시",
      description: e.target.description.value,
      time: now(),
    };

    fetch("http://183.107.5.160:8080/api", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((data) => data.json())
      .then(console.log)
      .catch(console.log);
  }

  return (
    <Container>
      <ContentsBox>
        <form onSubmit={inputChangeHandler}>
          <Title type="text" name="title" />
          <MainText name="description" />
          <ButtonBox>
            <SubmitBtn onClick={() => {}}>제출하기</SubmitBtn>
          </ButtonBox>
        </form>
      </ContentsBox>
    </Container>
  );
}
