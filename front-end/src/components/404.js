import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Page404 = () => {
  return (
    <Wrapper>
      <div>
        <h1>Ooops, the page does not exists...</h1>
        <label>or you don't have access to it</label>
      </div>
    </Wrapper> 
  )
}

export default Page404