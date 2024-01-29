import axios from "axios";


export const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    withCredentials: true,
})

export function safeApiCall(requestPromise, setIsLoading, setError, setData) {
    setIsLoading(true);
    requestPromise.then(data => {
        console.log('then:');
        console.log(data);
        setIsLoading(false);
        setData(data);
    }).catch(error => {
        console.log('catch: ');
        console.log(error);
        setIsLoading(false);
        setError(error);
    })
}
