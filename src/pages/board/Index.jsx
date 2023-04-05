import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiCall from "../../services/getBoardContents";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
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
const Title = styled(NavLink)`
  display: inline-block;
  font-size: 20px;
  padding: 4px 0px 4px 4px;
  width: 70%;
  border-top: 1px;
  border-bottom: 1px;
  border-color: hsl(62, 100%, 91%);
  text-decoration: none;
  color: black;

  cursor: pointer;
`;

const WriterId = styled.div`
  display: inline-block;
  font-size: 16px;
  width: 30%;
  padding: 4px 0px 4px 0px;
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
  margin-bottom: 4px;
  border-top: 1px;
  border-bottom: 1px;
  border-left: 0px;
  border-right: 0px;
  background-color: hsla(0, 2%, 95%, 0.5);
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
  padding: 0px 4px;
  border-radius: 4%;
  font-size: 16px;
  font-weight: 400;
  color: ${({ index, pageClick }) => {
    console.log(pageClick);
    return index === pageClick ? "purple" : "#ced0cf";
  }};

  ${({ index, pageClick }) => {
    return index === pageClick
      ? "background-color:hsla(0, 2%, 95%, 0.5); border: 1px solid black;"
      : "background-color:white";
  }}
`;

// const initialState = {
//   loading: false,
//   pageClick: 1,
//   pageLength: 0,
//   data: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "loading":
//       return { loading: action.loading };
//     case "pageClick":
//       return { pageClick: action.pageClick };
//     case "pageLength":
//       return { pageLength: action.pageLength };

//     case "data":
//       return { data: action.data };

//     default:
//       break;
//   }
// };

export default function Index() {
  const [state, setState] = useState(null);
  const [pageLength, setPageLength] = useState(0);
  const [pageClick, setPageClick] = useState(1);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      Number.parseInt(sessionStorage.getItem("pageNum")) ===
      Number.parseInt(params.num)
    ) {
      setState(JSON.parse(sessionStorage.getItem("myValue")));
      setPageLength(Number.parseInt(sessionStorage.getItem("pageLength")));
      return;
    } else {
    }

    setLoading(true);
    apiCall(pageClick - 1)
      .then((result) => {
        const length = result[1] / 5;
        setPageLength(length);
        setState(result[0]);
        console.log("length", result[1]);
        sessionStorage.setItem("myValue", JSON.stringify(result[0]));
        sessionStorage.setItem("pageNum", pageClick);
        sessionStorage.setItem("pageLength", length);
        setLoading(false);
      })
      .catch(console.log);
  }, [pageClick, params]);

  return (
    <>
      <Container>
        <LinkStyle to="/write" state="내용">
          글쓰기
        </LinkStyle>
        <BoardHeadWrapper>
          <BoardTitle>제목</BoardTitle>
          <BoardWriterID>작성자</BoardWriterID>
        </BoardHeadWrapper>
        <BoardWrapper>
          {loading ? (
            <Loading />
          ) : state ? (
            state.map((v, i) => (
              <ContentsWrapper key={v.time}>
                <Title to="/reader" state={state[i]}>
                  {v.title}
                </Title>
                <WriterId>{v.user_id.slice(0, 7)}</WriterId>
              </ContentsWrapper>
            ))
          ) : null}
          <PageList>
            {Array.from({ length: pageLength + 1 }).map((_, i) => {
              const index = i + 1;

              return (
                <PageNum
                  key={i}
                  onMouseOver={(e) => {
                    if (index === pageClick) {
                      console.log(e.target);
                      e.target.style.cursor = "auto";
                    } else {
                      e.target.style.cursor = "pointer";
                    }
                  }}
                  onClick={(e) => {
                    if (index === pageClick) {
                      return;
                    }
                    setPageClick(index);
                    navigate(`/page/${index}`);
                  }}
                  index={index}
                  pageClick={pageClick}
                >
                  {index}
                </PageNum>
              );
            })}
          </PageList>
        </BoardWrapper>
      </Container>
    </>
  );
}
