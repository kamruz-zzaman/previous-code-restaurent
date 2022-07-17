import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import Star from './Star';
import { getreviewavg, getreviewsAll, getreview } from '../../actions/review';

const ShowReview = ({ setAlert, getreviewavg, match, getreviewsAll, getreview, review: { reviews, reviewavg, loading3, loading2 } }) => {
  useEffect(() => {
    getreviewavg(match.params.id, '2022-2-2', '2022-2-2');
    getreviewsAll(match.params.id)

  }, [getreviewavg]);
  const [gradeIndex, setGradeIndex] = useState(0);
  const [All, setAll] = useState(false);
  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const activeStar = {
    fill: 'yellow'
  };
  const GRADES2 = [
    ['Not Worth the price', 'Missed order notes', 'Unsustainable packing', 'Poorly packed'],
    ['Unsustainable packing', 'Poorly packed'],
    ['Not Worth the price', 'Poorly packed', 'Not so tasty', 'Too slow'],
    ['Not Worth the price', 'Missed order notes', 'Poorly packed', 'Not so tasty', 'Too slow'],
    ['Tasty food', 'Fast and reliable', 'Healthy', 'Good communication', 'Excellent quality', 'Great value']];
  const changeGradeIndex = (index) => {
    getreview(9, index)

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert('Review given', 'success');

  }

  return loading3 && loading2 ? (
    <div>Loading ....</div>
  ) : (
    <div className="containerF">
      <h1 className="result">Reviews average {!reviewavg.x ? ('None') : (reviewavg.x[5])} </h1>
      <h3 className="result" onClick={() => setAll(true)}>All</h3>
      <div className="rowReview">
        <div className="columnReview">
          <div className="stars" onClick={() => changeGradeIndex(5)}>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star"></div>

          </div>

        </div>
        <div className="columnReview2" >
          <div className="w3-light-grey">
            <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg.x ? ('None') : (reviewavg.x[4])}` }} >{!reviewavg.x ? ('None') : (reviewavg.x[4])}</div>
          </div><br></br>
        </div>
      </div>

      <div className="rowReview">
        <div className="columnReview">
          <div className="stars" onClick={() => changeGradeIndex(4)}>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star2"></div>

          </div>

        </div>
        <div className="columnReview2" >
          <div className="w3-light-grey">
            <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg.x ? ('None') : (reviewavg.x[3])}` }} >{!reviewavg.x ? ('None') : (reviewavg.x[3])}</div>
          </div><br></br>
        </div>
      </div>

      <div className="rowReview">
        <div className="columnReview">
          <div className="stars" onClick={() => changeGradeIndex(3)}>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star2"></div>
            <div className="clip-star2"></div>

          </div>

        </div>
        <div className="columnReview2" >
          <div className="w3-light-grey">
            <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg.x ? ('None') : (reviewavg.x[2])}` }} >{!reviewavg.x ? ('None') : (reviewavg.x[2])}</div>
          </div><br></br>
        </div>
      </div>
      <div className="rowReview">
        <div className="columnReview">
          <div className="stars" onClick={() => changeGradeIndex(2)}>
            <div className="clip-star"></div>
            <div className="clip-star"></div>
            <div className="clip-star2"></div>
            <div className="clip-star2"></div>
            <div className="clip-star2"></div>

          </div>

        </div>
        <div className="columnReview2" >
          <div className="w3-light-grey">
            <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg.x ? ('None') : (reviewavg.x[1])}` }} >{!reviewavg.x ? ('None') : (reviewavg.x[1])}</div>
          </div><br></br>
        </div>
      </div>
      <div className="rowReview">
        <div className="columnReview">
          <div className="stars" onClick={() => changeGradeIndex(1)}>
            <div className="clip-star"></div>
            <div className="clip-star2"></div>
            <div className="clip-star2"></div>
            <div className="clip-star2"></div>
            <div className="clip-star2"></div>

          </div>

        </div>
        <div className="columnReview2" >
          <div className="w3-light-grey">
            <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg.x ? ('None') : (reviewavg.x[0])}` }} >{!reviewavg.x ? ('None') : (reviewavg.x[0])}</div>
          </div><br></br>
        </div>
      </div>



      <h1 className="result">{!gradeIndex ? (<Fragment>All Star Review </Fragment>) : (<Fragment>{gradeIndex + 1} Star Review </Fragment>)} </h1>

      {reviews === null && loading2 ? ('loading...') : (<Fragment>{reviews.review.map((x, index) => (<Fragment>
        <div className='cardReview2'>
          <div className="stars">
            {
              GRADES.map((grade, index) => (

                <Star
                  index={index}
                  key={grade}
                  style={x.rate - 1 >= index ? activeStar : {}}
                />
              ))
            }
          </div>
          <div className="starsT">
            {x.value.map((v) => (<div id="ck-buttonR">
              <label>
                <input type="checkbox" value="1" />
                <span>{v}</span>
              </label>
            </div>))}
          </div>
        </div>
      </Fragment>))}</Fragment>)}



    </div>







  );
}

ShowReview.prototype = {
  setAlert: PropTypes.func.isRequired,
  getreviewavg: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  getreviewsAll: PropTypes.func.isRequired,
  getreview: PropTypes.func.isRequired,

};
const mapStateToprops = (state) => ({
  review: state.review,
});
export default connect(mapStateToprops, { setAlert, getreviewavg, getreviewsAll, getreview })(ShowReview);