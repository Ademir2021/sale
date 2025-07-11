import './index.css'

type Props = {
    onClickHandle: React.MouseEventHandler<HTMLButtonElement>;
    text: string
}

export function ButtonOnClick(props: Props) {
    return (
        <div className="btn-div">
            <button className="btn-button"
                onClick={props.onClickHandle}>{props.text}
            </button>
        </div>
    )
}