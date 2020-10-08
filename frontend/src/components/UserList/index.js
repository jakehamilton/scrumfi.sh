import { h, Fragment } from "preact";
import { useTheme, Block, Text, Gap } from "@jakehamilton/ui";
import { css } from "goober";

import useSocket from "../../hooks/useSocket";
import CheckIcon from "../CheckIcon";

const UserClass = css`
    display: flex;
    align-items: center;
`;

const UserCheckClass = ({ pad }) => css`
    padding-right: ${pad(2)}px;
`;

const User = ({ name, guess }) => {
    const theme = useTheme();

    return (
        <div className={UserClass}>
            <Text
                color={guess ? "primary" : "text.light"}
                className={UserCheckClass(theme)}
            >
                <CheckIcon />
            </Text>
            <Text>{name}</Text>
        </div>
    );
};

const UserListClass = (theme) => {
    return css`
        width: 100%;
        max-width: 30rem;
        max-height: 25rem;
        background: ${theme.background.light};
        border-radius: 6px;
        overflow: auto;

        &:after {
            content: "";
            display: block;
            height: 24px;
            width: 100%;
        }
    `;
};

const DividerClass = (theme) => {
    return css`
        height: 2px;
        background: ${theme.background.main};
    `;
};

const UserList = ({ room }) => {
    const { socket, user } = useSocket();
    const { theme } = useTheme();

    const owner = room.users.find((user) => user.id === room.owner);
    const users = room.users.filter((user) => user !== owner);

    return (
        <Block
            elevation={2}
            padding={3}
            style={{ paddingBottom: 0 }}
            className={UserListClass(theme)}
        >
            <User name={owner.name} guess={room.state.guesses[owner.id]} />
            {users.map((user, i) => {
                return (
                    <>
                        <Gap vertical size={1} />
                        <User
                            key={user.id}
                            name={user.name}
                            guess={room.state.guesses[user.id]}
                        />
                    </>
                );
            })}
        </Block>
    );
};

export default UserList;
