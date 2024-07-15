import styled from 'styled-components'

export const CheckoutContainer = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 448px;
  gap: 1.5rem;

  h2 {
    font-size: 1.125rem;
    padding-bottom: 1rem;
    font-family: 'Baloo 2', sans-serif;
  }
`
export const MiniCartContainer = styled.aside`
  background: ${(props) => props.theme['base-card']};
  padding: 2.5rem;
  border-radius: 28px;

  .summary {
    p {
      display: flex;
      padding-bottom: 0.5rem;

      span {
        flex: 1;
        text-align: right;
      }
    }

    .grandTotal {
      font-size: 1.25rem;
      font-weight: bold;

      p {
        padding-bottom: 0;
      }
    }
  }

  .confirm {
    button {
      width: 100%;
      background: ${(props) => props.theme.yellow};
      border: none;
      color: ${(props) => props.theme.white};
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.5s all;
      text-transform: uppercase;
      margin-top: 1.5rem;
    }
  }

  .items {
    padding-bottom: 1.5rem;

    img {
      width: 64px;
      height: 64px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      gap: 1.25rem;
      padding: 1.5rem 0;
      border-bottom: 2px dotted ${(props) => props.theme['base-button']};

      &:first-child {
        padding-top: 0;
      }

      .second {
        flex: 1;

        h3 {
          font-weight: normal;
          padding-bottom: 0.5rem;
        }

        .controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          button {
            display: flex;
            align-items: center;
            height: 38px;
            background-color: ${(props) => props.theme['base-button']};
            border: none;
            cursor: pointer;
            border-radius: 8px;
            padding: 0.5rem;

            svg {
              color: ${(props) => props.theme.purple};
              margin-right: 0.25rem;
            }
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
          width: 70px;

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

      .third {
        font-weight: bold;
      }
    }
  }
`
