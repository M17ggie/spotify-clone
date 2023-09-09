import axios from "axios";
import { BASE_URL } from "./constants";

const baseApiInstance = axios.create({
    baseURL: BASE_URL
})

export default baseApiInstance