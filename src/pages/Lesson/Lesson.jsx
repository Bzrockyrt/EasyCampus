import {useLocation} from 'react-router-dom';

export default function Lesson() {
    const location = useLocation();
    return (
        <div className='container'>
            <div className='container-header'>
                {/* Mettre ici le titre de la leçon avec la note et le nom de l'étudiant qui l'a propose */}
                <h1></h1>
            </div>
            <div className='container-body'>

            </div>
            <div className='container-footer'>

            </div>
        </div>
    )
}