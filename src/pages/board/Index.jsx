import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiCall from "../../services/getBoardContents";
import { Link } from "react-router-dom";
import subString from "../../utils/subString";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
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
const ContentsWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Title = styled.div`
  display: inline-block;
  font-size: 20px;
  padding: 4px 0px 4px 4px;
  width: 70%;
  border-top: 1px;
  border-bottom: 1px;
  border-color: hsl(62, 100%, 91%);
  cursor: pointer;
`;

const WriterId = styled.div`
  display: inline-block;
  font-size: 16px;
  width: 30%;
  text-align: center;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
`;

const LinkStyle = styled(Link)`
  width: 120px;
  font-size: 28px;
  margin: 0px 50%;
  margin-bottom: 12px;
`;

const BoardHeadWrapper = styled.div`
  min-width: 40vw;
  padding: 4px 0px;
  border-top: 1px;
  border-bottom: 1px;
  border-left: 0px;
  border-right: 0px;
  text-align: center;
  border-color: black;
  border-style: solid;
`;
const BoardTitle = styled.div`
  border: none;
  width: 70%;
  text-align: center;
  font-weight: bold;
  display: inline-block;
`;
const BoardWriterID = styled.div`
  width: 30%;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`;

export default function Index() {
  const [state, setState] = useState(false);
  console.log(process.env.domain);
  useEffect(() => {
    apiCall()
      .then((result) => setState(result))
      .catch(console.log);
    // setState([
    //   { time: "aa1a", title: "bbb" },
    //   { time: "abaa", title: "bbb" },
    //   ,
    //   { time: "aa3a", title: "bbb" },
    // ]);
  }, []);

  return (
    <Container>
      <LinkStyle to="write" state="내용">
        글쓰기
      </LinkStyle>
      <BoardHeadWrapper>
        <BoardTitle>제목</BoardTitle>
        <BoardWriterID>작성자</BoardWriterID>
      </BoardHeadWrapper>
      <BoardWrapper>
        {state
          ? state.map((v, i) => (
              <ContentsWrapper key={v.time}>
                <Title>{v.title}</Title>
                <WriterId>{v.user_id.slice(0, 7)}</WriterId>
              </ContentsWrapper>
            ))
          : null}
      </BoardWrapper>
    </Container>
  );
}
