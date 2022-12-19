import Slider from '~/components/Layout/DefaultLayout/Slider';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { sliderMenuItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import axios from 'axios';
// import items from './data';
import Categories from './Categories';
import './product_style.css';
import MenuSlider from '~/components/Layout/DefaultLayout/MenuSlider';
import ModalFood from '~/components/UiComponent/foodModel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



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
                    return (
                        <article key={id} className="menu-item">
                            <img src={image} alt={title} className="photo" />
                            <div className="item-hover">
                                <button
                                    className="buttonAddItem"
                                    type="button"
                                    onClick={() => handleClickAddToCart(item)}
                                >
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
    const [checkOpen, setCheckOpen] = useState(true);
    const [menuItems, setMenuItems] = useState(items);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/foods`, { headers: headers })
            .then((res) => {
                setItems(
                    res.data.sortedFoods.map((item) => ({
                        id: item._id,
                        title: item.name,
                        image: item.image,
                        price: item.price,
                        rating: item.rating,
                        category: item.typeOf,
                    })),
                );
                setCheckOpen(false)
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    
    const [activeCategory, setActiveCategory] = useState('');
    const categories = ['All', 'Món nước', 'Cơm', 'Đồ uống', 'Tráng miệng', 'Ăn vặt'];

    const filterItems = (category='All') => {
        console.log(category)
        setActiveCategory(category);
        if (category === 'All') {
            setMenuItems(items);
            return;
        }
        const newItems = items.filter((item) => item.category === category);
        setMenuItems(newItems);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleShowModalFood = (isShow) => {
        setIsOpen(isShow);
    };

    const handleClickAddToCart = (itemId) => {
        handleShowModalFood(true);
        setData(itemId);
        console.log('thanh cong');
    };

    return (
        <div>
            <Slider
                sliderPage={sliderMenuItems.sliderImage}
                height={sliderMenuItems.height}
                slogan={sliderMenuItems.slogan}
            />

            <div className="body__container">
                <Categories categories={categories} activeCategory={activeCategory} filterItems={filterItems} />
                <MenuList items={menuItems} handleClickAddToCart={handleClickAddToCart} />
            </div>

            {isOpen && <ModalFood setData={data} setIsOpen={setIsOpen} />}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={checkOpen}>
                <CircularProgress color="inherit" /> 
                {/* {setMenuItems(items)} */}
            </Backdrop>
        </div>
    );
}

export default Menu;
