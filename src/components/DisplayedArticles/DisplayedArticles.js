import React, { useContext , useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import {  CardMedia } from '@material-ui/core';
import htmlSanitizer from '../../functions/htmlSanitizer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { SetFavoriteContext, FavoriteContext } from '../../context/FavoriteArticleContext';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './DisplayedArticles.css'
import MySnackbar from '../MySnackbar';

const DisplayedArticles = ({ articles }) => {
    const matches = useMediaQuery('(min-width:700px)');
    const { setFavoriteArticleIds } = useContext(SetFavoriteContext)
    const { favoriteArticleIds } = useContext(FavoriteContext)
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleAddFavorite = id => event => {
        if (favoriteArticleIds.length > 10) {
            console.log('you can have only 10 favorite article!')
            setOpenSnackBar(true)
        } else {
            if (favoriteArticleIds.indexOf(id) === -1) {
                setFavoriteArticleIds([...favoriteArticleIds, id])
                sessionStorage.setItem('favoriteArticleIds', [...favoriteArticleIds, id])
            }
            else {
                //id already there

                let newArrIds = [...favoriteArticleIds]
                const index = favoriteArticleIds.indexOf(id)
                newArrIds.splice(index, 1)
                setFavoriteArticleIds(newArrIds)
                sessionStorage.setItem('favoriteArticleIds', newArrIds)

            }

        }
    }
    const handleCloseSnackBar =() =>{
        setOpenSnackBar(false)
    }


    const renderArticle = (article) => {
        if (article.fields.thumbnail === undefined) return null
        else {
            return (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                    <MySnackbar open ={openSnackBar} setOpen ={handleCloseSnackBar} />
                    <Card className='Card'>
                        <Link to={`/${article.id}`}>
                        
                                <CardMedia image={article.fields.thumbnail} style={{ height: 300 }} />

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h4" style ={{fontWeight: 700, color: '#c70000'}}>
                                        {article.pillarName}
                                    </Typography>
                                    
                                    <Typography variant="h5" component="h3" className ='web_tittle'>
                                        {article.webTitle}
                                    </Typography>
                        
                                    <div
                                        dangerouslySetInnerHTML={{ __html: htmlSanitizer(article.fields.trailText) }}
                                        className = {matches ? 'body_text_mq': 'body_text' }
                                    />
                                </CardContent>
                       
                        </Link>
                        <CardActions className ='icon_btn'>
                            <Tooltip 
                                title={favoriteArticleIds.indexOf(article.id) === -1 ? 'Add to Favotites' : 'Remove from favorites'}
                                aria-label="add">
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={handleAddFavorite(article.id)}
                                    color={favoriteArticleIds.indexOf(article.id) === -1 ? 'primary' : 'secondary'}
                                    
                                >
                                    <FavoriteIcon className='icon' />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>
                </Grid>
            )
        }
    }
    if (articles === undefined) {
        return 'Loading...'
    }
    return (
        <Grid item>
            <Grid container spacing={2}>
                {articles.map(renderArticle)}
            </Grid>
        </Grid>
    )
}

export default DisplayedArticles
