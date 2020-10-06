import "preact/debug";
import "preact/devtools";
import { h, render } from "preact";
import { ThemeProvider, util } from "@jakehamilton/ui";
import App from "./App";

util.theme.injectGlobalStyles();

render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
