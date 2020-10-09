import { h } from "preact";
import cn from "classnames";
import { css } from "goober";
import { Block, Text, useTheme, H1, H4, Button } from "@jakehamilton/ui";

import { noop } from "../../util/misc";

const CardClass = ({ theme, shadow, active, subtitle }) => {
    const primaryShadow = active
        ? `0 0 10px ${theme.primary.main}`
        : "0 0 0 transparent";

    return css`
        display: flex;
        align-items: center;
        justify-content: ${subtitle ? "space-around" : "center"};
        flex-direction: column;
        cursor: pointer;
        width: 8rem;
        height: 10rem;
        border-radius: 0.5rem;
        background: ${theme.background.light};
        box-shadow: ${primaryShadow}, ${shadow(3)};
        transform: translateY(0);
        transition: box-shadow 0.15s linear, transform 0.15s linear;
        user-select: none;

        &:hover {
            box-shadow: ${primaryShadow}, ${shadow(4)};
            transform: translateY(-2px);
        }

        &:active {
            box-shadow: ${primaryShadow}, ${shadow(2)};
            transform: translateY(0);
        }
    `;
};

const Card = ({
    value,
    subtitle,
    onClick = noop,
    active = false,
    className,
}) => {
    const theme = useTheme();

    const handleClick = () => {
        onClick({ value });
    };

    return (
        <Block
            className={cn(
                CardClass({
                    ...theme,
                    subtitle,
                    active,
                }),
                className
            )}
            onClick={handleClick}
            padding={2}
        >
            <H1 as="span">
                <Text>{value}</Text>
            </H1>
            {subtitle ? (
                <H4 as="span">
                    <Text>{subtitle}</Text>
                </H4>
            ) : null}
        </Block>
    );
};

export default Card;
