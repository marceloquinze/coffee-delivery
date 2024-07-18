import styled from 'styled-components'

export const SuccessContainer = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 2rem;

  @media (width < 768px) {
    flex-direction: column;
    row-gap: 2rem;

    & > div {
      width: 100%;
    }
  }

  h1 {
    font-family: 'Baloo 2', sans-serif;
    font-size: 2rem;
    color: ${(props) => props.theme['yellow-dark']};
    margin-bottom: 0.5rem;
  }
`
export const OrderSummaryContainer = styled.div`
  margin-top: 1rem;
  padding: 2.5rem;
  border-radius: 6px 36px;
  border: 2px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: linear-gradient(to left, #dbac2c, #8047f8);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  svg {
    color: ${(props) => props.theme.white};
    border-radius: 50%;
    padding: 0.35rem;
    width: 32px;
    height: 32px;
  }

  & > div {
    display: flex;
    gap: 0.5rem;
  }

  .items {
    svg {
      background: ${(props) => props.theme['purple-dark']};
    }
    ul {
      list-style: circle;
      margin-left: 1rem;
      font-style: italic;
    }
  }
  .address {
    svg {
      background: ${(props) => props.theme.purple};
    }
  }
  .delivery {
    svg {
      background: ${(props) => props.theme.yellow};
    }
  }
  .payment {
    svg {
      background: ${(props) => props.theme['yellow-dark']};
    }
  }
`
