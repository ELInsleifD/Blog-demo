import NewArticleComp from "../../../components/NewArticleComp"
import { useRouter } from "next/router";


export default function ArticleCreatePage() {
    const router = useRouter()

    async function submitHandler(enteredData) {
        const res = await fetch("http://localhost:5000/articles/create",{
            method:'POST',
            body: JSON.stringify(enteredData),
        })
        router.push("/")
    }

    return (
        <NewArticleComp handler={submitHandler} />
    )
}