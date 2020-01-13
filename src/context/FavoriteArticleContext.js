import React, { useState, createContext} from 'react';
export const FavoriteContext = createContext()
export const SetFavoriteContext = createContext()

const FavoriteContextProvider = (props) => {

  const data = sessionStorage.getItem('favoriteArticleIds')
  const initialIds = data === null? [] : data.split(',')
 
  const [favoriteArticleIds, setFavoriteArticleIds] = useState(initialIds)
  const [favoriteArticles, setFavoriteArticles] =useState([])


  return (
    <FavoriteContext.Provider value={{favoriteArticleIds, favoriteArticles}}>
      <SetFavoriteContext.Provider value={{setFavoriteArticleIds,setFavoriteArticles}}>
        {props.children}
      </SetFavoriteContext.Provider> 
    </FavoriteContext.Provider>
  )
}

export default FavoriteContextProvider
