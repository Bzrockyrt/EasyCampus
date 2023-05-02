import { Card as CardChakra, CardHeader, CardBody, CardFooter, Heading, Stack, Button, Grid, GridItem } from '@chakra-ui/react'


export default function Card(props){
    const { lessonData } = props;

    function handleClick(){
        alert('Test du click sur une card');
    }
    
    return(
        <div className='allCard'>
        <div className='cardContainer' onClick={handleClick}>
            <div>
                <img src={lessonData.imageURL} className='cardImage'/>
            </div>
            <div className='cardWrapper'>
                <div className='cardTitle'>
                    { lessonData.title }
                </div>
                <div className='cardNotation'>
                    <img src='star.png' className='cardStarNotation'/>
                    { lessonData.notation }
                </div>
                <div className='cardUsername'>
                    { lessonData.user.firstname }
                </div>
                <div className='cardDescription'>
                    { lessonData.description }
                </div>
                <div className='cardPrice'>
                    { lessonData.price }
                </div>
                <div className='cardLike'>
                    <button className='cardButtonLike'>
                        <lord-icon
                            src="https://cdn.lordicon.com/pnhskdva.json"
                            trigger="hover"
                            colors="primary:#c71f16">
                        </lord-icon>
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}