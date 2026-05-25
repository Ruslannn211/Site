import styled from "styled-components";

const Spinner = styled.div`
    width: 18px;
    height: 18px;

    border-radius: 999px;

    border: 2px solid rgba(255,255,255,0.32);
    border-top-color: white;

    animation: spin 0.7s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export default Spinner;