import { useRouter } from "next/router"
import ArticleUpdateComp from "../../../components/ArticleUpdateComp"


export default function UpdatePage (props) {
    const router = useRouter()

    async function submitHandler(enteredData){
        const res = await fetch(`http://localhost:5000/articles/${props.articleD.id}`,{
            method:'PUT',
            body: JSON.stringify(enteredData),
        })
        router.push("/")
    }

    return (
        <ArticleUpdateComp
        handler={submitHandler}
        />
    )
}

export async function getStaticPaths(){

    const res = await fetch(`http://localhost:5000/articles`)
    const items = await res.json()

    const paths = items.articles.map (elem => {
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

    const res = await fetch(`http://localhost:5000/articles/${id}`)
    const item = await res.json()
    const element = await item.article

    return {
        props:{
            articleD: {
                id: element.ID,
                title : element.Title,
                content : element.Content,
                userIdRef : element.UserID
            }
        }
    }
}