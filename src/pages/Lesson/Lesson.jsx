import {useLocation} from 'react-router-dom';

export default function Lesson() {
    const location = useLocation();
    return (
        <div>{location.state.name}</div>
    )
}