import React from 'react';
import { useParams } from 'react-router-dom';

const Photo: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Photo {id}</h1>
            <img
                src={`https://via.placeholder.com/600x400?text=Photo+${id}`}
                alt={`Photo ${id}`}
            />
        </div>
    );
};

export default Photo;
