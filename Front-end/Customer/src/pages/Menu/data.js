
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
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: 'diner double',
      category: 'Bữa trưa',
      price: 50.000,
      // img: 'item-2.jpeg',
      img: img2,

      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: 'godzilla milkshake',
      category: 'Tráng miệng',
      price: 30.000,
      // img: 'item-3.jpeg',
      img: img9,
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: 'country delight',
      category: 'Bữa sáng',
      price: 50.000,
      // img: 'item-4.jpeg',
      img: img3,
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: 'egg attack',
      category: 'Bữa trưa',
      price: 30.000,
      // img: 'item-5.jpeg',
      img: img4,
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: 'oreo dream',
      category: 'Tráng miệng',
      price: 20.000,
      // img: 'item-6.jpeg',
      img: img5,
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: 'bacon overflow',
      category: 'Bữa sáng',
      price: 35.000,
      // img: './images/item-7.jpeg',
      img: img6,
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: 'american classic',
      category: 'Bữa trưa',
      price: 42.000,
      // img: './images/item-8.jpeg',
      img: img7,
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: 'quarantine buddy',
      category: 'Tráng miệng',
      price: 55.000,
      // img: './images/item-9.jpeg',
      img: img8,
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
  ];
  export default menu;