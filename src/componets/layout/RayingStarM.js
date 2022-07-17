import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { getreviewtags } from '../../actions/review';
import Star from './Star';
import Login from '../auth/loginuser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const RatingStarsM = ({ setAlert, match, isAuthenticated, restuarants: { restuarant, loading2 }, getreviewtags, review: { review, loading }, }) => {
    const GRADES2 = [
        ['Not', 'Missed ', 'Unsustainable packing', 'Poorly packed', 'Not so tasty', 'Too slow'],
        ['Not', 'Missed ', 'Unsustainable packing', 'Poorly packed', 'Not so tasty', 'Too slow'],
        ['Not', 'Missed ', 'Unsustainable packing', 'Poorly packed', 'Not so tasty', 'Too slow'],
        ['Not', 'Missed ', 'Unsustainable packing', 'Poorly packed', 'Not so tasty', 'Too slow'],
        ['Tasty food', 'Fast and reliable', 'Healthy', 'Good communication', 'Excellent quality', 'Great value']];
    var GRADES3 = [[]];
    useEffect(() => {
        getreviewtags(match.params.id);

    }, [getreviewtags]);
    const [comments, setcomments] = useState(false);
    const [reviewgiven, setreviewgiven] = useState('');
    const [loginflag, setloginflag] = useState(true);
    const [gradeIndex, setGradeIndex] = useState();
    const [done, setdone] = useState(false);
    const closeModal = () => setOpen(false);
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };
    //custome review box
    const showcomments = (e) => {

        setcomments(!comments);

    }

    //save review tangs into a flat string
    const reviewsave = (e, value) => {
        console.log(reviewgiven)
        setreviewgiven(', ' + value);



    }
    //set selected star value
    const changeGradeIndex = (index) => {

        setGradeIndex(index);

    }
    //submit the review
    const onSubmit = async (e) => {
        e.preventDefault();
        if (reviewgiven !== '') {
            setAlert('Review submitted successfully!', 'success');
            setdone(true)
        }
        else {
            setAlert('Select tags to add a Review', 'danger');
        }
    }
    const onSubmit2 = async (e) => {
        if (reviewgiven == '') {
            setAlert('Select tags to add a Review', 'danger');
        }
        else {
            setOpen2(true)
        }
    }


    if (done) {
        return <Redirect to={`/usermenu/${match.params.url}/${match.params.id}`} />
    }
    if (!loading) {
        console.log(review.x[0])
        GRADES3.push(review);
    }
    return loading ? (
        <div>Loading ....</div>
    ) : (
        <Fragment>
            {isAuthenticated ? ('') : (<p className='logoname2M'>{!loading2 ? (restuarant.Name) : ('')}</p>)}
            {loginflag ? (<Fragment>  <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal}>


                <a className="close" onClick={(e) => (setOpen2(false))}>
                    &times;
                </a><Login />

            </Popup>
            </Fragment>) : ('')}
            <div className="containerF">

                <h1 className="result">{GRADES[gradeIndex] ? GRADES[gradeIndex] : 'You didn\'t review yet'}</h1>
                <div className="stars">
                    {
                        GRADES.map((grade, index) => (

                            <Star
                                index={index}
                                key={grade}
                                changeGradeIndex={(e) => changeGradeIndex(index)}
                                style={gradeIndex >= index ? activeStar : {}}
                            />
                        ))
                    }
                </div>
                <div className="starsT">
                    {review.x[gradeIndex] ? (<Fragment>
                        {review.x[gradeIndex].map((grade, index) => (
                            <div id="ck-buttonR" onClick={(e) => reviewsave(e, review.x[gradeIndex][index])}>
                                <label>
                                    <input type="checkbox" value="1" />
                                    <span>{review.x[gradeIndex][index]}</span>
                                </label>
                            </div>
                        ))
                        }</Fragment>) : ('')}

                </div>
                <h1 className="resultt" onClick={(e) => showcomments(e)}> Anything To Add?</h1>
                {comments ? (
                    <div className='form'><div className='form-group'>
                        <textarea
                            name="Menu_Description"
                            placeholder="Enter comments"

                            required
                        />
                    </div>
                    </div>) : ('')}
                <div className="stars">
                    {isAuthenticated ? (<button className='btnBM  btn-success my-1' onClick={(e) => onSubmit(e)}>
                        Submit</button>) : (<Fragment>
                            <button className='btnBM  btn-success my-1' onClick={(e) => onSubmit2(e)}>
                                Submit</button></Fragment>)}


                    <Link to={`/usermenu/${match.params.url}/${match.params.id}`} className='btnBM  btn-success my-1'>go home</Link>
                </div>

            </div>

        </Fragment>
    );
}

RatingStarsM.prototype = {
    setAlert: PropTypes.func.isRequired,
    getreviewtags: PropTypes.func.isRequired,
    review: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    restuarants: PropTypes.object.isRequired,

};
const mapStateToprops = (state) => ({
    review: state.review,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    restuarants: state.restuarants,
});
export default connect(mapStateToprops, { setAlert, getreviewtags })(RatingStarsM);
