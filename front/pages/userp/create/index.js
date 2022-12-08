import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import NewUserComp from "../../../components/NewUserComp";


export default function UserCreatePage(){

    const router = useRouter()

    async function submitHandler(enteredData) {
        const res = await fetch("http://localhost:5000/users/create",{
            method:'POST',
            body: JSON.stringify(enteredData),
        })
        router.push("/")
    }

    return (
        <NewUserComp handler={submitHandler} />
    )
}