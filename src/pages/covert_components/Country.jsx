import React, { useEffect, useState } from 'react'
import {Article} from './Article'

export function Country({code}){
    const [articles, setArticles] = useState([])
    const url= "https://newsapi.org/v2/top-headlines?country="+code+"&apiKey="+process.env.NEWS_API_KEY
    useEffect(() => {
        fetch(url)
        .then(async (response) => {
            const data = await response.json()
            console.log(data)
            setArticles(data.articles)})
    },[url])


    const countryTitle = () =>{
        var title;

        switch(code){
            case "us":
                title = "US NEWS"
                break
            case "gb":
                title = "UK NEWS"
                break
            case "pl":
                title = "WIADOMOŚCI POLSKIE"
                break
            case "eg":
                title = "الاخبار المصرية"
                break
            case "it":
                title = "NOTIZIE ITALIANE"
                break
            case "ru":
                title = "РУССКИЕ НОВОСТИ"
                break
            case "mx":
                title = "Noticias Mexicanas"
                break
            case "co":
                title = "Noticias Colombianas"
                break
            case "za":
                title = "Zambian News"
                break

        }
        return title
    }

    const changeFlag = () => {
        var color;
  
        switch (code){
            case "us":
                color = "rgba(255,0,0,0.5)"
                break
            case "gb":
                color = "rgba(0,255,0,0.5)"
                break
            case "pl":
                color = "rgba(0,0,0,0.5)"
                break
            case "eg":
                color = "rgba(0,0,255,0.5)"
                break
            case "it":
                color = "rgba(210,210,210,0.5)"
                break
            case "ru":
                color = "rgba(100,100,100,0.5)"
                break
            case "mx":
                color = "rgba(50,50,50,0.5)"
                break
            case "co":
                color = "rgba(25,25,25,0.5)"
                break
            case "za":
                color = "rgba(15,15,15,0.5)"
        }
        var flagStyle= {
            background: color,
            margin: '5% 5%',
            paddingBottom: '10px',
            paddingTop: '10px'
        }
        return flagStyle
    }

    
    var flagStyle = changeFlag()
    console.log(flagStyle)
    return (
    <div style={flagStyle} >
        <h1 id={code} className="country-title">{countryTitle()}</h1>
        {articles.map(article => <Article article={article} />)}
    </div>
    )
}