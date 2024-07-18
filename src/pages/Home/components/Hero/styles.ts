import styled from 'styled-components'

export const HeroWrapperContainer = styled.section`
  position: relative;
  padding: 0 2rem;

  @media (width < 768px) {
    div {
      flex-wrap: wrap;
    }
  }

  .heroBg {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 544px;
    width: 100vw;
    z-index: -2;
  }
`

export const HeroContainer = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 5.875rem 2rem;
  z-index: 1;

  .left {
    width: 60%;
  }

  /* .right {
    flex-shrink: 2;
  } */

  & > div {
    width: 50%;
  }

  @media (width < 1025px) {
    padding: 4rem 0;
    & > div {
      width: 100% !important;
    }
  }

  h1 {
    font-family: 'Baloo 2', sans-serif;
    line-height: 1.3;
    font-size: clamp(2rem, 5vw, 3rem);
    color: ${(props) => props.theme['base-title']};
  }

  h2 {
    margin: 1rem 0 4.125rem;
    line-height: 1.3;
    font-size: clamp(1rem, 5vw, 1.25rem);
    font-weight: 400;
    color: ${(props) => props.theme['base-subtitle']};
  }

  .highlights {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;
      gap: 0.5rem;
      /* justify-content: space-between; */

      @media (width < 600px) {
        text-align: center;
        justify-content: center;
      }

      .yellow-dark {
        background: ${(props) => props.theme['yellow-dark']};
      }
      .base-text {
        background: ${(props) => props.theme['base-text']};
      }
      .yellow {
        background: ${(props) => props.theme.yellow};
      }
      .purple {
        background: ${(props) => props.theme.purple};
      }

      span {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 / 1;

        svg {
          fill: ${(props) => props.theme.white};
        }
      }
    }
  }
`
