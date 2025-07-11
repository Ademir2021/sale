import '../global-module.css'

type Props = {
  int: string;
  end: string;
  setInt: HTMLInputElement | any;
  setEnd: HTMLInputElement | any;
  searchHandle: HTMLButtonElement | any;
}

export function InputSearch(props: Props) {
  return (
    <div className='container-global'>
      <div className='main-global'>
        <form className='main-global-form'>
          <input
            type="date" value={props.int}
            onChange={(e) => props.setInt(e.target.value)} />
          <input
            type="date" value={props.end}
            onChange={(e) => props.setEnd(e.target.value)} />
          <button onClick={props.searchHandle}>Buscar</button>
        </form>
      </div>
    </div>
  )
}