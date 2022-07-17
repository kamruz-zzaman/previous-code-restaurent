import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ALLorderlist from './ALLordersListsearch'
import { connect } from 'react-redux';
import 'react-input-range/lib/css/index.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import InputRange from 'react-input-range';
import { getorderreportbyowner } from '../../actions/order';

const Ordereportowner = ({
  match,
  getorderreportbyowner
}) => {
  

 
  const [status, setstatus] = useState('null');
  const [valuee, setvalue] = useState(0);

  var [bool, setbool] = useState(false);

  const [selectionRange,setselectionRange] = useState({
    startDate:  new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    endDate:  new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
   
  });

  const { startDate, endDate } = selectionRange;


  const onSubmit = (e) => {
    e.preventDefault();
   console.log(selectionRange.startDate,selectionRange.endDate,0,valuee,status,match.params.id)
   getorderreportbyowner(selectionRange.startDate,selectionRange.endDate,valuee,match.params.id,status)
   setbool(true)
  };

  
  const onDateChange = (x, y) => {
  
    setselectionRange({startDate:x, endDate:y})
  
  };
  

  return  (
    <div className='containerF'>
      <h1 className='large text-primary'> Order Report </h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
       
     
     

       <div className='formgroup'>

       <p className='lead'>Select Date Range</p>
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
       <div className='formgroup'>
       <p className='lead'>Select Order Amount Range</p>
       <InputRange
          draggableTrack
          maxValue={1000}
          minValue={0}
          formatLabel={value => `${value} £`}
          value={valuee}
          onChange={value => setvalue(value)}
           />


      </div>

      <div className='form-group'>
          <p className='lead'>Select status</p>
          <select
            name='status'
            value={status}
            onChange={(e) => setstatus(e.target.value)}
          >
            <option value='0'>* SelectStatus</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
       <div className='form-group'>
        <input type='submit' className='btn btn-primary my-1' value='search' onClick={(e) =>  onSubmit(e)}/>
        </div>
      </form>
      <div className='form-group'>
      {bool ?( <ALLorderlist status={status} value={valuee} startDate={selectionRange.startDate} endDate={selectionRange.endDate} id={match.params.id}/>):(null)} 
      </div>
    </div>
  );
};
Ordereportowner.propTypes = {
  getorderreportbyowner: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  
});
export default connect(mapStateToProps, { getorderreportbyowner })(
    Ordereportowner
);
