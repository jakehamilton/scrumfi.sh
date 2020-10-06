import { h } from "preact";
import { useMemo } from "preact/hooks";
import Router from "preact-router";
import { createHashHistory } from "history";
import Home from "../Home";
import Error404 from "../Error404";
import Room from "../Room";

const AppContent = ({ ...props }) => {
    const history = useMemo(() => {
        return createHashHistory();
    }, []);

    return (
        <Router history={history}>
            <Error404 default />
            <Home path="/" {...props} />
            <Room path="/room/:id" {...props} />
        </Router>
    );
};

export default AppContent;
