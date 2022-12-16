import React, { useState } from "react";
import classes from "./ModelFood.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import {
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

const ModalFood = ({ setIsOpen, setData }) => {

const [quantityNumber, setquantityNumber] = useState(1);

function numberWithDot(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function IncreaseItem(){
  setquantityNumber(quantityNumber + 1);
}

function DecreaseItem(){
  setquantityNumber(quantityNumber - 1);
}

function AddFoodToCart(){
  setIsOpen(false);
  const headers ={ 'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgwN2ViNjllODIxYTMyMDA1N2ViZDAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzAwODU1NTQsImV4cCI6MTY3MjY3NzU1NH0.CbfYvU3dRalURXHYfX8sFifDyINaJHe_iJZ3X1SxjNc"};
        const obj = {
        quantity: quantityNumber,
       }
       axios.post(`http://localhost:3000/api/v1/customer/cart/${setData.id}`, obj, {headers : headers}).then((res) => {
        console.log(res);
      }).catch(error => {
        console.log(error)
      })
}

  return (
    <>
      <div className={classes['darkBG']} onClick={() => setIsOpen(false)} />
      <div className={classes['centered']}>
        <div className={classes['modal']}>
          <div className={classes['modalHeader']}>
          <h5 className={classes['heading']}>Add Food</h5>
          </div>
          <div className={classes['modalHeader__infor']}>
            <div className={classes['modalHeader__wrapper']} >
                <ul className={classes['modalHeader__list']}>
                    <li className={classes['modalHeader__list-item']}>
                        <h5>Tên món :</h5>
                        <span className={classes['modalHeader__list-descrp']}>{setData.title}</span>
                    </li>
                    <li className={classes['modalHeader__list-item']}>
                        <h5>Giá&emsp;&emsp;&ensp; :</h5>
                        <span className={classes['modalHeader__list-descrp']}>{numberWithDot(setData.price * quantityNumber)}đ</span>
                    </li>
                    <li className={classes['modalHeader__list-item']}>
                        <h5>Số lượng&nbsp;:</h5>
                        <div className={classes['item-quantity']}>
                        {quantityNumber > 1 && <button id={classes['btn--remove']} onClick={DecreaseItem}> <FontAwesomeIcon icon={faMinusCircle} /></button>}
                        {quantityNumber <= 1 && <button id={classes['btn--remove--disabled']}> <FontAwesomeIcon icon={faMinusCircle} /></button>}
                            <div id={classes['current-quantity']}>
                                {quantityNumber}
                            </div>
                            <button id={classes['btn--add']} onClick={IncreaseItem}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={classes['modalHeader__img']}>
                <div className={classes['img__wrapper']}>
                    <img src={setData.image} alt="none"></img>
                </div>
            </div>
            
         </div>
          
          <button className={classes['closeBtn']} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={classes['modalActions']}>
            <div className={classes['actionsContainer']}>
              <button className={classes['addBtn']} onClick={AddFoodToCart}>
                Add to Cart
              </button>
              <button
                className={classes['cancelBtn']}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFood;