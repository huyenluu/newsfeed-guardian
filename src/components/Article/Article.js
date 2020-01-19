import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import * as ajax from '../../functions/ajax';
import htmlSanitizer from '../../functions/htmlSanitizer';
import { Container, Button, Grid, Paper, CssBaseline } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { SetFavoriteContext, FavoriteContext } from '../../context/FavoriteArticleContext';
import './Article.css'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Article = ({setOpenSnackBar}) => {
    
    const matches = useMediaQuery('(max-width:768px)')
    const [article, setArticle] = useState()

    let { pathname } = useLocation();

    const { setFavoriteArticleIds } = useContext(SetFavoriteContext)
    const { favoriteArticleIds } = useContext(FavoriteContext)

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

    ,[pathname])

    const handleClickFavorite = id => (e) => {

        if (favoriteArticleIds.indexOf(id) !== -1) {
            let newArrIds = [...favoriteArticleIds]
            const index = favoriteArticleIds.indexOf(id)
            newArrIds.splice(index, 1)
            setFavoriteArticleIds(newArrIds)
            
        } else {
            if (favoriteArticleIds.length > 10) {
                setOpenSnackBar(true)
            }
            else {
                setFavoriteArticleIds([...favoriteArticleIds, id])
                
            }
        }
    }
    
    if (article === undefined) return 'Loading...'

    return (
        <Container className='Container'>
            <CssBaseline/>
            <Paper className='paper_container'>
                <Grid container direction='column' >
                    <div className ='header_text' >
                        <h4 className='section_name'>{article.sectionName}</h4>
                        <h2 className='tittle'>{article.webTitle}</h2>
                        <p>Published on {article.webPublicationDate.slice(0, 10)}</p>
                        <a href={article.webUrl} className ='link'>Link to the original article</a>
                        <div className='favorite_btn'>
                            <Button
                                variant={favoriteArticleIds.indexOf(article.id) !== -1 ? 'contained' : 'outlined'}
                                onClick={handleClickFavorite(article.id)}
                                color={favoriteArticleIds.indexOf(article.id) !== -1 ? 'secondary' : 'primary'}
                                size={matches ? 'small' : 'medium'}
                            >
                                <FavoriteBorderIcon />
                                <span> </span>
                                {favoriteArticleIds.indexOf(article.id) !== -1 ? 'Added to favorites' : 'Add to favorites'}
                            </Button>
                        </div>

                    </div>

                    <div className='header_image' >
                        {
                            (article.blocks.main !== undefined && article.blocks.main.bodyHtml !== undefined)
                                ? (<div dangerouslySetInnerHTML={{ __html: htmlSanitizer(article.blocks.main.bodyHtml) }} />)
                                : null
                        }

                    </div>
                    <div className= 'body_text'>
                        {
                            article.blocks.body.map(body => (
                                <div key={body.id}>
                                    {body.elements.map((el, index) => {
                                        if (el.type === 'text') return (<div key={index} dangerouslySetInnerHTML={{ __html: htmlSanitizer(el.textTypeData.html) }} />)
                                        if (el.type === 'image') return (<img key={index} src={el.assets[0].file} alt='' className ='body_image' />)
                                    })}
                                </div>
                            ))
                        }
                    </div>
                </Grid>
            </Paper>
        </Container>

    )
}

export default Article


