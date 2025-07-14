import './css/styles.css'
type Props = {
    list: React.ReactNode
    update?: React.ReactNode
}
const ListComponent: React.FC<Props> = ({
    list,
    update
}: Props) => {
    return <>
        <div className='list-card'>
            <>{list}</>
            {update && <div className="list-update">{update}</div>}
        </div>
    </>
}
export default ListComponent