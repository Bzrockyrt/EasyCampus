import throwSuccess from '../../utils/alerts'

export default function FilterItem(props){
    const { itemData } = props;

    function clickHandler(){
        let doc = document.getElementById(`filterButton${itemData.title}`);
        if(doc.classList.contains("filterItemSelected")){
            doc.classList.remove("filterItemSelected");
            throwSuccess('Vous avez cliquez');
        }else{
            doc.classList.add("filterItemSelected");
        }
    }

    return(
        <div id={`filterButton${itemData.title}`} className="filterItemContainer" onClick={clickHandler}>
            <img src={itemData.imageURL} className='filterItemImage'/>
            <h4 className="filterItemTitle">{itemData.title}</h4>
        </div>
    );
}