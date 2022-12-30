import React, { useState } from "react";
import classes from "../ModelFood/ModelFood.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

const ModalFood = ({ setIsOpen, setData }) => {

  const [quantityNumber, setquantityNumber] = useState(1);
  const [isSent, setisSent] = useState(true);
  const usenavigate = useNavigate();

  function numberWithDot(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function IncreaseItem() {
    setquantityNumber(quantityNumber + 1);
  }

  function DecreaseItem() {
    setquantityNumber(quantityNumber - 1);
  }

  function AddFoodToCart() {
    setisSent(false);
    console.log(isSent);
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
      Authorization: tokenAuth,
    };
    const obj = {
      quantity: quantityNumber,
    }

    if(JSON.stringify(localStorage.getItem('token')).split('"').join('') === 'null'){
      setIsOpen(false);
      usenavigate('/login');
    }

    else{
      axios.post(`http://localhost:3000/api/v1/customer/cart/${setData._id}`, obj, { headers: headers }).then((res) => {
        setisSent(true);
        setIsOpen(false); 
        Swal.fire({
          title: 'Thêm thành công',
          icon: 'success',
          confirmButtonText: 'Hoàn tất',
          width: '50rem',
      });
      }).catch(error => {
        console.log("cc nè" + error);
        setIsOpen(false);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã có trong giỏ hàng!',
          width: '50rem',
      });
      })
    }
  }

  return (
    <>
      <div className={classes['darkBG']} onClick={() => setIsOpen(false)} />
      <div className={classes['centered']}>
        <div className={classes['modal']}>
          <div className={classes['modalHeader']}>
            <h5 className={classes['heading']}>THÊM MÓN ĂN VÀO GIỎ HÀNG</h5>
          </div>
          <div className={classes['modalHeader__infor']}>
            <div className={classes['modalHeader__wrapper']} >
              <ul className={classes['modalHeader__list']}>
                <li className={classes['modalHeader__list-item']}>
                  <h5>Tên món :</h5>
                  <span className={classes['modalHeader__list-descrp']}>{setData.name}</span>
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
      {
        (!isSent) ?
          <Backdrop style={{ zIndex: 1 }} className={classes.backdrop} open>
            <CircularProgress color="inherit" />
          </Backdrop>
          : ''
      }
    </>
  );
};

export default React.memo(ModalFood);