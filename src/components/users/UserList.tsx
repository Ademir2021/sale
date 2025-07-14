import '../../index'
import ListComponent from '../listComponent/ListComponent';


export type PropsUsers = {
id: number;
created_at:Date | any;
updated_at:Date | any;
name: string;
username: string;
password?: string;
update?: Date | any;
};
export const ListUSers = (props: PropsUsers) => {
return <>
<ListComponent
list={<>
<div><b>ID</b> {props.id}</div>
<div><b>Criado</b> {props.created_at}</div>
<div><b>Alterado</b> {props.updated_at}</div>
<div><b>Nome</b> {props.name}</div>
<div><b>Email</b> {props.username}</div>
</>}
update={null}
/>
</>
}
