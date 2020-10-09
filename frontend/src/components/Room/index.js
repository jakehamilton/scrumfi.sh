import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import cn from "classnames";
import { css } from "goober";
import { H1, H4, Gap, Button } from "@jakehamilton/ui";

import Waiting from "../Waiting";
import useSocket from "../../hooks/useSocket";
import Guessing from "../Guessing";
import Results from "../Results";

const RoomClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const LoadingClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Content = ({ room }) => {
    return room.state.guessing ? (
        <Guessing room={room} />
    ) : (
        <>
            <Waiting room={room} />
            <Gap vertical size={6} />
            <Results room={room} />
        </>
    );
};

const Room = ({ className, id }) => {
    const { socket } = useSocket();

    const [room, setRoom] = useState(null);

    useEffect(() => {
        socket.emit("room:join", { id });
        socket.on("room:update", (data) => {
            setRoom(data);
        });

        return () => {
            socket.emit("room:leave", { id });
        };
    }, []);

    return (
        <div className={cn(RoomClass, className)}>
            {room ? (
                <Content room={room} />
            ) : (
                <div className={LoadingClass}>
                    <Gap vertical size={6} />
                    <H1>Loading</H1>
                    <H4 color="text.light">{id}</H4>
                </div>
            )}
        </div>
    );
};

export default Room;
