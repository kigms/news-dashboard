import { useState, useEffect } from 'react'
import ArticleInfo from "./components/ArticleInfo"
import SummaryStats from "./components/SummaryStats"
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  // Initializing useState hook to "null" since it's using objects
  const [articleList, setArticleList] = useState([])
  const [initialNumArticles, setInitialNumArticles] = useState("")
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth()).padStart(2, '0') // no need to increment by 1 to get current month
  let yyyy = String(today.getFullYear())
  let dash = "-"
  let thisDayLastMonthDate = yyyy + dash + mm + dash + dd;
  // Query NewsAPI to get a list of articles.

  // Use React Hook useEffect() to call the API.
  
  /*This will be setup in such a way where the 
    API call is only used when the page renders
    and allow the browser to display the screen
    even if all the information isn't quite ready
    (which could make for a better user experience.)*/
  
  /*await/async keywords make it so that our page
    won't try to load the data before we have
    retreived the content from the API call.*/

  /*useEffect() hook would use the empty dependency 
    list "[]" to denote that there aren't reactive 
    values, and thus the API won't be re-called on 
    a re-render.*/
   useEffect(() => {
    const fetchAllArticleData = async () => {
      /*await makes it so that fetch, a promise-
        returning function behaves as though it
        is synchronous by suspending execution
        until the returned promise is rejected
        or fulfilled.*/
      let articleData = await fetch(
      //source*, date are defined from user input
        `https://newsapi.org/v2/everything?domains=apnews.com&from=${thisDayLastMonthDate}&apiKey=${API_KEY}`
      )
      let articleDataJson = await articleData.json()
      /*Set articleList to json data by passing
        it to setArticleList() and use it in
        useState().*/
      setArticleList(articleDataJson.articles)
      setInitialNumArticles(articleDataJson.totalResults)
    }
    /*Catch an error returned by the async function
      in case the initiated Promise object isn't
      fulfilled/is rejected.*/
    fetchAllArticleData().catch(console.error)
   }, []) 
  
   const searchItems = searchValue => {
    setSearchInput(searchValue)
    if(searchValue !== ""){
      const filteredData = articleList.filter((article) => {
        const searchedAttributes = [article.title].map(attr => attr.toLowerCase())
        return searchedAttributes.some(attr => attr.includes(searchValue))
      })
      setFilteredResults(filteredData)
    } else{
      setFilteredResults(articleList)
    }
   }

   // Render the the API call in our page.
  return (
    <div className="whole-page">
      <div className="side-bar">
        <h1>Old News</h1>
        <nav></nav>
      </div>
      {<SummaryStats
        //Hardcoding "United States for now."
              source="Source: The Associated Press"
        // Year and date will be received from user input
              initialDate={thisDayLastMonthDate}
        // Num of articles will be received from query results
        // with a default that should be from initial query
              initialNumArticles={initialNumArticles}
      />
      }
      <div className="dashboard-body">
        <input type="text"
               placeholder="Search..."
               onChange={(inputString)=>searchItems(inputString.target.value)} />
        <ul>
          {
          searchInput.length > 0 ?
            filteredResults?.map(article => (
              <ArticleInfo
                key={article.title}
                date={article.publishedAt}
                title={article.title}
                author={article.author}
                desc={article.description}
                url={article.url}
              />
            ))
            :
          /*Check if API call has completed/is not
              still waiting on results to fill up
              the list of articles.
              Once it is known that the list isn't
              empty, we can display it.
              (Conditional Rendering)*/

              /*Check if the list is not null,
                then iterate through the list, render-
                ing a component for each article and
                passing in props for key, title, author,
                and body.*/
            articleList?.map(article => (
              <ArticleInfo
                key={article.title}
                date={article.publishedAt}
                title={article.title}
                author={article.author}
                desc={article.description}
                url={article.url}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App
