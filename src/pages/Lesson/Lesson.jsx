import {useLocation} from 'react-router-dom';

export default function Lesson() {
    const location = useLocation();
    return (
        <div className='container'>
            <div className='left-column'>
                <img data-image="image" src='' alt=''></img>
            </div>

            <div className='right-column'>
                <div className='lesson-description'>
                    {/* Titre de la leçon */}
                    <h1>Présentation concepts mathématiques</h1>
                    {/* Catégorie de la leçon */}
                    <span>Mathématiques</span>
                    {/* Description de la leçon */}
                    <p>Durant cette leçon, vous allez apprendre les concepts de bases des mathématiques modernes.</p>
                </div>
                <div className='lesson_location'>

                </div>
                <div className='lesson-price'>
                    {/* Prix de la leçon */}
                    <span>150,00€</span>
                    {/* Bouton pour ajouter s'inscrire à la leçon */}
                    <a href="#" class="cart-btn">S'inscrire</a>
                </div>
            </div>
        </div>
    )
}