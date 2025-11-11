import * as Icon from 'phosphor-react';

type Props = {
    link: string
}

export const CloseX: React.FC<Props> = ({ link }: Props) => {
    return <>
        <a href={link}>{<Icon.X size={18} />}</a>
    </>
}