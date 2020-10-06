import { h } from "preact";
import { Gap, H1, H4, Text, Button } from "@jakehamilton/ui";
import { css } from "goober";
import useSocket from "../../hooks/useSocket";

const WaitingClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Waiting = ({ room }) => {
    const { socket, user } = useSocket();

    const handleStart = () => {
        socket.emit("room:start", { id: room.id });
    };

    if (room.owner === user.id) {
        return (
            <div className={WaitingClass}>
                <Gap vertical size={6} />
                <H1>Waiting To Start</H1>
                <H4 color="text.light">{user.name}</H4>
                <Gap vertical size={6} />
                <Button onClick={handleStart}>Start New Round</Button>
            </div>
        );
    } else {
        return (
            <div className={WaitingClass}>
                <Gap vertical size={6} />
                <H1>Waiting For Owner</H1>
                <H4 color="text.light">{room.id}</H4>
            </div>
        );
    }
};

export default Waiting;
