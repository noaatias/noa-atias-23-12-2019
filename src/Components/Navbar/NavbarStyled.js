import styled from 'styled-components'


export const NavbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom:1px solid black;
    padding:10px;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background:blue;
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

