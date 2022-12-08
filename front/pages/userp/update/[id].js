import { useRouter } from "next/router";
import UserUpdateComp from "../../../components/UserUpdateComp";


export default function UserUpdatePage(props){

    const router = useRouter()

    async function submitHandler(enteredData){
        const res = await fetch(`http://localhost:5000/users/${props.uzer.id}`,{
            method:'PUT',
            body: JSON.stringify(enteredData),
        })
        router.push("/")
    }

    return (
        <UserUpdateComp
        handler={submitHandler}
        />
    )
}


export async function getStaticPaths(){

    const res = await fetch(`http://localhost:5000/users`)
    const items = await res.json()

    const paths = items.users.map (elem => {
        return {
            params: {
                id: elem.ID.toString()
            }
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const id = context.params.id

    const res = await fetch(`http://localhost:5000/users/${id}`)
    const item = await res.json()
    const element = await item.user

    return {
        props:{
            uzer: {
                id: element.ID.toString(),
                username: element.Name,
                userpassword: element.Password,
                useremail: element.Email
            }
        }
    }
}