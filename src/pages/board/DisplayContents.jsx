import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
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
const Title = styled.div`
  width: 100%;
`;
const MainText = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 50vh;
`;
export default function Reader() {
  const {
    state: { title, description },
  } = useLocation();
  return (
    <Container>
      <ContentsBox>
        <Title>{title}</Title>
        <MainText>{description}</MainText>
      </ContentsBox>
    </Container>
  );
}
