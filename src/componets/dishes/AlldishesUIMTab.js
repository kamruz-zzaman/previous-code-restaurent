import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getvariation } from '../../actions/variations'
import { connect } from 'react-redux';
import { getuserdeal } from '../../actions/deals';
import { addimage } from '../../actions/dish'
import { addproduct, adddealproduct, setfavdish, adduserdealproduct } from '../../actions/shoppingcart'
import { emptycart } from '../../actions/dealscart'
import { setAlert } from '../../actions/alert';
import Popup from 'reactjs-popup';
import configData from "../../config.json";
import 'reactjs-popup/dist/index.css';
import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
//all dishes show UI in owner dashboard
const AlldishesUIMOwner = ({
  auth,
  dishes: { Dish_id, Dish_Name, Dish_Price, Dish_Description, image, variations, Type, ingredients, calories },
  id,
  setfavdish,
  addproduct,
  getuserdeal,
  emptycart,
  adddealproduct,
  setAlert,
  dealscart: { deals, subtotal, loading, editorder, qty },
  products: { fav, favloading }

}) => {

  const [showvaration, setshowvaration] = useState(false);
  const [showvarationD, setshowvarationD] = useState(0);
  const [DishIDcheck, setDishIDcheck] = useState(false)
  const [count, setcount] = useState(1);
  const [price, setprice] = useState(Dish_Price);
  const [className, setclassName] = useState('grid-container-infoUM2');
  const [allowedvaration, setallowedvaration] = useState([{}]);
  const [allowedvariation, setallowedvariation] = useState(0);
  const [initial, setinitial] = useState(false);
  const [selectvaration, setselectvaration] = useState(false);
  const [dealdish, setdealdish] = useState({});
  const [index, setindex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const [dealvari, setdealvari] = useState(false);
  const [update, setupdate] = useState(true);
  const closeModal2 = () => setOpen2(false);
  const [dishvariation, setdishvariation] = useState([{ variationID: "", variation_Name: "", variation_Type: "", Dish_Name: "" }]);
  const [formData] = useState({
    DishID: Dish_id,
    Name: Dish_Name,
    Description: Dish_Description,
    variation: Dish_Description,
    Qty: count,
    Dish_Price: price,
    img: image,
    Type: Type
  });
  useEffect(() => {

    if (initial === true) {


      setinitial(false)



    }
    else {

    }

  }, [initial]);

  useEffect(() => {

    if (Type === 'deal') {
      getuserdeal()
    }

  }, [getuserdeal]);

  //set allowedvaration on checked or unchecked
  const onchecked = (e, value, variationName, variationPrice, varationtype, allow, box, dish, deald) => {


    if (!e.target.checked) {

      var flag = false
      for (var i = 0; i < allowedvaration.length; i++) {
        if (allowedvaration[i].type === varationtype) {
          allowedvaration[i].selected = allowedvaration[i].selected - 1;
          flag = true;
        }

      }
      setselectvaration(true)


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
      setselectvaration(false)
      list[index][name] = value;
      list[index]['variation_Name'] = variationName
      list[index]['variation_Type'] = varationtype
      list[index]['Dish_Name'] = dish
      setdishvariation(list);
      setindex(index + 1)
      setdishvariation([...dishvariation, { variationID: "", variation_Name: "", variation_Type: "", Dish_Name: "" }]);
      setdealdish(deald)

    }
  };





  // set dish Qty
  const handleminus = () => {
    if (count > 1) {
      setcount(count - 1)
    }

  }

  //uncheck all


  const openpopup = (e) => {

    if (variations.length > 0) {
      if (variations.length === 1) {
        setclassName('grid-container-infoUM2V1')
      }
      else {
        setclassName('grid-container-infoUM2')
      }
    }
    else {
      setclassName('grid-container-infoUM22')
    }
    setOpen(true)




  }

  const onSubmit = (e) => {

    //setinitial(true)

    // e.preventDefault();
    // if(Type==='deal'){
    //   adduserdealproduct(formData,price,count,dishvariation, dealdish)
    // }
    // else{
    //  addproduct(formData,price,count,dishvariation)
    //  }
    //  setcount(1)
    // setallowedvariation(0);
    // setindex(0);
    //setdishvariation([{ variationID: "", variation_Name: "", variation_Type: "" , Dish_Name:""}]);
    // setOpen(false)


    let vari = dishvariation;
    setdishvariation(null)
    e.preventDefault();
    setshowvaration(false)
    setupdate(false);
    if (Type === 'deal') {
      adduserdealproduct(formData, price, count, dishvariation, dealdish)
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
    setOpen(false)

  };

  // disable or enable checkbox
  function handlecheckbox(count, box, type, j) {


    for (let x = 0; x < allowedvaration.length; x++) {
      // console.log("x",x, " ", allowedvaration[x])
      //console.log(allowedvaration[x].selected< allowedvaration[x].allowed)

      if (allowedvaration[x].type === type && allowedvaration[x].selected === allowedvaration[x].allowed) {

        // console.log('if condition ')
        // console.log(allowedvaration[x].selected,allowedvaration[x].allowed)
        if (!document.getElementById(box).checked) {
          //  console.log(document.getElementById(box))

          return true

        }
        else if (document.getElementById(box).checked) {
          // console.log(document.getElementById(box))

          return false

        }

      }
      else if (allowedvaration[x].type === type && allowedvaration[x].selected < allowedvaration[x].allowed) {

        return false
      }

    }

    return false
  }

  const handdelvariations = (id, e) => {
    setDishIDcheck(id)

  }

  return update ? (
    <Fragment>
      <div className='cardtabmenu ' onClick={(e) => openpopup(e)} >
        <p className='dishtabname'>{Dish_Name} {'  '} <i className="fas fa-info-circle" onClick={(e) => openpopup(e)} ></i> </p>
        <p className='pricetab'>£{Dish_Price}</p>
        <p>{Dish_Description}</p>


        <Popup open={open} closeOnDocumentClick onClose={closeModal}>


          <a className="close" onClick={(e) => (setOpen(false))}>
            &times;
          </a>
          <div className={className}>
            {!image ? (<img
              className='img2'
              src={configData.SERVER_URL + '/public/f5a38c06-8301-427d-bdec-0fba15540a54-dc2781ef-1782-4efb-8918-e4aa4b1f4efb-image-coming-soon2.png'}
              alt='user'
              onClick={(e) => setOpen2(true)} onClick={(e) => openpopup(true)} />) : (<img
                className='img2'
                src={configData.SERVER_URL + image}
                alt='user'
                onClick={(e) => setOpen2(true)} onClick={(e) => openpopup(true)} />)}
            <div className='form-grouppx'>
              <h3> <i className="fas fa-minus" onClick={(e) => handleminus()} ></i> {count}  <i className="fas fa-plus" onClick={(e) => setcount(count + 1)}></i></h3>
            </div>
            {showvarationD ? '' : (

              variations.map((variations, j) => (
                <Fragment>
                  <button className="btnnnOO" onClick={(e) => handdelvariations(Dish_id + j, e)} >Choose {variations.allowed} {variations.varationtype}</button>

                  <Fragment> {showvaration ? '' : (

                    variations.variation.map((variation, i) => (<Fragment>
                      <div className='form-group'>
                        <label className="containerD">{variation.varation_Name}  £ {variation.variation_Price}

                          <input type="checkbox" name='variationID' key={i} id={variation.varation_Name + i} defaultChecked={false} disabled={handlecheckbox(variations.allowed, variation.varation_Name + i, variations.varationtype, j)}
                            onClick={(e) => (onchecked(e, variation.Varation_id, variation.varation_Name, variation.variation_Price, variations.varationtype, variations.allowed, variation.varation_Name + i))} />

                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </Fragment>)))}  </Fragment>

                </Fragment>
              )))}




          </div>
          <Fragment><input type='submit' className='btnnnOO btn-primary' value='Add to cart ' onClick={(e) => (onSubmit(e))} /></Fragment>
        </Popup>
      </div>
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
  getuserdeal: PropTypes.func.isRequired,
  adduserdealproduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dealscart: state.dealscart,
  products: state.products,
});

export default connect(mapStateToProps, { setAlert, adduserdealproduct, getuserdeal, adddealproduct, setfavdish, emptycart, addimage, getvariation, addproduct })(AlldishesUIMOwner);