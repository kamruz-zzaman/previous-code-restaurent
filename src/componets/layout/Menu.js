import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import { getAlldish } from '../../actions/dish';
import Alldishes from '../dishes/AlldishesM';
import AlldishesUI from '../dishes/AlldishesUIM'
import Cart from '../order/cart'
import {getrestaurant} from '../../actions/restaurant'
import Review from './ratingpopup';
import configData from "../../config.json";
import { Link } from 'react-router-dom';
//display menu
const Menu = ({
  getmenu,
  menus: { menus, loading },
  getAlldish,
  ALL_dishes: { ALL_dishes, loadingdishes },
  match,
  isAuthenticated,
  getrestaurant, restuarants: {restuarant, loading2}
}) => {
  // call API to get menu data
  useEffect(() => {
    getrestaurant(match.params.id);
    getmenu(match.params.id);
    getAlldish(match.params.id);
  }, [getmenu], [getAlldish]);

  const [showdishesEven, setshowdishesEven] = useState(false);
  const [showdishesodd, setshowdishesodd] = useState(false);
  const [clickcheck, setclickcheck] = useState(false);
  const [MenuId, setMenuId]= useState('');
  const [Initalstate, setInitalstate]= useState(true);
 
 
  //show all menu
const onClickk=(e)=>{
  setInitalstate(true); setshowdishesEven(false); setshowdishesodd(false)
}

//show clicked menu
  const onClick = (e,i) => {
    
    if (clickcheck)                      
    {
      setInitalstate(false)
      setshowdishesEven(true);
      setshowdishesodd(false);
      setMenuId(i);
      setclickcheck(false)
      
    }
    else{
      setInitalstate(false);
      setshowdishesodd(true);
      setshowdishesEven(false);
      setMenuId(i)
      setclickcheck(true)
      
    }

      }
  return loading &&  loading2 ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
       <section className='landing2'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='x-largeLogo'>  {!restuarant.Logo?(<img
          className="centerImage2"
              src= {configData.SERVER_URL+'/public/f5a38c06-8301-427d-bdec-0fba15540a54-dc2781ef-1782-4efb-8918-e4aa4b1f4efb-image-coming-soon2.png'}
              alt="logo"
               />):( <img
          className="centerImage2"
              src= {configData.SERVER_URL+restuarant.Logo}
              alt='Logo'
               />)} </div>
          <p className='lead2'>{restuarant.Name}</p>
          <Link className='aReview' to={`/review/${match.params.id}`} >
              Show review
            </Link>
            <p className='address'>{restuarant.Address},Postcode: {restuarant.PostCode}</p>
       

        </div>
      </div>
    </section>
       <div className='usermenu'>
         {isAuthenticated?(''):( <p className='logoname2M'>{!loading2?(restuarant.Name):('')}</p>)}
      
        <div className="scrollmenu">
          <a onClick={(e)=> onClickk(e)}> ALL</a> 
          {// all menu
          menus.map((menus) => (
          <Fragment>
          <a onClick={(e) =>onClick(e,menus.Menu_id)}>
          {menus.Menu_Name}
           </a>
          
    </Fragment>
          ))}
     
    </div>
         <Review page={'menus'}id={match.params.id} url={match.params.url}/>
          <Cart id={match.params.id}/>
         {// All dishes in a menu
         Initalstate ? (<Fragment>{loadingdishes ?null: (<Fragment>  
           <duv className='grid-containerUM'> {//get dishes of a selected menu
           ALL_dishes.map((ALL_dishes) => (
          <Fragment>
          <AlldishesUI
              key={ALL_dishes.ressult_id}
              dishes={ALL_dishes}
            />
            </Fragment>
          ))}
        
          </duv>
          </Fragment>)} </Fragment>  ): (null)}


    {showdishesEven ? (<Alldishes id={MenuId}/>): (null)}
 
    {showdishesodd ? (<Alldishes id={MenuId}/>): (null)}

    </div>
    </Fragment>
  );
};

Menu.propTypes = {
  getmenu: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
  getAlldish: PropTypes.func.isRequired,
 ALL_dishes: PropTypes.object.isRequired,
 restuarants:PropTypes.object.isRequired,
 getrestaurant: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  menus: state.menus,
  isAuthenticated: state.auth.isAuthenticated,
 ALL_dishes: state.ALL_dishes,
 restuarants: state.restuarants,
});
export default connect(mapStateToProps, { getmenu,  getAlldish,getrestaurant  })(Menu);
