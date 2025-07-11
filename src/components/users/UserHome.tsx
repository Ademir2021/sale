export function UserHome() {

    function isHome() {
        const isHome = localStorage.getItem('hl')
        if (isHome)
            return isHome
    }

    return (
        <>
            {isHome() === 'true' ? <a href='/'><b>Home</b></a> :
                <a href="/store">Home</a>}
        </>
    )
}