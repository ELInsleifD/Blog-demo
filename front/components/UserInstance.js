import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import MenuComp from "./MenuComp";
import classes from "./UserInstance.module.css"

export default function UserInstance(props){
    const router = useRouter()

    const [userCookieId, setUserCookieId] = useState('')
    useEffect(()=>setUserCookieId(getCookie('userid')))

    function updateHandler(Id){
        router.push({
            pathname: `/userp/update/${Id}`,
          })
    }
    async function deleteHandler(delId){
        const res = await fetch(`http://localhost:5000/users/${delId}`,{
            method:'DELETE',
        })
        
        router.push("/")
    }

    return (
        <Fragment>
            <MenuComp />
            <div className={classes.container}>
                <div className={classes.info}>
                    <span>{props.useremail}</span>
                    <span>{props.username}</span>
                </div>
                <div className={classes.buttons}>
                {userCookieId==props.id && 
            <button className={classes.linkBtn} onClick={() => updateHandler(props.id)}>update</button>}
            {userCookieId==props.id &&  
            <button className={classes.linkBtn} onClick={() => deleteHandler(props.id)}>delete</button>}
                </div>
            
            </div>
            
        </Fragment>
    )
}