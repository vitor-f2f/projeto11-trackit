import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    a:visited { text-decoration: none; }
    a:hover { text-decoration: none; }
    a:focus { text-decoration: none; }
    a:active { text-decoration: none; }
    a {color: inherit;}
    body {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
    }
	button {
		height: 45px;
		border-radius: 5px;
		border-style: none;
		font-size: 21px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		&:disabled {
			background-color: lightgray;
		}
	}
	input {
		background: #FFFFFF;
		border: 1px solid #D4D4D4;
		border-radius: 5px;
		height: 43px;
		font-size: 20px;
		display: flex;
		align-items: center;
		&::placeholder{
			color: #d4d4d4;
		}
		
	}
`;

export default GlobalStyle;