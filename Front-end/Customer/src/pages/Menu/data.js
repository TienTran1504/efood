
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
      title: 'bún bò huế',
      category: 'Bữa sáng',
      price: 40000,
      // img: 'item-1.jpeg',
      img: img,
      desc: 5,
    },
    {
      id: 2,
      title: 'Bánh mì thịt',
      category: 'Bữa trưa',
      price: 50000,
      // img: 'item-2.jpeg',
      img: img2,

      desc: 4,
    },
    {
      id: 3,
      title: 'bún đậu nước mắm',
      category: 'Tráng miệng',
      price: 30000,
      // img: 'item-3.jpeg',
      img: img9,
      desc: 3.5,
    },
    {
      id: 4,
      title: 'Phở bò',
      category: 'Bữa sáng',
      price: 50000,
      // img: 'item-4.jpeg',
      img: img3,
      desc: 4.5,
    },
    {
      id: 5,
      title: 'egg attack',
      category: 'Bữa trưa',
      price: 30000,
      // img: 'item-5.jpeg',
      img: img4,
      desc: 4.5,
    },
    {
      id: 6,
      title: 'oreo dream',
      category: 'Tráng miệng',
      price: 20000,
      // img: 'item-6.jpeg',
      img: img5,
      desc: 5,
    },
    {
      id: 7,
      title: 'bacon overflow',
      category: 'Bữa sáng',
      price: 35000,
      // img: './images/item-7.jpeg',
      img: img6,
      desc: 4,
    },
    {
      id: 8,
      title: 'american classic',
      category: 'Bữa trưa',
      price: 42000,
      // img: './images/item-8.jpeg',
      img: img7,
      desc: 4.5,
    },
    {
      id: 9,
      title: 'quarantine buddy',
      category: 'Tráng miệng',
      price: 55000,
      // img: './images/item-9.jpeg',
      img: img8,
      desc: 5,
    },
    {
      id: 8,
      title: 'american classic',
      category: 'Bữa trưa',
      price: 42000,
      // img: './images/item-8.jpeg',
      img: img2,
      desc: 4,
    },
    {
      id: 9,
      title: 'american classic',
      category: 'Bữa trưa',
      price: 42000,
      // img: './images/item-8.jpeg',
      img: img6,
      desc: 3.5,
    },
    {
      id: 10,
      title: 'american classic',
      category: 'Bữa trưa',
      price: 42000,
      // img: './images/item-8.jpeg',
      img: img2,
      desc: 4.6,
    },
  ];
  export default menu;