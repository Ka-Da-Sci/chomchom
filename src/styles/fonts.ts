import { createGlobalStyle } from 'styled-components';
const GlobalFonts = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;700&family=Montserrat:wght@400;700&display=swap');

    body {
        font-family: 'Inter', sans-serif;
    }

    .poppins {
        font-family: 'Poppins', sans-serif;
    }

    .montserrat {
        font-family: 'Montserrat', sans-serif;
    }
`;

export default GlobalFonts;