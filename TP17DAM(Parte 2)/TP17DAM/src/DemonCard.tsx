import './DemonCard.css'

//Para mostrar un usuario
interface DemonCardProp {
    name: string;
    position: number;
    thumbnail: string;
    video: string;
}

export function DemonCard(props: DemonCardProp){
    return(
    <div className="demonCard">
        <h3>{props.name}</h3>
        <p>{props.position}</p>
        <img src={props.thumbnail} alt={props.name}/>
        <a href={props.video} target='_blank'>{props.video}</a>
    </div>
    );
}