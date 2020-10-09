import { h } from "preact";
import { useTheme, Text, H1, Gap } from "@jakehamilton/ui";
import { css } from "goober";
import Card from "../Card";

const ResultsClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const CardsClass = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const CardClass = ({ pad }) => {
    return css`
        margin-left: ${pad(1)}px;
        margin-right: ${pad(1)}px;
        margin-bottom: ${pad(2)}px;
    `;
};

const CardSubtitleClass = css`
    font-size: 1rem;
`;

const Results = ({ room }) => {
    const theme = useTheme();

    const ids = Object.keys(room.state.guesses);

    if (ids.length === 0) {
        return null;
    }

    return (
        <div className={ResultsClass}>
            <H1>Results</H1>
            <Gap vertical size={4} />
            <div className={CardsClass}>
                {ids.map((id) => {
                    const user = room.users.find((user) => user.id === id);

                    return (
                        <Card
                            key={id}
                            value={room.state.guesses[id].value}
                            subtitle={
                                user ? (
                                    <Text
                                        color="text.light"
                                        className={CardSubtitleClass}
                                    >
                                        {user.name}
                                    </Text>
                                ) : undefined
                            }
                            className={CardClass(theme)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
