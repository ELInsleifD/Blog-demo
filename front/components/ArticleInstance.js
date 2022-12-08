import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import classes from './ArticleInstance.module.css'
import MenuComp from './MenuComp'

export default function ArticleInstance(props){

    const router = useRouter()

    function updateHandler(Id){
        router.push({
            pathname: `/articlep/update/${Id}`,
          })
    }
    async function deleteHandler(delId){
        const res = await fetch(`http://localhost:5000/articles/${delId}`,{
            method:'DELETE',
        })
        
        router.push("/")
    }
    const [userCookieId, setUserCookieId] = useState('')
    useEffect(()=>setUserCookieId(getCookie('userid')))

    return (
        <Fragment>
        <MenuComp />
        <div className={classes.container}>
            <div className={classes.title}><span>{props.title}</span><div className={classes.buttons}>
            {userCookieId==props.userIdRef && 
            <button className={classes.linkBtn} onClick={() => updateHandler(props.id)}>update</button>}
            {userCookieId==props.userIdRef &&  
            <button className={classes.linkBtn} onClick={() => deleteHandler(props.id)}>delete</button>}
                </div></div>
            <div className={classes.content}>
                <span>{props.content}</span>
            </div>
            
        </div>
        
</Fragment>
    )
}