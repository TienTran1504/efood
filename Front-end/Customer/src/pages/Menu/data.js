
import img from './images/item1.png'; //xài tạm
import img2 from './images/item3.jpeg'; //xài tạm
import img3 from './images/item4.jpeg'; //xài tạm
import img4 from './images/item5.jpeg'; //xài tạm
import img5 from './images/item6.jpeg'; //xài tạm
import img6 from './images/item7.jpeg'; //xài tạm
import img7 from './images/item8.jpeg'; //xài tạm
import img8 from './images/item9.jpeg'; //xài tạm
import img9 from './images/item10.jpeg'; //xài tạm


// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const img = importAll(require.context('./images', false, /\.(png|jp?g|svg)$/));

//hàm viết để import nhiều ảnh từ folder thành array -- đang lỗi


const menu = [
    {
      id: 1,
      title: 'buttermilk pancakes',
      category: 'Bữa sáng',
      price: 40.000,
      // img: 'item-1.jpeg',
      img: img,
      desc: `Mô tả`,
    },
    {
      id: 2,
      title: 'diner double',
      category: 'Bữa trưa',
      price: 50.000,
      // img: 'item-2.jpeg',
      img: img2,
      desc: `Mô tả`,
    },
    {
      id: 3,
      title: 'godzilla milkshake',
      category: 'Tráng miệng',
      price: 30.000,

      img: img9,
      desc: `Mô tả`,
    },
    {
      id: 4,
      title: 'country delight',
      category: 'Bữa sáng',
      price: 50.000,
      img: img3,
      desc: `Mô tả`,
    },
    {
      id: 5,
      title: 'egg attack',
      category: 'Bữa trưa',
      price: 30.000,
      img: img4,
      desc: `Mô tả`,
    },
    {
      id: 6,
      title: 'oreo dream',
      category: 'Tráng miệng',
      price: 20.000,
      img: img5,
      desc: `Mô tả`,
    },
    {
      id: 7,
      title: 'bacon overflow',
      category: 'Bữa sáng',
      price: 35.000,
      img: img6,
      desc: `Mô tả`,
    },
    {
      id: 8,
      title: 'american classic',
      category: 'Bữa trưa',
      price: 42.000,
      img: img7,
      desc: `Mô tả`,
    },
    {
      id: 9,
      title: 'quarantine buddy',
      category: 'Tráng miệng',
      price: 55.000,
      img: img8,
      desc: `Mô tả`,
    },
  ];
  export default menu;