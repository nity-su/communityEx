import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiCall from "../../services/getBoardContents";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const BoardWrapper = styled.div`
  display: flex;
  min-width: 40vw;
  flex-direction: column;

  font-family: "Nanum Gothic", sans-serif;
  font-family: "Nanum Gothic Coding", monospace;
`;

const Title = styled.div`
  font-size: 16px;
  padding: 4px 0px;
  width: 100%;
  border-top: 1px;
  border-bottom: 1px;
  border-color: hsl(0, 0%, 71%, 0.1);
`;

export default function Index() {
  const [state, setState] = useState(false);
  useEffect(() => {
    apiCall()
      .then((result) => setState(result))
      .catch(console.log);
  }, []);

  return (
    <Container>
      <BoardWrapper>
        {state
          ? state.map((v, i) => <Title key={v.time}>{v.title}</Title>)
          : null}
      </BoardWrapper>
    </Container>
  );
}
