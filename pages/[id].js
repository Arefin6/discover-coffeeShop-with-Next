import React from 'react';
import { useRouter } from 'next/router';

const Dynamic = () => {
    const route =  useRouter()
    return (
        <div>
            Dynamic {route.query.id}
        </div>
    );
};

export default Dynamic;