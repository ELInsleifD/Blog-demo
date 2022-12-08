import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import ArticleComp from "./ArticleComp"
import classes from "./ArticleListComp.module.css"

export default function ArticleListComp (props) {
const [toggle,setToggle] = useState(true)
    const [userCookieId, setUserCookieId] = useState('')
    useEffect(()=>setUserCookieId(getCookie('userid')))

    return (
        <div className={classes.container}>
            <div className={classes.slider}>
                <span onClick={()=>setToggle(prev => true)}>all articles</span>
                {userCookieId!='' && <span onClick={()=>setToggle(prev => false)}>my articles</span>}
                </div>
            {toggle && <ul>
                {props.ArticleList.map(element => (
                    < ArticleComp
                    id={element.id}
                    title ={element.title}
                    content ={element.content}
                    userIdRef ={element.userIdRef}
                    />
                ))}
                
            </ul>}
            {
                !toggle && <ul>
                {props.ArticleList.map(element => {
                    if (getCookie("userid") == element.userIdRef) {
                return (
                    < ArticleComp
                    id={element.id}
                    title ={element.title}
                    content ={element.content}
                    userIdRef ={element.userIdRef}
                    />
                )}}
                )}
                
            </ul>
            }
        </div>
    )
}
