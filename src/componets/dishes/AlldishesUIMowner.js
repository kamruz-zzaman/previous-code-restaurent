import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getvariation } from '../../actions/variations'
import { connect } from 'react-redux';
import Dealsdishes from './dealdishes';
import { addimage } from '../../actions/dish'
import { addproduct, adddealproduct, setfavdish } from '../../actions/shoppingcart'
import { emptycart } from '../../actions/dealscart'
import { setAlert } from '../../actions/alert';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Cart from '../order/dealscart'

//all dishes show UI in owner dashboard
const AlldishesUIMOwner = ({
  auth,
  dishes: { Dish_id, Dish_Name, Dish_Price, Dish_Description, image, variations, Type, ingredients, calories },
  id,
  setfavdish,
  addproduct,
  emptycart,
  adddealproduct,
  setAlert,
  dealscart: { deals, subtotal, loading, editorder, qty },
  products: { fav, favloading }

}) => {

  const [showvaration, setshowvaration] = useState(false);
  const [dealvari, setdealvari] = useState(false);
  const [update, setupdate] = useState(true);
  const [count, setcount] = useState(1);
  const [price, setprice] = useState(Dish_Price);
  const [allowedvaration, setallowedvaration] = useState([{ selected: 0, allowed: 0, type: "" }]);

  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const closeModal = () => setOpen(false);
  const [setselectvaration] = useState(false);
  const [warning, setwarning] = useState('');
  const [dishvariation, setdishvariation] = useState([{ variationID: "", variation_Name: "", variation_Type: "" }]);
  const [formData] = useState({
    Key: 0,
    DishID: Dish_id,
    Name: Dish_Name,
    Description: Dish_Description,
    variation: Dish_Description,
    Qty: count,
    Dish_Price: price,
    img: image,
    Type: Type
  });




  const onchecked = (e, value, variationName, variationPrice, varationtype, allow, ID) => {


    if (!e.target.checked) {
      var flag = false
      for (var i = 0; i < allowedvaration.length; i++) {
        if (allowedvaration[i].type === varationtype) {
          console.log(allowedvaration.selected)
          allowedvaration[i].selected = allowedvaration[i].selected - 1;
          flag = true;
          console.log(allowedvaration.selected)
        }

      }


    }
    else if (e.target.checked) {
      var flag = false

      for (var b = 0; b < allowedvaration.length; b++) {

        if (allowedvaration[b].type === varationtype) {
          allowedvaration[b].selected = allowedvaration[b].selected + 1;



          flag = true;
        }


      }
      if (!flag) {

        setallowedvaration([...allowedvaration, { selected: 1, allowed: allow, type: varationtype }]);



      }

      setprice(price + variationPrice)
      const list = [...dishvariation];
      const { name } = e.target;
      list[index][name] = value;
      list[index]['variationID'] = ID
      list[index]['variation_Name'] = variationName
      list[index]['variation_Type'] = varationtype
      setdishvariation(list);
      setindex(index + 1)
      setdishvariation([...dishvariation, { variationID: "", variation_Name: "", variation_Type: "" }]);
    }

  };



  const hanldevariations = (vari, e) => {
    console.log('HelloFav')
    if (vari.length === 0) {
      onSubmit(e)
    }
    else {
      if (showvaration) {
        setshowvaration(false)
      }
      else {
        setshowvaration(true)
      }
    }

  }


  if (fav === Dish_id) {
    console.log('HelloFav2', fav)
    hanldevariations(variations)
    setfavdish()


  }
  const hanlddealsevariations = () => {

    if (dealvari) {

      setdealvari(false)
    }
    else {
      setOpen(true)
      setdealvari(true)
    }


  }




  // set dish Qty
  const check = (e) => {
    var count = 0;
    var flagg = true;
    for (var i = 0; i < variations.length; i++) {
      count = 0;

      for (var j = 0; j < variations[i].variation.length; j++) {

        if (document.getElementById(variations[i].variation[j].varation_Name + j).checked) {

          count++;


        }


      }
      if (count < variations[i].allowed) {
        flagg = false;

        setAlert(`Select at least ${variations[i].allowed} ${variations[i].varationtype}`, 'danger');

      }
    }

    if (flagg) {

      onSubmit(e)
    }
    else {
      setdishvariation(null)
      setcount(1)
      // setallowedvariation(0);
      setindex(0);
      setdishvariation([{ variationID: "", variation_Name: "", variation_Type: "" }]);

    }

  }

  //uncheck all

  const checkdeal = (e) => {

    if (qty > deals.length) {

      setwarning(`Select all dishes`);
    }
    else {
      setwarning(``)
      onSubmit(e)
      setOpen(false)
      emptycart()

    }
  }


  const onSubmit = (e) => {

    let vari = dishvariation;
    setdishvariation(null)
    e.preventDefault();
    setshowvaration(false)
    setupdate(false);
    if (Type === 'deal') {
      adddealproduct(formData, price, count, deals)
    }
    else {
      console.log(vari)
      addproduct(formData, price, count, vari)
    }
    setallowedvaration([{ selected: 0, allowed: 0, type: "" }])
    setcount(1)
    // setallowedvariation(0);
    setindex(0);
    setdishvariation([{ variationID: "", variationID: "", variation_Name: "" }]);
    setupdate(true)



  };
  // disable or enable checkbox

  function handlecheckbox(count, box, type, j) {
    // console.log(allowedvaration.length)
    //console.log(box)
    //console.log(type)

    for (let x = 0; x < allowedvaration.length; x++) {
      console.log('Start')
      console.log("x", x, " ", allowedvaration[x].type)

      if (allowedvaration[x].type === type && allowedvaration[x].selected === allowedvaration[x].allowed) {

        console.log('if condition')
        console.log(allowedvaration[x].selected, allowedvaration[x].allowed)
        if (!document.getElementById(box).checked) {

          return true

        }
        else if (document.getElementById(box).checked) {

          return false

        }
      }
      else if (allowedvaration[x].selected < allowedvaration[x].allowed) {
        console.log('else condition')
        return false
      }



    }


    //enable check box


  }




  return update ? (
    <Fragment>

      <div className="item1C" >
        {//show varations option on click
          showvaration ? (
            <Fragment >
              <div className="rowV">
                {variations === undefined ? '' : (

                  variations.map((variations, j) => (
                    <Fragment>
                      <div className="columnV">
                        <h4>Choose {variations.allowed} {variations.varationtype}</h4>

                        {variations === undefined ? '' : (

                          variations.variation.map((variation, i) => (<Fragment>

                            <div className='ck-button'>
                              <label >
                                <input type="checkbox" name='variationID' key={i} id={variation.varation_Name + i}
                                  defaultChecked={false} disabled={handlecheckbox(variations.allowed, variation.varation_Name + i, variations.varationtype, j)}
                                  onClick={(e) => (setselectvaration(true), onchecked(e, variation.Varation_id, variation.varation_Name, variation.variation_Price, variations.varationtype, variations.allowed, variation.varation_Id))} />

                                <span >{variation.varation_Name} £ {variation.variation_Price}</span>
                              </label>
                            </div>

                          </Fragment>)))}
                      </div>
                    </Fragment>
                  )))}

                <Fragment><input type='submit' className='buttonAA' value='Add to order ' onClick={(e) => (check(e))} /></Fragment>
              </div>
            </Fragment>
          ) : null}


      </div>


      {Type === 'deal' ? (<Fragment>

        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="grid-containerpop">

            <a className="close" onClick={(e) => (setOpen(false), emptycart())}>
              &times;
            </a>
            <div className="item3C">

              <Cart />
              <p className='error-msg'>{warning}</p>
              <input type='submit' className='buttonAAPop' value='Add to order ' onClick={(e) => (checkdeal(e))} />
            </div>


            {dealvari ? (
              <Dealsdishes id={Dish_id} />
            ) : ('')}

          </div>

        </Popup>











        <div className="item2C" >

          <button
            className='buttonA' onClick={(e) => hanlddealsevariations(variations, e)} >
            <div className='infoicon'>
              <i className="fas fa-info" onClick={(e) => setOpen2(true)} ></i>
            </div>  <p onClick={(e) => hanlddealsevariations(variations, e)}>{Dish_Name}</p>
          </button>{' '}

          <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal}>


            <a className="close" onClick={(e) => (setOpen2(false))}>
              &times;
            </a>
            <div className='grid-container-infoUM'>
              <div className='grid-itemUM-info1'>
                <div className='ingredient_tital'>
                  <h4>Description</h4>
                </div>
                <div className='dish_des_info'>
                  <p >{Dish_Description}</p>
                </div>
              </div>
              <div className='grid-itemUM-info1'>
                <div className='ingredient_tital'>
                  <h4>Ingredients</h4>
                </div>
                <div className='dish_des_info'>
                  <p>{ingredients}</p>

                </div>

              </div>
              <div className='grid-itemUM-info1'>
                <div className='ingredient_tital'>
                  <h4>Calories </h4>
                </div>
                <div className='dish_des_info'>
                  <p>{calories}</p>
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </Fragment>) : (<Fragment>

        <div className="item2C" >

          <button
            className='buttonA'>
            <div className='infoicon'>
              <i className="fas fa-info" onClick={(e) => setOpen2(true)} ></i>
            </div>  <p onClick={(e) => hanldevariations(variations, e)}>{Dish_Name} </p>
          </button>{' '}

          <Popup open={open2} className="popup-content2" closeOnDocumentClick onClose={closeModal}>


            <a className="close" onClick={(e) => (setOpen2(false))}>
              &times;
            </a>
            <div className='grid-container-infoUM'>
              <div className='grid-itemUM-info1'>
                <div className='ingredient_tital'>
                  <h4>Description</h4>
                </div>
                <div className='dish_des_info'>
                  <p >{Dish_Description}</p>
                </div>
              </div>
              <div className='grid-itemUM-info1'>
                <div className='ingredient_tital'>
                  <h4>Ingredients</h4>
                </div>
                <div className='dish_des_info'>
                  <p>{ingredients}</p>

                </div>

              </div>
              <div className='grid-itemUM-info1'>
                <div className='ingredient_tital'>
                  <h4>Calories </h4>
                </div>
                <div className='dish_des_info'>
                  <p>{calories}</p>
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </Fragment>)
      }



    </Fragment>
  ) : null
};

AlldishesUIMOwner.propTypes = {
  auth: PropTypes.object.isRequired,
  addimage: PropTypes.func.isRequired,
  setfavdish: PropTypes.func.isRequired,
  getvariation: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  emptycart: PropTypes.func.isRequired,
  addproduct: PropTypes.func.isRequired,
  adddealproduct: PropTypes.func.isRequired,
  dealscart: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dealscart: state.dealscart,
  products: state.products,
});

export default connect(mapStateToProps, { setAlert, adddealproduct, setfavdish, emptycart, addimage, getvariation, addproduct })(AlldishesUIMOwner);