import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import axios from 'axios';

const token = JSON.stringify(localStorage.getItem('token')).split('"').join('');
const tokenAuth = 'Bearer ' + token;
const headers = {
    Authorization: tokenAuth,
};



function checkRating(ratingValue){
  var message;
  switch (ratingValue) {
    case 1:
      message = "cảm ơn đánh giá cửa bạn"
      break;
  
    default:
      message = "chua danh gia??"
      break;
  }


  return (
    <div>{message}</div>
  )
}

function RatingMessage( Rate ){
  const messages = {
    "1": "Oh, Xin lỗi, bạn hẳn đã trải qua điều tồi tệ :((",
    "2": "Chúng tôi sẽ sớm cải thiện.",
    "3": "Cảm ơn đánh giá của bạn, hi vọng bạn để lại đóng góp!",
    "4": "Cảm ơn bạn !!!", 
    "5": "Cảm ơn đánh giá của bạn"
  };
  
  // let rating = props.rating;
  
  return(
      <div style={{display: "flex", flexDirection:"column", height:"60px", marginBottom:"5px"}}>
          <span>Bạn đã đánh giá {Rate} sao{Rate > 1 ? ' @.@' : ''}</span>
          <div>{ messages[Rate] }</div>
      </div>
  );
}


export default function Rate({product, onDialog}) {
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    axios.patch(
      `http://localhost:3000/api/v1/foods/rating/${product.id}`,
      { headers: headers },
    );
    RatingMessage(rate)
    setRating(rate)
    // Some logic
    
  }

  return (
    <div style={{    
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.5)"
    }}>

      <div style={{
        backgroundColor:"#DDDDDD", 
        width: "500px", height: "200px", 
        textAlign: "center", 
        borderRadius: "20px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        lineHeight: "30px",
        padding: "10px 10px 60px 10px",
        fontSize: "20px"
        }}> 
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          size={50}
          label
          transition
          fillColor='orange'
          emptyColor='gray'
          className='foo' // Will remove the inline style if applied
        />
        {RatingMessage(rating)}
        <div style={{position: "relative"}}>
          <button onClick={()=>onDialog(true)}  style={{backgroundColor: "#C0C0C0", padding: "10px 50px", marginRight:"10px",borderRadius:"5px", color:"black", cursor:"pointer" }}>Xác nhận</button>
          <button onClick={()=>onDialog(false)} style={{backgroundColor: "#C0C0C0",padding: "10px 50px", borderRadius:"5px", color: "black", cursor:"pointer"}}>Bỏ qua</button>
        </div>
      </div>
    </div>
  )
}
