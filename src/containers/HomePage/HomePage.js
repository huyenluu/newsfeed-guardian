import React, { useState, useEffect, useContext } from 'react';
import * as ajax from '../../functions/ajax';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Pagination from '../../components/Pagination/Pagination';
import DisplayedArticles from '../../components/DisplayedArticles/DisplayedArticles';
import { FavoriteContext, SetFavoriteContext } from '../../context/FavoriteArticleContext';
import MySnackbar from '../../components/MySnackbar';
import './HomePage.css'

const HomePage = () => {
   
    const [articles, setArticles] = useState()
    const [pageCount, setPageCount] = useState(100)
    const [page, setPage] = useState(1)
    const [isOpenFavorite, setOpenFavorite] = useState(false)
    const { favoriteArticleIds, favoriteArticles } = useContext(FavoriteContext)
    const { setFavoriteArticles} = useContext(SetFavoriteContext)
    const [openSnackBar, setOpenSnackBar] = useState(false);
    useEffect(() => {
        ajax.search({
            'page-size': 20,
            'page': page,
            'show-fields': 'headline,trailText,thumbnail',
            'api-key': ajax.API_KEY
        })
            .then(data => {
                setArticles(data.data.response.results)
                setPageCount(data.data.response.pages)
            })
    }, [page])

    const loadFavoriteArticlesFromApi = () => {

        Promise.all(
            favoriteArticleIds.map(id => {
                return ajax.search({
                    'ids': id,
                    'show-fields': 'headline,trailText,thumbnail',
                    'api-key': ajax.API_KEY
                })
            }
            ))
            .then(
                res => res.map(data => data.data.response.results[0])
            )
            .then(setFavoriteArticles)
    }

    const handlePageClick = (e, page) => {
        setPage(page)
    };

    const openFavorite = boolean => (e) => {
        setOpenFavorite(boolean)
        loadFavoriteArticlesFromApi()
    }
    const handleSnackBar = (boolean) => {
        setOpenSnackBar(boolean)
    }
    

    return (
        
        <Container>
            <div className ='group_btn'>
                <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
                    <Button 
                        onClick={openFavorite(false)}
                        disabled ={!isOpenFavorite}
                    >
                        News feed
                    </Button>
                    <Button
                        onClick={openFavorite(true)}
                        disabled ={isOpenFavorite}
                    >
                        My Favorite Articles
                    </Button>
                </ButtonGroup>
            </div>
            <Grid container direction="column" spacing={4} >
                {
                    isOpenFavorite
                        ? <DisplayedArticles articles={favoriteArticles} />

                        : (<>
                            <DisplayedArticles articles={articles} setOpenSnackBar ={handleSnackBar} />
                            <Pagination page={page} pageCount={pageCount} handlePageClick={handlePageClick} />
                        </>)
                }
            </Grid>
            <MySnackbar open={openSnackBar} setOpen={handleSnackBar} message = 'You can have only 10 favorite article!'/>

        </Container>
    )
}

export default HomePage
