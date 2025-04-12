import { useState, useEffect } from "react"
//import "./SummaryStats.css"

// Get the initial value from App, then override it with this
// component state
// Or get it from App

function SummaryStats({source, initialDate, initialNumArticles}){
    
    // initialNumArticles is derived from first fetch
    const [numArticles, setNumArticles] = useState("")
       
    // initialDate is derived from user input in App
    const [date, setDate] = useState(initialDate)

    useEffect(() => {
        if(initialNumArticles){
            setNumArticles(initialNumArticles)
        }
    }, [initialNumArticles])

    return(
        <>
            <div className="summary-statistics">
                <div className="source">{source}</div>
                <div className="date">From {date}</div>
                <div className="number-of-articles">{numArticles} articles returned</div>
            </div>
        </>
    )
}

export default SummaryStats