type Props = {
    waiting: string;
}
export function Waiting(props: Props) {
    return (
        <div
        className="text-center p-3"
        >{props.waiting}</div>
    )
}