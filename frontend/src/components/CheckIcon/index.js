import { h } from "preact";
import { css } from "goober";

const CheckIconClass = css`
    width: 32px;
    height: 32px;
    fill: currentColor;
`;

const CheckIcon = ({ ...props }) => {
    return (
        <svg viewBox="0 0 24 24" className={CheckIconClass} {...props}>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
        </svg>
    );
};

export default CheckIcon;
