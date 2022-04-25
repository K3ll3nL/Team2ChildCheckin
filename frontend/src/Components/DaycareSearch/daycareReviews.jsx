import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { getDaycareReviews, postDaycareReview } from '../../api/daycareApi';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import jwt_decoder from 'jwt-decode'
import { CardContent } from '@mui/material';

export const DaycareReviews = ({ daycareId, newReviews }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        if (rating === 0 || text === '') {
            alert('Please fill out all fields');
            return;
        }
        postDaycareReview(daycareId, rating, text).then(x => {
            getDaycareReviews(daycareId).then(x => {
                setReviews(x.data);
                newReviews(x.data);
            })
        });
        setRating(0);
        setText('');
    };

    useEffect(() => {
        try {
            getDaycareReviews(daycareId).then(x => {
                setReviews(x.data);
            })
            // const _employee = jwt_decoder(sessionStorage.getItem("jwt"));
            // setLoggedInEmployee(_employee);
            // console.log(loggedInEmployee)
        } catch {
            console.log('FAILLLLLLL')
        }
    }, [])

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Reviews
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Reviews</DialogTitle>
                <DialogContent>
                    <div>
                        {reviews.map(review => (
                            <Card key={review.id} sx={{ m: 2 }}>
                                <CardContent>
                                    <Rating name="read-only" value={review.rating} readOnly />
                                    <Typography variant="body1">{review.text}</Typography>
                                </CardContent>
                            </Card>
                        ))}

                    </div>
                    <br />
                    <DialogContentText>
                        Add a review!
                    </DialogContentText>
                    <Typography component="legend" required>Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        required
                        onChange={(event, newRating) => {
                            setRating(newRating);
                        }}
                    />
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Add your comment"
                            required
                            multiline
                            fullWidth
                            rows={4}
                            helperText="Please write a review"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add Review</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}