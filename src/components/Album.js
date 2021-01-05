import { useParams } from 'react-router-dom';

const Album = () => {
    const { albumId } = useParams();
    
    
    return (  
        <div className="text-center">
            <h1>Album component </h1>
            <p>with id: {albumId}</p>
        </div>
    );
}
 
export default Album;