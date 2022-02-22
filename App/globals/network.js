import axios from 'axios';

export const ajax = async ({method = 'GET', url, headers = {}, data}) => {

    try {
        const response = await axios({
            method,
            url,
            headers: {
                Accept: "application/json",
                ...headers,
            },
            [method === 'GET' ? 'params' : 'data']: data
        });

        return (response || {}).data
    } catch (e) {
        console.error(e);
        throw e;
    }
};

