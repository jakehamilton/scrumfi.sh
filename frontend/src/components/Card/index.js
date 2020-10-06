import { h } from "preact";
import cn from "classnames";
import { css } from "goober";
import { Block, Text, useTheme, H1, H4, Button } from "@jakehamilton/ui";

import { noop } from "../../util/misc";

const CardClass = ({
    background,
    justify,
    shadow,
    hoverShadow,
    activeShadow,
    primary,
    active,
    size,
}) => {
    const primaryShadow = active ? `0 0 10px ${primary}` : "0 0 0 transparent";

    return css`
        display: flex;
        align-items: center;
        justify-content: ${justify};
        flex-direction: column;
        cursor: pointer;
        width: 8rem;
        height: 10rem;
        border-radius: 0.5rem;
        background: ${background};
        box-shadow: ${primaryShadow}, ${shadow};
        transform: translateY(0);
        transition: box-shadow 0.15s linear, transform 0.15s linear;
        user-select: none;

        &:hover {
            box-shadow: ${primaryShadow}, ${hoverShadow};
            transform: translateY(-2px);
        }

        &:active {
            box-shadow: ${primaryShadow}, ${activeShadow};
            transform: translateY(0);
        }
    `;
};

const CardValueClass = css``;

const CardSubtitleClass = css``;

const Card = ({
    value,
    subtitle,
    onClick = noop,
    active = false,
    className,
}) => {
    const { theme, shadow } = useTheme();

    const handleClick = () => {
        onClick({ value });
    };

    return (
        <Block
            className={cn(
                CardClass({
                    background: theme.background.light,
                    activeBackground: theme.background.main,
                    justify: subtitle ? "space-around" : "center",
                    shadow: shadow(3),
                    hoverShadow: shadow(4),
                    activeShadow: shadow(2),
                    primary: theme.primary.main,
                    active,
                }),
                className
            )}
            onClick={handleClick}
            padding={2}
        >
            <H1 as="span">
                <Text className={CardValueClass}>{value}</Text>
            </H1>
            {subtitle ? (
                <H4 as="span">
                    <Text className={CardSubtitleClass}>{subtitle}</Text>
                </H4>
            ) : null}
        </Block>
    );
};

export default Card;
