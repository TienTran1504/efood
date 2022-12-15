import Slider from '~/components/Layout/DefaultLayout/Slider';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { sliderMenuItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';
// import axios from 'axios';
// import items from './data';
import Categories from './Categories';
import './product_style.css';
import MenuSlider from '~/components/Layout/DefaultLayout/MenuSlider';
import ModalFood from '~/components/UiComponent/foodModel';

// const allCategories = ['all', ...new Set(items.map((item) => item.category))];

const headers = {
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkwYjU2MDU3MTczMWE0NGEyMzE3MTIiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzA1MTU4NTIsImV4cCI6MTY3MzEwNzg1Mn0.b99hXW1dgsejSAZhWfyhY_wXLjQcztF6r3GmealBLAU',
};





const MenuList = ({ items, handleClickAddToCart }) => {
    const itemPerPage = 12;
    const pages = [];

 

    for (let i = 0; i < items.length; ) {
        const onePage = [];
        for (let j = 0; j < itemPerPage && i < items.length; j++, i++) {
            onePage.push(items[i]);
        }
        pages.push(
            <div className="section-center" key={i}>
                {onePage.map((item) => {
                    const { id, title, image, rating, price } = item;
                    console.log("check");
                    return (
                        <article key={id} className="menu-item">
                            <img src={image} alt={title} className="photo" />
                            <div className="item-hover">
                                <button className='buttonAddItem' type='button' onClick={()=>handleClickAddToCart(item)}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="_icon" />
                                </button>
                                

                                <h4 className="price">{price} VND</h4>
                            </div>
                            <div className="item-info">
                                {/* <h4>{title}  </h4> */}
                                <div>
                                    <h4>{title}</h4>
                                </div>
                                <div>
                                    <p>
                                        {rating}
                                        <FontAwesomeIcon icon={faStar} style={{ color: 'orange' }} />
                                    </p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>,
        );
    }

    return (
        <>
            <MenuSlider pages={pages}></MenuSlider>;
        </>
    );
};


function Menu() {
    const [items, setItems] = useState([]);

    useEffect(()=>{

        axios
            .get(`http://localhost:3000/api/v1/foods`, {headers: headers})
            .then((res)=>{
                setItems(res.data.sortedFoods.map((item)=>({
                    id: item._id,
                    title: item.name,
                    image: item.image,
                    price: item.price,
                    rating: item.rating,
                    category: item.typeOf,
                })),
            );
            // setMenuItems(items);
            
            })
            .catch((error)=>{
                console.log(error);
            });

    }, []);



    const [menuItems, setMenuItems] = useState(items);
    const [activeCategory, setActiveCategory] = useState('');
    const categories = ['All','Món nước', 'Cơm', 'Đồ uống', 'Tráng miệng', 'Ăn vặt'];

    const filterItems = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setMenuItems(items);
            // while(menuItems.length()===0){
            //     setMenuItems(items);
            // }
            return;
        }
        const newItems = items.filter((item) => item.category === category);
        setMenuItems(newItems);
    };

    //comfirm dialog
    // const [dialogConfirm, setDialog] = useState(false);
    // const [idProduct, setIdProduct] = useState(null);
    // const handlShowDialogConfirm = (isLoading)=>{
    //     setDialog(isLoading);
    // }
    // const handleClickAddToCart = (itemId) => {
    //     handlShowDialogConfirm(true);
    //     setIdProduct(itemId);
    //     console.log("thanh cong");
    // };
    // const areUSureDelete = (choose) => {
    //     if(choose){     
    //         setDialog(false);
    //         // const newOrders = [];
    //         // console.log(111);
    //         // orders.forEach((order, index) => {
    //         //     if (order.orderId !== idProduct) newOrders.push(order);
    //         // });

    //         // setOrders(newOrders);
    //     }else{
    //         setDialog(false);

    //     }
    // };
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleShowModalFood = (isShow) =>{
        setIsOpen(isShow);
    }

    const handleClickAddToCart = (itemId) => {
            handleShowModalFood(true);
            setData(itemId);
            console.log("thanh cong");
        };
    
    return (
        <div>
            <Slider
                sliderPage={sliderMenuItems.sliderImage}
                height={sliderMenuItems.height}
                slogan={sliderMenuItems.slogan}
                link={sliderMenuItems.link}
            />

            <div className="body__container"  onLoad={()=>filterItems("All")}>
                <Categories categories={categories} activeCategory={activeCategory} filterItems={filterItems} />
                <MenuList 
                    items={menuItems} 
                    handleClickAddToCart={handleClickAddToCart}
                />
            </div>
            {/* {dialogConfirm && <DialogConfirm onDialog={areUSureDelete}/>} */}
            {isOpen && <ModalFood setData={data} setIsOpen={setIsOpen} />}
        </div>
    );
}

export default Menu;
