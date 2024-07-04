import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		line-height: 1.3;
	}

	:focus{
		outline: 1px solid ${(props) => props.theme['yellow-dark']};
	}

	body{
		background: ${(props) => props.theme.background};
		color: ${(props) => props.theme['base-text']};
		-webkit-font-smoothing: antialiased;
	}

	body, input, textarea, button {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 1rem;
	}
`