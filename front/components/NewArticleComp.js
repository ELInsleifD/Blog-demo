import { getCookie } from "cookies-next"
import { Fragment, useRef } from "react"
import MenuComp from "./MenuComp"
import classes from "./NewArticleComp.module.css"

export default function NewArticleComp(props){

    const titleRef = useRef()
    const contentRef = useRef()
    const cookieId = parseInt(getCookie('userid'))

    function submitHandler(event){
        event.preventDefault()

        const enteredTitle = titleRef.current.value
        const enteredContent = contentRef.current.value

        const formData = {
            Title   :enteredTitle,
            Content :enteredContent,
            UserID  : cookieId
        }

        props.handler(formData)
    }

    return (
        <Fragment>
            <MenuComp />
        <div className={classes.container}>
            <form onSubmit={submitHandler} className={classes.formC}>
                <div className={classes.formCinput}>
                    <input type="text" required ref={titleRef} placeholder="Enter your title" className={classes.titleC} />
                        <textarea required ref={contentRef} className={classes.textareaC}></textarea>
                </div>
                <button className={classes.submitC}>submit</button>
            </form>
        </div>
        </Fragment>
    )
}