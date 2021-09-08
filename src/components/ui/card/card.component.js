import React from 'react'
import styled from 'styled-components'

import './card.styles.css'

const CardComponent = styled.div`
  margin: 2rem auto;
  width: 100%;
  text-align: ${({ textAlign }) => (textAlign || 'left')};
  max-width:  600px;
  background-color: #fff;
  margin: 4rem auto; 
  display: flex;

`
const Card = ({ children, textAlign }) => {
  return (
    <CardComponent textAlign={textAlign}>
      <section className="card-section">{children}</section>
    </CardComponent>

  )
}

export default Card
