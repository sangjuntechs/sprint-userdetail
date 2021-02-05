import React from 'react';
import styled from 'styled-components';

const PageUl = styled.ul`
  float:left;
  list-style: none;
  text-align:center;
  border-radius:10px;
  color:white;
  padding:1px;
  border:3px solid #ff8080;
  background-color: rgba(0,0,0,0.5);
  width:55%;
  font-weight:600;
`;

const PageLi = styled.li`
  display:inline-block;
  font-size:17px;
  font-weight:600;
  padding:5px;
  border-radius:5px;
  width:25px;
  &:hover{
    cursor:pointer;
    color:white;
    background-color:#ff8080;
  }
  &:focus::after{
    color:white;
    background-color:#ff8080;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#ff8080;
  }
`;

const PageBody = styled.div`
  display:flex;
  justify-content:flex-end;
  align-items:center;
  position:fixed;
  bottom:5px;
  right:15px;
  width:175%;
`

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageBody>
        <PageUl className="pagination">
            Pagination
          {pageNumbers.map(number => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
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