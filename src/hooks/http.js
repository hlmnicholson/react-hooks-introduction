import { useState, useEffect } from 'react';

export const useHttp = (targetUrl, dependencies) => {
    // const proxyUrl = 'https://agile-retreat-53532.herokuapp.com/',
    // targetUrl = 'https://swapi.dev/api/people';

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        console.log('sending Http request')
        fetch(targetUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch.');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setFetchedData(data);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [dependencies]);
    
    return [isLoading, fetchedData];
};

