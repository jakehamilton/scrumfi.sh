import { h } from "preact";
import { glob, css } from "goober";
import { AppBar, Block, useTheme, H3, Button } from "@jakehamilton/ui";

import GitHubIcon from "./components/GitHubIcon";
import AppContent from "./components/AppContent";
import SocketIO from "./components/SocketIO";
import useScript from "./hooks/useScript";

const AppClass = ({ background }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: ${background};
    overflow: auto;
`;

const AppBarClass = css`
    flex-shrink: 0;
`;

const AppContentClass = css`
    flex-grow: 1;
`;

const App = () => {
    const { theme } = useTheme();

    return (
        <Block className={AppClass({ background: theme.background.main })}>
            <AppBar
                className={AppBarClass}
                color="background.light"
                left={<H3>🐠 scrumfi.sh</H3>}
                right={
                    <Button
                        variant="text"
                        color="text"
                        as="a"
                        href="https://github.com/jakehamilton/scrumfi.sh"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <GitHubIcon />
                    </Button>
                }
            />
            <SocketIO host={process.env.API_HOST} port={process.env.API_PORT}>
                <AppContent className={AppContentClass} />
            </SocketIO>
        </Block>
    );
};

export default App;
