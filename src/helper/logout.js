import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";


async function logout(dispatch) {
    try {
        await axios.get(`${server}/auth/google/signout`)
        await axios.get(`${server}/auth/github/signout`)
        await axios.get(`${server}/api/v1/logout`)
        toast.success("sucessfully logout")
        

    } catch (error) {
        toast.error(error)
    }
}

export default logout