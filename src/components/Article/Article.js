import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import * as ajax from '../../functions/ajax';
import htmlSanitizer from '../../functions/htmlSanitizer';
import { Container, Button, Grid, Paper } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { SetFavoriteContext, FavoriteContext } from '../../context/FavoriteArticleContext';
import './Article.css'


const blue = '#052962'
const red = '#c70000'

const Article = () => {
    
    const [article, setArticle] = useState()

    let { pathname } = useLocation();

    const { setFavoriteArticleIds } = useContext(SetFavoriteContext)
    const { favoriteArticleIds } = useContext(FavoriteContext)
    const [heartColor, setHeartColor] = useState()
    useEffect(
        () => {

            ajax.searchItem(pathname, {
                'show-blocks': 'main,body',
                'api-key': ajax.API_KEY
            })
                .then(res => {
                    setArticle(res.data.response.content)
                })
        }

    )

    const handleClickFavorite = (e) => {

        if (favoriteArticleIds.length > 10) {
            console.log('you can have only 10 favorite article!')
        } else {
            if (favoriteArticleIds.indexOf(article.id) === -1) {
                setFavoriteArticleIds([...favoriteArticleIds, article.id])
                setHeartColor(red)
                sessionStorage.setItem('favoriteArticleIds', [...favoriteArticleIds, article.id])
            }
            else {
                //id already there

                let newArrIds = [...favoriteArticleIds]
                const index = favoriteArticleIds.indexOf(article.id)
                newArrIds.splice(index, 1)
                setFavoriteArticleIds(newArrIds)
                setHeartColor(blue)
                sessionStorage.setItem('favoriteArticleIds', newArrIds)

            }

        }
    }

    if (article === undefined) return 'Loading...'

    return (
        <Container >
            <Paper className='paper_container'>
                <Grid container>
                    <Grid item >
                        <h2>{article.webTitle}</h2>
                        <h4>{article.sectionName}</h4>
                        <p>Published on {article.webPublicationDate.slice(0, 10)}</p>
                        <a href={article.webUrl}>Link to the original article</a>
                        <Button
                            variant={favoriteArticleIds.indexOf(article.id) !== -1 ? 'contained' : 'outlined'}
                            onClick={handleClickFavorite}
                            color={favoriteArticleIds.indexOf(article.id) !== -1 ? 'secondary' : 'primary'}
                        >
                            <FavoriteBorderIcon />
                            <span> </span>
                            {favoriteArticleIds.indexOf(article.id) !== -1 ? 'Added to favorites' : 'Add to favorites'}
                        </Button>
                    </Grid>
                   
                    <Grid item xs={12}>
                        {
                            (article.blocks.main !== undefined && article.blocks.main.bodyHtml !== undefined)
                                ? (<div dangerouslySetInnerHTML={{ __html: htmlSanitizer(article.blocks.main.bodyHtml) }} />)
                                : null
                        }

                    </Grid>

                    {
                        article.blocks.body.map(body => (
                            <div key={body.id}>
                                {body.elements.map((el, index) => {
                                    if (el.type === 'text') return (<div key={index} dangerouslySetInnerHTML={{ __html: htmlSanitizer(el.textTypeData.html) }} />)
                                    if (el.type === 'image') return (<img key={index} src={el.assets[0].file} style={{ width: '30%', height: 'auto' }} alt='' />)
                                })}
                            </div>
                        ))
                    }
                </Grid>
            </Paper>
        </Container>

    )
}

export default Article


