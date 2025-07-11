type Props = {
    waiting: string;
}
export function Waiting(props: Props) {
    return (
        <div className="text-center p-1">{props.waiting}</div>
    )
}