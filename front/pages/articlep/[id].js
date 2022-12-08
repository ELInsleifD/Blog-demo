import ArticleInstance from "../../components/ArticleInstance"


export default function ArticlePage(props){

    return (
        <ArticleInstance 
                id={props.articleD.id}
                title={props.articleD.title}
                content={props.articleD.content}
                userIdRef={props.articleD.userIdRef}
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