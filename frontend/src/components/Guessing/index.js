import { h } from "preact";
import { Gap, H1, H4, Text, useTheme, Button } from "@jakehamilton/ui";
import { css } from "goober";
import useSocket from "../../hooks/useSocket";
import Card from "../Card";
import UserList from "../UserList";

const GuessingClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const CardsClass = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const CardClass = ({ margin }) => {
    return css`
        margin-right: ${margin}px;
        margin-bottom: ${margin}px;
    `;
};

const values = [1, 2, 3, 5, 8, 13];

const Guessing = ({ room }) => {
    const { socket, user } = useSocket();
    const { pad } = useTheme();

    const guess = room.state.guesses[user.id];

    const handleGuess = (value) => {
        socket.emit("room:guess", { id: room.id, value });
    };

    const handleEnd = () => {
        socket.emit("room:end", { id: room.id });
    };

    return (
        <div className={GuessingClass}>
            <Gap vertical size={6} />
            <H1>Estimation</H1>
            <H4 color="text.light">{user.name}</H4>
            <Gap vertical size={6} />
            <div className={CardsClass}>
                {values.map((value) => {
                    return (
                        <Card
                            key={value}
                            value={value}
                            onClick={handleGuess}
                            className={CardClass({
                                margin: pad(2),
                            })}
                            active={guess && guess.value === value}
                        />
                    );
                })}
            </div>
            <Gap vertical size={6} />
            <UserList room={room} />
            <Gap vertical size={6} />
            {room.owner === user.id ? (
                <Button onClick={handleEnd}>End Round</Button>
            ) : null}
        </div>
    );
};

export default Guessing;
