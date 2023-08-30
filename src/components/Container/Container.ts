import { styled } from "styled-components";


export const Container = styled.div`
  display: flex;
  height: 300px;
  justify-content: space-evenly;
  margin-top: 10px;
  align-items: center;
  background-color: #7072bc;
  overflow: hidden;
  @media screen and (max-width: 767px){
    display: block;
    padding: 1em 1em;
    height: 100px;

  }
`;