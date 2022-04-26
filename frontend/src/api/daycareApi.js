import axios from 'axios'
const URL ="http://3.145.96.3:8000";

export const getDaycares = () => new Promise((resolve, reject) => {
    
    axios.get(`${URL}/centers/`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});
export const getDaycareReviews = (daycare_id) => new Promise((resolve, reject) => {

    axios.get(`${URL}/reviews/${daycare_id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });

});
export const postDaycareReview = (daycare_id, rating, text) => new Promise((resolve, reject) => {

    axios.post(`${URL}/reviews/`, {
        center_id: daycare_id,
        rating: rating,
        text: text
    })
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });

});