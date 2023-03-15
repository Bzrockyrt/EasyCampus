import {Outlet} from 'react-router-dom'
import SignIn from './SignIn'

export default function root() {
    return(
    <div>
        <div>The header</div>
        <Outlet />
        <div>The footer</div>
    </div>
    )
}