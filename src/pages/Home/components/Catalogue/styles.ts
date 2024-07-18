import styled from 'styled-components'

export const CatalogueContainer = styled.section`
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 2rem;

  h2 {
    margin-bottom: 4rem;
    font-family: 'Baloo 2', sans-serif;
    font-size: 2rem;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }

  @media (width < 1025px) {
    .items {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (width < 768px) {
    .items {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (width < 480px) {
    .items {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
`
export const CatalogueItemContainer = styled.div`
  background-color: ${(props) => props.theme['base-card']};
  border-top-right-radius: 28px;
  border-bottom-left-radius: 28px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 1.25rem;
  margin-bottom: 2rem;

  img {
    margin-top: -25%;
    position: relative;
    left: calc(50% - 50px);
  }

  .tags {
    display: flex;
    text-align: center;
    margin: 0.75rem 0;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;

    .coffeeType {
      text-align: center;
      background-color: ${(props) => props.theme['yellow-light']};
      color: ${(props) => props.theme.yellow};
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      font-size: 0.625rem;
      font-weight: 800;
      border-radius: 1rem;
    }
  }

  h3 {
    font-family: 'Baloo 2', sans-serif;
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${(props) => props.theme['base-label']};
    font-size: 0.875rem;
    text-align: center;
  }

  .controls {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 2rem;

    .price b {
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.5rem;
      margin-right: 1.5rem;
    }

    .cart {
      background-color: ${(props) => props.theme['purple-dark']};
      color: ${(props) => props.theme.white};
      border: none;
      height: 38px;
      padding: 0.5rem;
      border-radius: 8px;
      transition: 0.5s all;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme.purple};
      }
    }

    .counter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${(props) => props.theme['base-button']};
      padding: 0.5rem;
      border-radius: 8px;
      height: 38px;
      font-size: 1rem;

      .qty {
        padding: 0 0.5rem;
        border: none;
        width: 40px;
        text-align: center;
        background: transparent;
      }

      a {
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme.purple};
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
`
