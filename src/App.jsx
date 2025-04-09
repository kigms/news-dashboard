import { useState, useEffect } from 'react'
import ArticleInfo from "./components/ArticleInfo"
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  // Initializing useState hook to "null" since it's using objects
  const [articleList, setArticleList] = useState(null)

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
      console.log("Fetching articles...")
      /*await makes it so that fetch, a promise-
        returning function behaves as though it
        is synchronous by suspending execution
        until the returned promise is rejected
        or fulfilled.*/
      let articleData = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      )
      console.log("Between two awaits")
      let articleDataJson = await articleData.json()
      /*Set articleList to json data by passing
        it to setArticleList() and use it in
        useState().*/
        console.log("Fetched article data")
        console.log(articleDataJson)
      setArticleList(articleDataJson)
    }
    /*Catch an error returned by the async function
      in case the initiated Promise object isn't
      fulfilled/is rejected.*/
    fetchAllArticleData().catch(console.error)
   }, []) 
  
   // Render the the API call in our page.
  return (
    <>
      <div className="whole-page">
        <h1>Old News</h1>
        <ul>
          {/*Check if API call has completed/is not
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
              <ArticleInfo/>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
