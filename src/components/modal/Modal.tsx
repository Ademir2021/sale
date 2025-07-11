
import "./Modal.css";

type PropsModal = {
    className: JSX.Element | any;
    modalRef:React.LegacyRef<HTMLDivElement> | undefined;
    close:React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Modal(props: PropsModal) {
    const { className, modalRef, close } = props;
    return (
        <div ref={modalRef} className={`${className} modal`}>
            <p>Meu modal!</p>
            <button className="" onClick={close}>Fechar</button>
        </div>
    )
}

