import styled from 'styled-components'

export const UserContainer = styled.main`
  max-width: 70rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 448px;
  gap: 1.5rem;
  padding: 2rem;

  @media (width < 768px) {
    grid-template-columns: 1fr;
  }

  h1 {
    font-family: 'Baloo 2', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.3;
    padding-bottom: 1rem;
    color: ${(props) => props.theme['base-subtitle']};
  }

  .tabs input[type='radio'] {
    display: none;
  }

  .tabs label {
    padding: 10px 20px;
    cursor: pointer;
    background-color: ${(props) => props.theme['base-button']};
    display: inline-block;
    margin-right: -4px;
    border: 1px solid transparent;
  }

  .tabs .content {
    border-top: none;
    padding: 1rem 0;
  }

  .tabs .content-tab {
    display: none;
  }

  .tabs input[type='radio']:checked + label {
    background-color: #fff;
    border-bottom: 1px solid #fff;
  }

  #address:checked ~ .content #content1,
  #history:checked ~ .content #content2 {
    display: block;
  }

  #content2 {
    .eachOrder {
      display: flex;
      gap: 1rem;
      padding: 2rem;
      background: ${(props) => props.theme['base-card']};
      border: 1px dotted ${(props) => props.theme['base-button']};

      ul {
        list-style: circle;
        margin-left: 1rem;
        font-style: italic;
      }
    }
  }
`
