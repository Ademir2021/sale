import './css/styles.css'

type Props = {
    id:number;
    item: String
    descric: string
    content:String
    img:string
    onClick:any
}

export function HomeCards(props: Props) {
    return (
            <div id='container-cards'>
                <div id='main-cards'>
                        <img id='img_card' src={props.img} />
                        <b>{props.item}</b>
                        <p>{props.descric}</p>
                        <p>{props.content}</p>
                        <button
                        className="btn btn-primary mb-3"
                        onClick={props.onClick}
                        >Solicitar contato</button>
                </div>
            </div>
    )
}