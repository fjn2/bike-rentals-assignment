import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

type RatingComponentProps = {
  total: number,
  selected: number,
  onChange?: (value: number) => void
}

const Wrapper = styled.div`

  & .selected {
    color: orange;
  }
`

const RatingComponent = ({
  total,
  selected,
  onChange
}: RatingComponentProps) => {
  return (
    <Wrapper>
      {
        Array.from({ length: total }, (val: number, index: number) => (
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => { onChange && onChange(val) }}
            className={index < selected ? 'selected' : ''}
          />
        ))
      }
    </Wrapper>
  )
}

export default RatingComponent
