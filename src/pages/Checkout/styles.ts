import styled from 'styled-components'

export const CheckoutContainer = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 448px;
  gap: 1.5rem;
`
export const MiniCartContainer = styled.aside`
  background: ${(props) => props.theme['base-card']};
  padding: 2.5rem;

  .item {
    display: flex;
  }

  .title-price {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 64px;
    height: 64px;
  }
`
