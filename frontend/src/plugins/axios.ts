
import axios from 'axios'



export default axios.create({
    baseURL: "https://api.bridzhavirov.cz",
    headers: {
        "Accept": "application/json"
    },
     withCredentials: true
})
