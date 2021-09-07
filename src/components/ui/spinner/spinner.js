import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

export default function Spinner ({ minHeight = '70vh', message }) {
  return (
    <Wrapper>
      <InnerLoading minHeight={minHeight}>
        <WrapperLoading>
          <TextLoading>
            {message || 'Chargement des informations...'}
          </TextLoading>
          <CircularProgress color="primary" />
        </WrapperLoading>
      </InnerLoading>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`
const InnerLoading = styled.div`
  min-height: ${({ minHeight }) => minHeight};
  display: grid;
  place-items: center;
`
const TextLoading = styled.p`
  font-size: 1.375rem;
  font-weight: 500;
  color: #5880a6;
  margin-bottom: 30px;
`
const WrapperLoading = styled.div`
  text-align: center;
`
