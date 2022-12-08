import { getCookie, hasCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import classes from "./ArticleComp.module.css"

export default function ArticleComp (props) {
    const router = useRouter()


    const [userCookieId, setUserCookieId] = useState('')
useEffect(()=>setUserCookieId(getCookie('userid')))

    return (
        <li className={classes.element} onClick={()=> router.push('/articlep/' + props.id)}>
            <div className={classes.container}>
                <span className={classes.title}>{props.title}</span><br/>
                <span className={classes.description}>{props.content}</span>
            </div>
        </li>
    )
}