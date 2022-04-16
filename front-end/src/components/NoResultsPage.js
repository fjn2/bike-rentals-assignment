import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: auto;
`

const NoResultPage = () => {
  return (
    <Wrapper>
      <div>
        <h3>
          We couldn't find any result...
        </h3>
        <label>That matchs with your search criteria</label>
      </div>
    </Wrapper>
  )
}

export default NoResultPage