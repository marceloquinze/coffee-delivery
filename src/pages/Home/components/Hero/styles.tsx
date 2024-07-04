import styled from 'styled-components'

export const HeroWrapperContainer = styled.section`
  position: relative;

  .heroBg {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 544px;
    width: 100vw;
    /* object-fit: cover; */
  }
`

export const HeroContainer = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 5.875rem 0;

  h1 {
    font-family: 'Baloo 2', sans-serif;
    line-height: 1.3;
    font-size: 3rem;
    color: ${(props) => props.theme['base-title']};
  }

  h2 {
    margin: 1rem 0 4.125rem;
    line-height: 1.3;
    font-size: 1.25rem;
    font-weight: 400;
    color: ${(props) => props.theme['base-subtitle']};
  }

  .highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;

    .item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: calc(50% - 0.5rem);
      margin-bottom: 1.25rem;

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

        svg {
          fill: ${(props) => props.theme.white};
        }
      }
    }
  }
`
