//import "./CoinInfo.css"

function ArticleInfo({date, title}){
    return(
        <div className = "main-list" key = {title}>
            <h6 className="date">{date}</h6>
            <h3 className = "title">{title}</h3>
        </div>
    )
}

export default ArticleInfo