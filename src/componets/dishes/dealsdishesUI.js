import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getvariation } from '../../actions/variations'
import { connect } from 'react-redux';
import { addimage } from '../../actions/dish'
import { addproduct } from '../../actions/dealscart'
import { setAlert } from '../../actions/alert';
import 'reactjs-popup/dist/index.css';

//all dishes show UI in owner dashboard
const DealdishesUI = ({
  auth,
  dishes: { Dish_id, Dish_Name, Dish_Price, Dish_Description, image, variations, Type },
  id,
  addproduct,
  setAlert,
  total,
  length,


}) => {

  const [showvaration, setshowvaration] = useState(false);

  const [update, setupdate] = useState(true);
  const [count, setcount] = useState(1);
  const [price] = useState(Dish_Price);
  const [warning, setwarning] = useState('');
  const [allowedvaration, setallowedvaration] = useState([{ selected: 0, allowed: 0, type: "" }]);

  const [index, setindex] = useState(0);


  const [setselectvaration] = useState(false);
  const [dishvariation, setdishvariation] = useState([{ variationID: "", variation_Name: "", variation_Type: "" }]);
  const [dishdata] = useState({
    Key: 0,
    DishID: Dish_id,
    Name: Dish_Name,
    variation: Dish_Description,
    Total: length
  });


  console.log('length: ', length)

  const onchecked = (e, value, variationName, varationtype, allow) => {


    if (!e.target.checked) {
      var flag = false
      for (var i = 0; i < allowedvaration.length; i++) {
        if (allowedvaration[i].type === varationtype) {
          allowedvaration[i].selected = allowedvaration[i].selected - 1;
          flag = true;
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

      //setprice(price+variationPrice)
      const list = [...dishvariation];
      const { name } = e.target;

      list[index][name] = value;
      list[index]['variation_Name'] = variationName
      list[index]['variation_Type'] = varationtype
      setdishvariation(list);
      setindex(index + 1)
      setdishvariation([...dishvariation, { variationID: "", variation_Name: "", variation_Type: "" }]);
    }

  };



  const hanldevariations = (vari, e) => {
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

        setwarning(`Select at least ${variations[i].allowed} ${variations[i].varationtype}`);

      }
    }

    if (flagg) {
      setwarning('')
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




  const onSubmit = (e) => {

    let vari = dishvariation;
    setdishvariation(null)
    e.preventDefault();
    setshowvaration(false)
    setupdate(false);
    addproduct(dishdata, price, count, vari, Dish_Name)
    setcount(1);
    setallowedvaration([{ selected: 0, allowed: 0, type: "" }])
    //setallowedvariation(0);
    setindex(0);
    setdishvariation([{ variationID: "", variation_Name: "", variation_Type: "" }]);
    setupdate(true)



  };
  // disable or enable checkbox

  function handlecheckbox(count, box, type, j) {
    // console.log(allowedvaration.length)
    //console.log(box)
    //console.log(type)
    for (let x = 0; x < allowedvaration.length; x++) {
      // console.log("x",x, " ", allowedvaration.length)

    }
    for (let x = 0; x < allowedvaration.length; x++) {
      console.log("x", x, " ", allowedvaration[x].type)

      if (allowedvaration[x].type === type && allowedvaration[x].selected === allowedvaration[x].allowed) {


        if (!document.getElementById(box).checked) {

          return true

        }
        else if (document.getElementById(box).checked) {

          return false

        }
      }
      else if (allowedvaration[x].selected < allowedvaration[x].allowed) {
        return false
      }



    }


    //enable check box


  }




  return update ? (
    <Fragment>

      <div className="item1Cpop" >
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
                                  onClick={(e) => (setselectvaration(true), onchecked(e, variation.Varation_id, variation.varation_Name, variation.variation_Price, variations.varationtype, variations.allowed))} />

                                <span >{variation.varation_Name}</span>
                              </label>
                            </div>

                          </Fragment>)))}
                      </div>
                    </Fragment>
                  )))}


                <p className='error-msg'>{warning}</p>

                <Fragment><input type='submit' className='buttonAA' value='Update Cart ' onClick={(e) => (check(e))} /></Fragment>
              </div>
            </Fragment>
          ) : null}


      </div>


      <div className="item2Cpop " >

        <button
          className='buttonAPop' onClick={(e) => hanldevariations(variations, e)} >
          {Dish_Name}
        </button>{' '}
      </div>




    </Fragment>
  ) : null
};

DealdishesUI.propTypes = {
  auth: PropTypes.object.isRequired,
  addimage: PropTypes.func.isRequired,
  getvariation: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  addproduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.products,

});

export default connect(mapStateToProps, { setAlert, addimage, getvariation, addproduct })(DealdishesUI);