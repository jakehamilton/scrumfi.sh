import { h } from "preact";
import { route } from "preact-router";
import cn from "classnames";
import { css } from "goober";
import { H1, H4, Gap, Button } from "@jakehamilton/ui";

import useSocket from "../../hooks/useSocket";

const HomeClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const FishClass = css`
    font-size: 5rem;
`;

const Home = ({ className }) => {
    const { socket } = useSocket();

    const handleCreateRoom = () => {
        socket.emit("room:create");
        socket.once("room:create", ({ id }) => {
            route(`/room/${id}`);
        });
    };

    return (
        <div className={cn(HomeClass, className)}>
            <Gap vertical size={6} />
            <span className={FishClass}>🐠</span>
            <H1>scrumfi.sh</H1>
            <H4>Story Pointing With Fish</H4>
            <Gap vertical size={6} />
            <Button onClick={handleCreateRoom}>Create Room</Button>
        </div>
    );
};

export default Home;
