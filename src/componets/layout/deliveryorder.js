import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import { getAlldish } from '../../actions/dish';
import Alldishes from '../dishes/AlldishesMownerC';
import AlldishesUI from '../dishes/AlldishesUIMownerC'
import Cart from '../order/shoopingcartdelivery'
//display menu
const Deliveryorder = ({
  getmenu,
  menus: { menus, loading },
  getAlldish,
  ALL_dishes: { ALL_dishes, loadingdishes },
  products: { fav, favloading },
  match
}) => {
  // call API to get menu data
  useEffect(() => {
    getmenu(match.params.id);
    getAlldish(match.params.id)
  }, []);

  const [showdishesEven, setshowdishesEven] = useState(false);
  const [showdishesodd, setshowdishesodd] = useState(false);
  const [clickcheck, setclickcheck] = useState(false);
  const [MenuId, setMenuId] = useState('');
  const [Initalstate, setInitalstate] = useState(true);


  //show all menu
  const onClickk = (e) => {
    setInitalstate(true); setshowdishesEven(false); setshowdishesodd(false)
  }

  //show clicked menu
  const onClick = (e, i) => {

    if (clickcheck) {
      setInitalstate(false)
      setshowdishesEven(true);
      setshowdishesodd(false);
      setMenuId(i);
      setclickcheck(false)

    }
    else {
      setInitalstate(false);
      setshowdishesodd(true);
      setshowdishesEven(false);
      setMenuId(i)
      setclickcheck(true)

    }

  }


  if (!favloading) {
    console.log('HelloFavMenu', fav)
    if (!Initalstate) {
      setInitalstate(true); setshowdishesEven(false); setshowdishesodd(false)
    }

    //hanldevariations (variations)

  }
  return loading ? (
    <div>Loading ....</div>
  ) : (
    <Fragment >
      <div className='menucontainer'>
        <div className='flex-containerC'>



          <div className='column'>

            <div className="ownercart">
              <Cart id={match.params.id} rid={match.params.rid} />
            </div>
          </div>
          <div className='column bg-alt'>
            <div className="grid-container">
              {// All dishes in a menu
                Initalstate ? (<Fragment>{loadingdishes ? null : (<Fragment>
                  {//get dishes of a selected menu
                    ALL_dishes.map((ALL_dishes) => (
                      <Fragment>
                        <AlldishesUI
                          key={ALL_dishes.ressult_id}
                          dishes={ALL_dishes}
                          id={match.params.id}
                        />
                      </Fragment>
                    ))}


                </Fragment>)} </Fragment>) : (null)}


              {showdishesEven ? (<Alldishes id={MenuId} />) : (null)}

              {showdishesodd ? (<Alldishes id={MenuId} />) : (null)}
            </div>




          </div>
          <div className='columnH'>
            <button className='buttonAM' onClick={(e) => onClickk(e)}> ALL</button>
            {// all menu
              menus.map((menus) => (
                <Fragment>
                  <button className='buttonAM' onClick={(e) => onClick(e, menus.Menu_id)}>
                    {menus.Menu_Name}
                  </button>

                </Fragment>
              ))}

          </div>
        </div>
        <div>

        </div>
      </div>
    </Fragment>
  );
};

Deliveryorder.propTypes = {
  getmenu: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
  getAlldish: PropTypes.func.isRequired,
  ALL_dishes: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  menus: state.menus,
  ALL_dishes: state.ALL_dishes,
  products: state.products,
});
export default connect(mapStateToProps, { getmenu, getAlldish })(Deliveryorder);
