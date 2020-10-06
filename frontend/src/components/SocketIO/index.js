import { h, createContext } from "preact";
import { useMemo, useEffect, useState } from "preact/hooks";
import io from "socket.io-client";

export const SOCKET_IO_CONTEXT = createContext({
    socket: null,
});

const SocketIO = ({
    host = window.location.host,
    path = "",
    port = "",
    children,
}) => {
    const [user, setUser] = useState({
        name: "Unknown",
        id: "",
    });

    const socket = useMemo(() => {
        const socket = io(`${host}${port ? `:${port}` : ""}${path}`, {
            host,
            path,
            port,
        });

        return socket;
    }, [host, path]);

    useEffect(() => {
        socket.on("set:user", (user) => {
            setUser(user);
        });
    }, [socket]);

    return (
        <SOCKET_IO_CONTEXT.Provider value={{ socket, user }}>
            {children}
        </SOCKET_IO_CONTEXT.Provider>
    );
};

export default SocketIO;
