import React, { Fragment, useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { getreviewtagsbystar,addtag } from '../../actions/review';
import PropTypes from 'prop-types';
import Star from './Star';

//Add dish Form
const Addreviewtag = ({setAlert, match,getreviewtagsbystar,addtag ,review: { reviewtag, loading2 }}) => {
  useEffect(() => {
    if(!loading2 && loadtags){
    const newTags = [ ...reviewtag];
    settags([])
    settags(newTags );
    setloadtags(false)
    }
  },);

 
    const [tags,settags] = useState([
    ]);
    
    const [gradeIndex, setGradeIndex] = useState();
    const [loadtags, setloadtags] = useState(false);
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };
   
    const changeGradeIndex = async( index ) => {
        console.log(gradeIndex)
        setGradeIndex(index);
       setloadtags(true)
      getreviewtagsbystar(match.params.rid,index+1)
       
       
       
    }

  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);
    settags(newTags );
  }

  const inputKeyDown = (e) => {
    const val = e.target.value;
    console.log(e.target)
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      settags([...tags, val]);
     e.target.value=null
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    
    }
  }

 const  onSubmit = (e) => {
    e.preventDefault();
   // setAlert('Review Tag Added', 'success');
    let reviewvalue=tags
    addtag(reviewvalue,match.params.rid,gradeIndex+1)
  }

  
 
    return (
      <div className='containerFg'>
         <h1 className='large text-primary'>Add Review Tag </h1>
         <div className='gridd-containerr'>
        
            <div className='gridd-itemm'>
            <div className='form'>
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
              
                        <Star 
                            index={index} 
                            key={grade} 
                            changeGradeIndex={(e) =>changeGradeIndex(index)}
                            style={ gradeIndex >= index ? activeStar : {}}
                        />
                    ))
                }
            </div>
      <div className="input-tag">
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => { removeTag(i); }}>+</button>
            </li>
          ))}
          <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} /></li>
        </ul>
        <button  className='btn btn-primary-submit' onClick={(e) =>{onSubmit(e);}}>Submit</button>
      </div>
      </div>
      </div>
      </div>
      </div>
   
   
  );
};

Addreviewtag.prototype = {
  setAlert: PropTypes.func.isRequired,
  getreviewtagsbystar: PropTypes.func.isRequired,
  addtag:PropTypes.func.isRequired,
    review: PropTypes.object.isRequired,

};
const mapStateToprops = (state) => ({
  review: state.review,
});
export default connect(mapStateToprops, { setAlert,getreviewtagsbystar,addtag })(Addreviewtag);

