import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import Star from './Star';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { RangeDatePicker } from 'react-google-flight-datepicker';
import { getreviewavg, getreviewsAll, getreview, getcustomerreview } from '../../actions/review';

const ShowReview = ({ setAlert, getreviewavg, match, getcustomerreview, getreviewsAll, getreview, review: { reviews, customerreview, loadingcustomerreview, reviewavg, loading3, loading2 } }) => {
  useEffect(() => {
    getreviewavg(match.params.id, startDate, startDate);
    //getreview(9,2)
    getcustomerreview(match.params.id, startDate, startDate)

  }, [getreviewavg]);
  const [gradeIndex, setGradeIndex] = useState(0);
  const [All, setAll] = useState(false);
  const [content, setcontent] = useState(false);
  const [collapse, setcollapse] = useState();
  const [selectionRange, setselectionRange] = useState({
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),

  });
  const { startDate, endDate } = selectionRange;

  const onDateChange = (x, y) => {

    setselectionRange({ startDate: x, endDate: y })
    var dd = x.getDate();

    var mm = x.getMonth() + 1;
    var yyyy = x.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    x = yyyy + '-' + mm + '-' + dd;



    var dd = y.getDate();

    var mm = y.getMonth() + 1;
    var yyyy = y.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    y = yyyy + '-' + mm + '-' + dd;
    console.log(y);

    getreviewavg(match.params.id, x, y);
    getcustomerreview(match.params.id, x, y)

  };
  const onDateChangefilter = (y) => {

    var future = new Date(new Date().setHours(0, 0, 0, 0));
    var past = new Date(new Date().setDate(future.getDate() - y));


    //getreview(9,2)


    var dd = future.getDate();

    var mm = future.getMonth() + 1;
    var yyyy = future.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    future = yyyy + '-' + mm + '-' + dd;
    console.log(future);


    var dd = past.getDate();

    var mm = past.getMonth() + 1;
    var yyyy = past.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    past = yyyy + '-' + mm + '-' + dd;
    console.log(past);
    setselectionRange({ startDate: past, endDate: future })
    getreviewavg(match.params.id, past, future);
    getcustomerreview(match.params.id, past, future)

  };
  //console.log(startDate, endDate)
  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const activeStar = {
    fill: 'yellow'
  };
  const toggleCollapse = (index, i, rate) => {

    if (!document.getElementById(index).checked) {
      document.getElementById(index).checked = false
    }
    else {
      getreview(match.params.id, rate, startDate, endDate)
      document.getElementById(index).checked = true
    }

    if (collapse === i) {

      setcollapse()
    }
    else {
      setcollapse(i)
    }
    //console.log(collapse)

  }

  return loading3 && loading2 && loadingcustomerreview ? (
    <div>Loading ....</div>
  ) : (
    <div className="containerFR">
      <h1 className='largeH '>Customer Satisfaction</h1>
      <button className='btn btn-primary2' onClick={(e) => onDateChangefilter(30)}> Past 30</button>
      <button className='btn btn-primary2' onClick={(e) => onDateChangefilter(60)}> Past 60</button>
      <button className='btn btn-primary2' onClick={(e) => onDateChangefilter(90)}> Past 90</button>
      <div className='columnSoK'>
        <RangeDatePicker
          startDate={
            startDate
          }
          endDate={
            endDate
          }
          dateFormat='YYYY MM DD'
          startDatePlaceholder='Start Date'
          endDatePlaceholder='End Date'
          disabled={false}
          className='my-own-class-name'
          startWeekDay='monday'
          onChange={(startDate, endDate) => onDateChange(startDate, endDate)}
        />
      </div>

      <div className='rowSo'>
        <div className='columnSo'>
          {/* <h1 className="result">{!reviewavg.x ? ('None') : (reviewavg.x[5])}{" "} <i className="fas fa-star"></i> based on {reviewavg.x[6]} ratings</h1> */}
        </div>
        <div className='columnSo2'>
          <h1 className="result"> {!reviewavg.x ? ('None') : (<Fragment>{(+reviewavg.x[5] / 5) * 100}% Average rating</Fragment>)} </h1>
          <div className="w3-light-grey">
            <div className="w3-container w3-green w3-center" style={{ 'width': `${!reviewavg.x ? ('None') : (((+reviewavg.x[5] / 5) * 100).toString() + '%')}` }} >{!reviewavg.x ? ('None') : (<Fragment>{(+reviewavg.x[5] / 5) * 100}%</Fragment>)}</div>
          </div>
        </div>
      </div>



      <div className="rowA">
        <div className="colA">
          <div id="accordion" className="tabsA">
            {!customerreview.review ? ('') : (<Fragment>{customerreview.review.map((x, i) => (
              <Fragment>

                <div className="tabA2">
                  <label className="tabA2-label" for={"chck" + x.rate} >


                    <div className="rowReview2">
                      <div className="columnReviewu">
                        <div className="stars" disabled >
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
                      </div>
                      <div className="columnReview2u" >
                        <div className="w3-light-grey">
                          <div className="w3-container w3-green w3-center" style={{ 'width': `${!customerreview.review ? ('None') : (x.percentage)}` }} >{!customerreview.review ? ('None') : (x.percentage)}</div>

                        </div>







                      </div>
                      <div className="columnReview3u">
                        <p>{x.count}</p>
                      </div>
                      <div className="columnReview4u">
                        {!x.value ? ('') : (<Fragment>{x.value.map((y, i) => (<Fragment><button className="btnCR btn-primary2"> {y[0]}  <span className="badge">{y[1]}</span> </button></Fragment>))}</Fragment>)}
                      </div>
                    </div>



                    {i === collapse ? (<i className="fas fa-chevron-down pad_top"></i>) : (<i className="fas fa-chevron-right pad_top"></i>)}</label>

                  <input type="checkbox" className='inputA' id={"chck" + x.rate} onClick={() => toggleCollapse("chck" + x.rate, i, x.rate)} />

                  {i === collapse ? (<div className="tabA-content">
                    {reviews === null && loading2 ? ('loading...') : (<Fragment>

                      <div >

                        <table className='servicesTR'>

                          <tbody>
                            <tr>
                              <th width="40">Tags</th>

                              <th width="20">Comment</th>
                              <th width="20">Customer Details</th>
                              <th width="20">Date</th>
                            </tr>
                          </tbody>

                          <tbody>




                            {reviews.review.map((x, index) => (<Fragment>
                              <tr>
                                <td>
                                  <div >

                                    <div className="starsT">
                                      {x.value.map((v) => (<div id="ck-buttonR">
                                        <label>
                                          <input type="checkbox" value="1" />
                                          <span>{v}</span>
                                        </label>
                                      </div>))}
                                    </div>
                                  </div>
                                </td>
                                <td>{x.comment}</td>
                                <td>
                                  <p>{x.Name}</p>

                                </td>
                                <td><p>{x.Time}, {x.Date}</p></td>
                              </tr>
                            </Fragment>))}



                          </tbody>
                        </table>
                      </div>


                    </Fragment>)}
                  </div>) : ''}
                </div>
              </Fragment>))}</Fragment>)
            }


          </div>
        </div>
      </div>
    </div>



  );
}

ShowReview.prototype = {
  setAlert: PropTypes.func.isRequired,
  getreviewavg: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  getreviewsAll: PropTypes.func.isRequired,
  getreview: PropTypes.func.isRequired,
  getcustomerreview: PropTypes.func.isRequired,

};
const mapStateToprops = (state) => ({
  review: state.review,
});
export default connect(mapStateToprops, { setAlert, getcustomerreview, getreviewavg, getreviewsAll, getreview })(ShowReview);