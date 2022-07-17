import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getmenu } from '../../actions/menu';
import { getAlldish } from '../../actions/dish';
import Alldishes from '../dishes/AlldishesTab';
import AlldishesUI from '../dishes/AlldishesUIMTab'
import Cart from '../order/cart'
import Review from './ratingpopup'
import { getrestaurant } from '../../actions/restaurant'
import configData from "../../config.json";
import { Link } from 'react-router-dom';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
//display menu
const OwnerMenu = ({
  getmenu,
  menus: { menus, loading },
  getAlldish,
  ALL_dishes: { ALL_dishes, loadingdishes },
  getrestaurant,
  isAuthenticated,
  restuarants: { restuarant, loading2 },
  match
}) => {
  // const context = useContext(AppSettings)
  // call API to get menu data
  useEffect(() => {
    getrestaurant(match.params.id);
    getmenu(match.params.id);
    getAlldish(match.params.id)

  }, []);
  const [showdishesEven, setshowdishesEven] = useState(false);
  const [showdishesodd, setshowdishesodd] = useState(false);
  const [clickcheck, setclickcheck] = useState(false);
  const [MenuId, setMenuId] = useState('');
  const [MenuName, setMenuName] = useState('');
  const [Initalstate, setInitalstate] = useState(true);
  const [collapse, setcollapse] = useState();
  const [open, setopen] = useState(false);


  const toggleCollapse = (index, i) => {

    if (!document.getElementById(index).checked) {
      document.getElementById(index).checked = false
    }
    else {

      document.getElementById(index).checked = true
    }

    if (collapse === i) {

      setcollapse()
    }
    else {
      setcollapse(i)
    }
    console.log(collapse)
    // for (let collapseObj of collapse) {
    //   if (collapseObj.id === index) {
    //   collapseObj.collapse = !collapseObj.collapse;
    // } else {
    //   collapseObj.collapse = false;
    // }
    // newArray.push(collapseObj);
    // }
    //  setcollapse(newArray);
  }

  console.log(collapse)
  //show all menu
  const onClickk = (e) => {
    setInitalstate(true); setshowdishesEven(false); setshowdishesodd(false)
  }

  //show clicked menu
  const onClick = (e, i, name) => {

    if (clickcheck) {
      setInitalstate(false)
      setshowdishesEven(true);
      setshowdishesodd(false);
      setMenuId(i);
      setMenuName(name)
      setclickcheck(false)

    }
    else {
      setInitalstate(false);
      setshowdishesodd(true);
      setshowdishesEven(false);
      setMenuId(i)
      setMenuName(name)
      setclickcheck(true)

    }

  }
  return loading && loading2 ? (
    <div>Loading ....</div>
  ) : (
    <Fragment >
      <section className='landing2'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <div className='x-largeLogo'>  {!restuarant.Logo ? (<img
              className="centerImage2"
              src={configData.SERVER_URL + '/public/f5a38c06-8301-427d-bdec-0fba15540a54-dc2781ef-1782-4efb-8918-e4aa4b1f4efb-image-coming-soon2.png'}
              alt="logo"
            />) : (<img
              className="centerImage2"
              src={configData.SERVER_URL + '/' + restuarant.Logo}
              alt='Logo'
            />)} </div>
            <p className='lead2'>{restuarant.Name}</p>
            <Link to={`/review/${match.params.id}`} className='aReview' >
              Show review
            </Link>
            <p className='address'>{restuarant.Address},Postcode: {restuarant.PostCode}</p>

          </div>
        </div>
      </section>
      {isAuthenticated ? ('') : (<p className='logoname2M'>{!loading2 ? (restuarant.Name) : ('')}</p>)}
      <div className="scrollmenu">
        <a onClick={(e) => onClickk(e)}> ALL</a>
        {// all menu
          menus.map((menus) => (
            <Fragment>
              <a onClick={(e) => onClick(e, menus.Menu_id, menus.Menu_Name)}>
                {menus.Menu_Name}
              </a>

            </Fragment>
          ))}

      </div>

      <Review page={'tabmenu'} id={match.params.id} url={match.params.url} />
      <Cart id={match.params.id} />

      {// All dishes in a menu
        Initalstate ? (<Fragment>{loadingdishes ? null : (<Fragment>

          <div className="rowA" >

            <div className="colA">
              <div id="accordion" className="tabsA">
                <div className="tabA" >
                  <label className="tabA-label" for="chck1" >All dishes  {collapse === 0 ? (<i className="fas fa-chevron-down"></i>) : (<i className="fas fa-chevron-right"></i>)}</label>

                  <input type="checkbox" className='inputA' id="chck1" onClick={() => toggleCollapse("chck1", 0)} />

                  {collapse === 0 ? (
                    <Fragment>  <div className="tabA-content"> {//get dishes of a selected menu
                      ALL_dishes.map((ALL_dishes) => (
                        <Fragment>
                          <AlldishesUI
                            key={ALL_dishes.ressult_id}
                            dishes={ALL_dishes}
                            id={9}
                          />
                        </Fragment>

                      ))}
                    </div></Fragment>) : ''}


                </div>

                {menus.map((menus, i) => (
                  <Fragment>

                    <div className="tabA">
                      <label className="tabA-label" for={"chck" + menus.Menu_Name} >{menus.Menu_Name}  {menus.Menu_id === collapse ? (<i className="fas fa-chevron-down"></i>) : (<i className="fas fa-chevron-right"></i>)}</label>

                      <input type="checkbox" className='inputA' id={"chck" + menus.Menu_Name} onClick={() => toggleCollapse("chck" + menus.Menu_Name, menus.Menu_id)} />

                      {menus.Menu_id === collapse ? (<div className="tabA-content"> <Alldishes id={menus.Menu_id} /> </div>) : ''}
                    </div>
                  </Fragment>))
                }
              </div>
            </div>




          </div>
        </Fragment>)} </Fragment>) : (null)}


      {showdishesEven ? (<Fragment>
        <div className="rowA" >

          <div className="colA">
            <div id="accordion" className="tabsA">

              <div className="tabA">
                <label className="tabA-label" for={"chck" + MenuName} >{MenuName}  {MenuId === collapse ? (<i className="fas fa-chevron-down"></i>) : (<i className="fas fa-chevron-right"></i>)}</label>

                <input type="checkbox" className='inputA' id={"chck" + MenuName} onClick={() => toggleCollapse("chck" + MenuName, MenuId)} />

                {menus.Menu_id === collapse ? (<div className="tabA-content"> <Alldishes id={MenuId} /> </div>) : ''}
              </div>
            </div>
          </div>
        </div>


      </Fragment>) : (null)}

      {showdishesodd ? (<div className="rowA" >

        <div className="colA">
          <div id="accordion" className="tabsA">

            <div className="tabA">
              <label className="tabA-label" for={"chck" + MenuName} >{MenuName}  {MenuId === collapse ? (<i className="fas fa-chevron-down"></i>) : (<i className="fas fa-chevron-right"></i>)}</label>

              <input type="checkbox" className='inputA' id={"chck" + MenuName} onClick={() => toggleCollapse("chck" + MenuName, MenuId)} />

              {menus.Menu_id === collapse ? (<div className="tabA-content"> <Alldishes id={MenuId} /> </div>) : ''}
            </div>
          </div>
        </div>
      </div>) : (null)}

    </Fragment>
  );
};

OwnerMenu.propTypes = {
  getmenu: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
  getAlldish: PropTypes.func.isRequired,
  ALL_dishes: PropTypes.object.isRequired,
  restuarants: PropTypes.object.isRequired,
  getrestaurant: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  menus: state.menus,
  ALL_dishes: state.ALL_dishes,
  restuarants: state.restuarants,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getmenu, getAlldish, getrestaurant })(OwnerMenu);
