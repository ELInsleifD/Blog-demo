import { Fragment, useRef } from "react"
import classes from "./ArticleUpdateComp.module.css"
import MenuComp from "./MenuComp"


export default function ArticleUpdateComp(props){

    const titleRef = useRef()
    const contentRef = useRef()

    function submitHandler(event){
        event.preventDefault()

        const enteredTitle = titleRef.current.value
        const enteredContent = contentRef.current.value

        const formData = {
            Title   :enteredTitle,
            Content :enteredContent,
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