import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Shoppingcart from '../order/shoppingcartownerC'

//display menu
const Table = ({
  showcart
}) => {
  // call API to get menu data


  console.log(showcart)
  const [tableselected, settableselected] = useState(showcart);
  const [tableid, settableid] = useState(0);
  //show all menu

  let ticketPrice = 2;

  //Update total and count
  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = 1;
    // count.innerText = selectedSeatsCount;
    //total.innerText = selectedSeatsCount * ticketPrice;
  }

  //Movie Select Event

  //Seat click event

  const addEventListener = (click, e, tid) => {

    if (e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
      settableid(tid)


    }
    updateSelectedCount();
  };




  useEffect(() => {
    if (tableid != 0) {
      settableselected(false)

    }
  }, []);

  return (

    <Fragment>
      <Fragment>  <div className="movie-container">
        <label>Select a Table: </label>


        <ul className="showcase">
          <li>
            <div className="seatt"></div>
            <small>N/A</small>
          </li>
          <li>
            <div className="seatt selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seatt occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>
        <br />

        <h4>Table No {tableid}</h4>
        <div className="containerCal">
          <div className="screen"></div>

          <div className="row">
            <div className="seat" onClick={(e) => addEventListener('click', e, 1)}>1</div>
            <div className="seat" onClick={(e) => addEventListener('click', e, 2)}>2</div>

            <div className="seat" onClick={(e) => addEventListener('click', e, 3)}>3</div>
            <div className="seat" onClick={(e) => addEventListener('click', e, 4)}>4</div>

          </div>
          <div className="row">
            <div className="seat" onClick={(e) => addEventListener('click', e, 5)}>5</div>

            <div className="seat occupied">6</div>
            <div className="seat occupied">7</div>
            <div className="seat" onClick={(e) => addEventListener('click', e, 8)}>8</div>

          </div>
          <div className="row">
            <div className="seat" onClick={(e) => addEventListener('click', e, 9)}>9</div>

            <div className="seat" onClick={(e) => addEventListener('click', e, 10)}>10</div>

            <div className="seat occupied">11</div>
            <div className="seat occupied">12</div>
          </div>



        </div>

      </div></Fragment>

    </Fragment>
  );
};

Table.propTypes = {

};
const mapStateToProps = (state) => ({

});
export default connect(mapStateToProps, null)(Table);
