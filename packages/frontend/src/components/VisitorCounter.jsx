import React, { useEffect, useRef, memo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VISIT_COUNT, INCREMENT_VISIT_COUNT } from '../queries';

const VisitorCounter = memo(() => {
    const { data, loading, error } = useQuery(GET_VISIT_COUNT);
    const [incrementCount] = useMutation(INCREMENT_VISIT_COUNT, {
        fetchPolicy: 'no-cache'
    });
    const hasIncremented = useRef(false);

    useEffect(() => {
        if (!hasIncremented.current) {
            console.log('VisitorCounter mounted and incrementing');
            incrementCount();
            hasIncremented.current = true; // Ensure this runs only once
        }
    }, [incrementCount]); // Safely include incrementCount as it comes from a stable hook

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading visits!</p>;

    return (
        <div>
            <h3>{data?.getVisitCount}</h3>
        </div>
    );
});

export default VisitorCounter;
