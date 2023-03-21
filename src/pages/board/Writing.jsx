import React, { useRef, useState } from "react";
import styled from "styled-components";
import getWalletAddress from "../../services/getWalletAddress";
import now from "../../utils/nowTime";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";

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

const ButtonBox = styled.div``;
const SubmitBtn = styled.button``;

const WalletConnectBtn = styled.button``;

export default function Writing() {
  const [mouseOn, setEvent] = useState();
  const ref = useRef();
  const navigate = useNavigate();
  function inputChangeHandler(e) {
    e.preventDefault();
    document.body.style.cursor = "wait";

    const formdata = {
      title: e.target.title.value,
      user_id: ref.current ? ref.current : "temp",
      description: e.target.description.value,
      time: now(),
    };

    fetch(`${process.env.domain}/api`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((data) => data.json())
      .then(() => {
        document.body.style.cursor = "default";
        navigate("/");
      })
      .catch(console.log);
  }

  const mouseEvent = () => {
    setEvent((state) => !state);
  };
  return (
    <Container>
      <ContentsBox>
        <form onSubmit={inputChangeHandler}>
          <Title type="text" name="title" />
          <MainText name="description" />
          <WalletConnectBtn
            onClick={(e) => {
              e.preventDefault();
              getWalletAddress().then((addressArray) => {
                ref.current = addressArray[0];
                console.log(ref.current);
              });
            }}
            onMouseOver={mouseEvent}
            onMouseOut={mouseEvent}
          >
            지값 주소
          </WalletConnectBtn>
          {mouseOn ? <span>wallet이 있어야 합니다.</span> : null}
          <ButtonBox>
            <SubmitBtn onClick={() => {}}>제출하기</SubmitBtn>
          </ButtonBox>
        </form>
      </ContentsBox>
    </Container>
  );
}
