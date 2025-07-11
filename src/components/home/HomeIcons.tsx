import React from 'react';
import Icon from 'phosphor-react';

interface PropsHomeIcons {
    title: string
    icon: Icon.IconProps
}

export function HomeIcons(props: PropsHomeIcons) {
    return (
        <> 
            {props.icon}
        </>
    )
}