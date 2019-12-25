import styled from 'styled-components'

export const HomePageContainer = styled.div`
display:flex;
flex-direction:column;
    padding: 10px;
    text-align: center;

`
export const SearchContainer = styled.div`
    padding: 10px;
    align-self: flex-end;


`
export const DetailsContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding: 10px;
    text-align: center;

`
export const Inp = styled.label`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  `

  export const Label = styled.span`
 position: absolute;
    top: 5px;
    left: 0;
    font-size: 16px;
    color: #9098A9;
    font-weight: 500;
    transform-origin: 0 0;
    transition: all .2s ease;
  `
  export const Border = styled.span`
   position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background:#0077FF;
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: all .15s ease;
   `
    export const Input = styled.input`
    -webkit-appearance: none;
    border: 0;
    font-family: inherit;
    padding: 0 0;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid #C8CCD4;
    background: none;
    border-radius: 0;
    color: #223254;
    transition: all .15s ease;
    &:hover{

      background: rgba(#223254,.03);
    }
    &:not(:placeholder-shown){
      + span{
        color:#5A667F;
        transform: translateY(-26px) scale(.75);
      }
    }
    &:focus{

    
      background: none;
      outline: none;
      + span{
        color:#0077FF;
        transform: translateY(-26px) scale(.75);
        + .border{
            transform: scaleX(1);
        }
      }
    }
    `
  
 

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Button = styled.div`
    color:white;
    padding:10px;
    background:transparent;
    border:none;
    font-size:20px;
    margin-right:10px;
    outline:none;
    cursor:pointer;
`

export const Title = styled.div`
    font-size:30px;
    margin-right:10px;
    padding:10px;
    color:white;
`

