import {Outlet} from 'react-router-dom'

export default function root() {
    return(
    <div>
        <div>The header</div>
        <Outlet />
        <div>The footer</div>
    </div>
    )
}