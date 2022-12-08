import classes from "./NewUserComp.module.css"

import { Fragment, useRef } from "react"
import MenuComp from "./MenuComp"

export default function NewUserComp(props){

    const emailRef = useRef()
    const nameRef = useRef()
    const passRef = useRef()

    function submitHandler(event){
        event.preventDefault()

        const enteredEmail = emailRef.current.value
        const enteredName = nameRef.current.value
        const enteredPass = passRef.current.value

        const formData = {
            name : enteredName,
            password : enteredPass,
            email : enteredEmail
        }

        props.handler(formData)
    }

    return (
        <Fragment>
        <MenuComp />
        <div className={classes.container}>
            <form onSubmit={submitHandler} className={classes.formC}>
                <div className={classes.inputsC}>
                    <input type="text" required ref={emailRef} placeholder="Enter your Email" />
                    <input type="text" required ref={nameRef} placeholder="Enter your name" />
                    <input type="text" required ref={passRef} placeholder="Enter your password" />
                </div>
                <button className={classes.submitC}>submit</button>
            </form>
        </div>
        </Fragment>
    )
}