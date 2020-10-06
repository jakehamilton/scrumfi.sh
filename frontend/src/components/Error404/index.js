import { h } from "preact";
import { css } from "goober";
import { Gap, H1, H4, Button } from "@jakehamilton/ui";

const Error404Class = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LinkClass = css`
    text-decoration: none;
`;

const Error404 = () => {
    return (
        <div className={Error404Class}>
            <Gap vertical size={6} />
            <H1>404</H1>
            <H4>This Page Does Not Exist</H4>
            <Gap vertical size={6} />
            <Button variant="outlined" as="a" href="/" className={LinkClass}>
                Go Home
            </Button>
        </div>
    );
};

export default Error404;
