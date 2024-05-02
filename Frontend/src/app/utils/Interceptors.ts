import axios from "axios"

class Interceptors {
    public listen(): void {

        // create interceptor for request:
        axios.interceptors.request.use((request) => {
            
            // add token to Authorization header:
            request.headers.Authorization = "bearer " + sessionStorage.getItem("token")
            return request
        })
    }
}
export const interceptors = new Interceptors()