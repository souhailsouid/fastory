
import styled from 'styled-components'

export const Container = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 20vh;
    max-width: 1000px;
    margin: auto;
    text-align: center;
    color: red
`
export const CardComponent = styled.div`
    margin: 2rem auto;
    width: 100%;
    text-align: ${({ textAlign }) => (textAlign || 'left')};
    max-width:  600px;
    background-color: #fff;
    margin: 4rem auto; 
    display: flex;
`

export const Wrapper = styled.section`
    display: flex;
    justify-content: center;
`
export const InnerLoading = styled.div`
    min-height: ${({ minHeight }) => minHeight};
    display: grid;
    place-items: center;
`
export const TextLoading = styled.p`
    font-size: 1.375rem;
    font-weight: 500;
    color: #5880a6;
    margin-bottom: 30px;
`
export const WrapperLoading = styled.div`
    text-align: center;
`
