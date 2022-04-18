import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

type RatingComponentProps = {
  total: number,
  selected?: number,
  onChange?: (value: number) => void
}

const Wrapper = styled.div`
  color: var(--primary2);

  & .selected {
    color: var(--primary3);
  }
`

const RatingComponent = ({
  total,
  selected = 0,
  onChange
}: RatingComponentProps) => {
  return (
    <Wrapper>
      {
        Array.from({ length: total }, (val: number, index: number) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            onClick={() => { onChange && onChange(index + 1) }}
            className={index < selected ? 'selected' : ''}
          />
        ))
      }
    </Wrapper>
  )
}

export default RatingComponent
