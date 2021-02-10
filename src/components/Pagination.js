import React, { useRef } from "react";
import styled from "styled-components";
import "../css/Pagination.css";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 10px;
  color: white;
  padding: 1px;
  border: 3px solid #ff8080;
  background-color: rgba(0, 0, 0, 0.5);
  width: 55%;
  font-weight: 600;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #ff8080;
  }
  &:focus::after {
    color: white;
    background-color: #ff8080;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #ff8080;
  }
`;

const PageBody = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 5px;
  right: 15px;
  width: 175%;
  transition: 0.2s linear;
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const activeIn = useRef();

  function open() {
    activeIn.current.classList.add("active");
  }

  function close() {
    activeIn.current.classList.remove("active");
  }

  return (
    <div>
      <nav>
        <PageBody className="pagination" ref={activeIn}>
          <PageUl>
            <button
              style={{
                borderRadius: "5px",
                border: "2px solid gray",
                boxSizing: "border-box",
                position: "absolute",
                top: "-45px",
                fontWeight: "700",
                padding: "10px",
                cursor:'pointer',
                zIndex:'10'
              }}
              onClick={open}
            >
              페이지리스트 열기
            </button>
            <button
              style={{ marginRight: "15px",marginLeft:'3px',fontWeight: "700" }}
              onClick={close}
            >
              숨기기
            </button>
            Pagination
            {pageNumbers.map((number) => (
              <PageLi key={number} className="page-item">
                <PageSpan
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </PageSpan>
              </PageLi>
            ))}
          </PageUl>
        </PageBody>
      </nav>
    </div>
  );
};

export default Pagination;
