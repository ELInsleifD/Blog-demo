import { Fragment, useEffect } from "react";
import ArticleListComp from "../components/ArticleListComp";
import MenuComp from "../components/MenuComp";
import { hasCookie, setCookie } from 'cookies-next'

export default function MainPage (props) {

if (!(hasCookie('userid'))) {
setCookie('userid','')
}
    return (
<div>
            <MenuComp />
            
            <ArticleListComp 
            ArticleList={props.articles}
             />
</div>
    )
}

export async function getStaticProps() {

    const res = await fetch("http://localhost:5000/articles")
    const articlesList = await res.json()

    return {
        props:{
            articles: articlesList.articles.map(element => ({
                id: element.ID,
                title : element.Title,
                content : element.Content,
                userIdRef : element.UserID
            }))
        },
        revalidate: 10
    }
}
