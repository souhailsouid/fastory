
import React, { useState } from 'react'

import SearchBarComponent from 'components/ui/search-bar/search-bar.component'
import Spinner from 'components/ui/spinner/spinner'

import { Container } from 'components/ui/styled-component/styled-component'

const HomeComponent = () => {
  const [isLoading, setLoading] = useState(false)

  return isLoading
    ? <Spinner />
    : <Container >
      <SearchBarComponent setLoading={setLoading} />
    </Container>
}

export default HomeComponent
