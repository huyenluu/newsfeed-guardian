import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';
import htmlSanitizer from '../../functions/htmlSanitizer';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { SetFavoriteContext, FavoriteContext } from '../../context/FavoriteArticleContext';
import './DisplayedArticles.css'
import StarIcon from '@material-ui/icons/Star';

const DisplayedArticles = ({ articles , setOpenSnackBar }) => {

    const { setFavoriteArticleIds } = useContext(SetFavoriteContext)
    const { favoriteArticleIds } = useContext(FavoriteContext)
    

    const handleAddFavorite = id => event => {

        if (favoriteArticleIds.indexOf(id) !== -1) {
            let newArrIds = [...favoriteArticleIds]
            const index = favoriteArticleIds.indexOf(id)
            newArrIds.splice(index, 1)
            setFavoriteArticleIds(newArrIds)
            
        } else {
            if (favoriteArticleIds.length > 9) {
                setOpenSnackBar(true)
            }
            else {
                setFavoriteArticleIds([...favoriteArticleIds, id])
                
            }
        }
    }
    

    const renderArticle = (article) => {
        if (article.fields.thumbnail === undefined) return null
        else {
            return (
                <Grid item xs={12} sm={6} md={4} key={article.id} style ={{flexGrow: 1}}>
                    
                    <Card>
                        <Link to={`/${article.id}`}>
                            <CardMedia image={article.fields.thumbnail} style={{ height: 300 }} />
                        </Link>
                        <CardContent>
                            <div className='card_header'>
                                {/* <Typography gutterBottom variant="h5" component="h4" style={{ fontWeight: 700, color: '#c70000', paddingTop:'12px'}}>
                                    {article.pillarName}
                                </Typography> */}
                                <h3 className ='pillar_name'> {article.pillarName} </h3>
                                <Tooltip
                                    title={favoriteArticleIds.indexOf(article.id) === -1 ? 'Add to Favotites' : 'Remove from favorites'}
                                    aria-label="add"
                                >
                                    <IconButton
                                        aria-label="add to favorites"
                                        onClick={handleAddFavorite(article.id)}
                                        color={favoriteArticleIds.indexOf(article.id) === -1 ? 'primary' : 'secondary'}
                                        
                                    >
                                        <StarIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            <Link to={`/${article.id}`}>
                                <Typography variant="h5" component="h3" className='web_tittle'>
                                    {article.webTitle}
                                </Typography>

                                <div
                                    dangerouslySetInnerHTML={{ __html: htmlSanitizer(article.fields.trailText) }}
                                    className='card_body_text'
                                />
                            </Link>

                        </CardContent>

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
            <Grid container spacing={2} alignItems = 'stretch'>
                {articles.map(renderArticle)}
            </Grid>
        </Grid>
    )
}

export default DisplayedArticles
