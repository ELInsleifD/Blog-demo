import classes from "./MenuComp.module.css"
import Link from "next/link"
import { Fragment, useEffect, useRef, useState } from "react"
import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/router"
import icon from "../public/iconsuser.png"
import Image from "next/image"

export default function MenuComp () {
const router = useRouter()

    const [logbox, setLogbox] = useState(false)

    function toggle(){
        setLogbox(prev => !prev)
    }

    const emailRef = useRef()
    const passRef = useRef()
    async function loggingSubmit(event){
        event.preventDefault()

        const enteredEmail = emailRef.current.value
        const enteredPass = passRef.current.value

        const formData = {
            email : enteredEmail,
            password : enteredPass,
        }

        const res = await fetch('http://localhost:5000/users/login',{
            method:'POST',
            body: JSON.stringify(formData)
        })
        const arbitrary = await res.json()
        console.log(arbitrary);
        setCookie('userid',arbitrary.userid)
        setUserCookieId(prev => arbitrary.userid)
        toggle()
        router.push('/')
    }

    const [userCookieId, setUserCookieId] = useState('')
useEffect(()=>setUserCookieId(getCookie('userid')))

 function logOutHandler(){
    setCookie('userid','')
    setUserCookieId('')
    router.push('/')
 }

    return  (
        <Fragment>
        <div className={classes.container}>
        <span className={classes.logo}><Link href="/">Blog app</Link></span>
        
        { userCookieId!='' &&
        <Link href="/articlep/create" className={classes.linkBtn}>Add new article</Link>
        }
        <div>
        {userCookieId!='' && <div className={classes.logout}><Image src={icon} onClick={()=>router.push("/userp/"+userCookieId)} className={classes.imege} /><button onClick={logOutHandler} className={classes.linkBtn}>Log out</button></div>}
        <div>
{userCookieId=='' && <div className={classes.popForm}>
            <button onClick={toggle} className={classes.linkBtn}>Log in</button>
            <Link href='/userp/create' className={classes.linkBtn}>Sign up</Link>
        </div> }

            
        </div>
        </div>
        </div>
        <div className={classes.dropContainer}>
{logbox &&
            <form className={classes.loginBox} onSubmit={loggingSubmit}>
                <input type="text" ref={emailRef} required placeholder="User email" className={classes.bar}/><br />
                <input type="text" ref={passRef} required placeholder="Password" className={classes.bar}/><br />
                <button className={classes.linkBtn}>PRESS</button>
            </form>
            }
        </div>
        </Fragment>
    )
}