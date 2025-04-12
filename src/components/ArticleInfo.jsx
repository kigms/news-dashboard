//import "./CoinInfo.css"

function ArticleInfo({date, title, author, url, desc}){
    let ellipse = "[...]"
    
    let formattedDate = date.slice(0, 10)
    return(
        <>
            <div className = "main-list" key = {title}>
                <h4 className="date">{formattedDate}</h4>
                <h3 className="title">{title}</h3>
                <p className="author">{author}</p>
                <a href="{url}"><i>{url}</i></a>
                <p className = "desc">{desc} {ellipse}</p>
            </div>
        </>
    )
}

export default ArticleInfo