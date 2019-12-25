import styled from 'styled-components'

export const TodayCard = styled.div`
    display:flex;
    flex-direction:column;
    padding: 10px;
    align-items: center;

`
export const DetailsToday = styled.div`
    align-self: center;
    display:flex;
    flex-direction:row;
    padding: 10px;
    justify-content: space-between;
`
export const DetailsWeek = styled.div`
    align-self: center;
    flex-flow: wrap;
    display:flex;
    flex-direction:row;
    padding: 10px;
    margin:10px;
`

export const Information = styled.div`
    display:flex;
    flex-direction:row;
    text-align: center;
    justify-content: space-between;

`
export const GeneralInformation = styled.div`
    display:flex;
    flex-direction:column;
`

export const FavoritesS = styled.div`
 display:flex;
    flex-direction:column;
    text-align: center;
    align-self: center;
  `

export const Temperature = styled.div`
    font-size:50px;
    display: flex;
    justify-content: flex-end;
    align-self: center;
    font-weight:bold;


  `
export const Name = styled.div`
font-size:30px;
font-weight:bold;
padding:5px;
`
export const Country = styled.div`
font-size:13px;
font-weight:bold;
padding:5px;

`
export const DateToday = styled.div`
font-size:8px;
font-weight:bold;
padding:5px;

`
export const TextTemperature = styled.div`
font-size:20px;
display: flex;
align-self: center;

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

