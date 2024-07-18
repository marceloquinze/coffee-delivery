import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background: ${(props) => props.theme['base-title']};

  .wrapper {
    max-width: 70rem;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    p {
      color: ${(props) => props.theme.white};
    }

    .user-items {
      nav {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      svg {
        color: ${(props) => props.theme.white};
      }
    }
  }
`
