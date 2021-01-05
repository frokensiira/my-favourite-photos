import { useParams } from 'react-router-dom';

const Album = () => {
    const { albumId } = useParams();
    return (  
        <div>
            Album component
        </div>
    );
}
 
export default Album;