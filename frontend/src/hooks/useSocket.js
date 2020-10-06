import { useContext } from "preact/hooks";

import { SOCKET_IO_CONTEXT } from "../components/SocketIO";

const useSocket = () => {
    const socket = useContext(SOCKET_IO_CONTEXT);

    return socket;
};

export default useSocket;
