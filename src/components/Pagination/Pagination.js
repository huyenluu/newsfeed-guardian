import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
}));

const Pagination = ({ page, pageCount, handlePageClick }) => {
    const matches = useMediaQuery('(max-width:600px)');
    const classes = useStyles()

    const handleClick = (e, page) => {
        handlePageClick(e, page)
    }
    const visiblePages = page < 7 ? [...Array(10).keys()].map(i => i + 1) : [...Array(10).keys()].map(i => i + page - 5)
    return (
        <Grid item className={classes.root}>
            <ToggleButtonGroup size="medium" value={page} exclusive onChange={handleClick} color='primary'>
                <ToggleButton value={1} disabled={page === 1}>
                    first
                </ToggleButton>
                <ToggleButton value={page === 1 ? 1 : page - 1} disabled={page === 1}>
                    previous
                </ToggleButton>
                
                { matches 
                    ? null
                    : visiblePages.map(
                        page => (
                            <ToggleButton key={page} value={page}>
                                {page}
                            </ToggleButton>
                        )
                    )
                }

                <ToggleButton value={page === pageCount ? page : page + 1} disabled={page === pageCount}>
                    next
                </ToggleButton>
                <ToggleButton value={pageCount} disabled={page === pageCount}>
                    last
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    )
}

export default Pagination
