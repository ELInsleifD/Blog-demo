import UserInstance from "../../components/UserInstance"


export default function UserPage(props){
    return (
        <UserInstance
        id={props.uzer.id}
        username={props.uzer.username}
        useremail={props.uzer.useremail}
        userpass={props.uzer.userpassword}
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
                id: element.ID,
                username: element.Name,
                userpassword: element.Password,
                useremail: element.Email
            }
        }
    }
}