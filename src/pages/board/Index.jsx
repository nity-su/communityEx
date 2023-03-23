import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import apiCall from "../../services/getBoardContents";
import { Link, useMatch } from "react-router-dom";
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

const PageList = styled.div`
  display: flex;
  justify-content: center;
`;
const PageNum = styled.span`
  font-size: 16px;
  margin-right: 2px;
  cursor: pointer;
`;

export default function Index() {
  const ref = useRef(0);
  const [state, setState] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageClick, setPageClick] = useState(0);
  console.log(process.env.domain);
  useEffect(() => {
    // sessionStorage.setItem("myValue", state);
    // const storedValue = sessionStorage.getItem("myValue");

    apiCall(pageClick)
      .then((result) => {
        setPageIndex(result[1] / 5);
        setState(result[0]);
      })
      .catch(console.log);

    //총 게시글 수가 변경 되었는가?
    //

    // apiCall()
    //   .then((result) => setState(result))
    //   .catch(console.log);
    // setState([{ time: "aa1a", title: "bbb", user_id: "teamp" }]);
  }, [pageClick]);

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
        <PageList>
          {Array.from({ length: pageIndex + 1 }).map((_, i) => (
            <PageNum
              key={i}
              onClick={() => {
                setPageClick(i);
              }}
            >
              {i + 1}
            </PageNum>
          ))}
        </PageList>
      </BoardWrapper>
    </Container>
  );
}
