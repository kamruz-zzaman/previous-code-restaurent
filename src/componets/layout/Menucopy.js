import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import { getAlldish } from '../../actions/dish';
import Alldishes from '../dishes/AlldishesMcopy';
import AlldishesUI from '../dishes/AlldishesUIMCopy'
import Cart from '../order/cart'
import Review from './ratingpopup'
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
    getmenu(match.params.id);
    getAlldish(match.params.id)
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
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment>
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
           <Review  page={'menuscopy'} name={match.params.name} id={match.params.id} url={match.params.url}/>
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
 isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  menus: state.menus,
 ALL_dishes: state.ALL_dishes,
 restuarants: state.restuarants,
 isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getmenu,  getAlldish  })(Menu);
