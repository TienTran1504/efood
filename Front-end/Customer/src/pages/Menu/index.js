import Slider from '~/components/Layout/DefaultLayout/Slider';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { sliderMenuItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from './Categories';
// import './product_style.css';
import MenuSlider from '~/components/Layout/DefaultLayout/MenuSlider';
import ModalFood from '~/components/UiComponent/foodModel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './styleMenu.module.scss';




const MenuList = ({ items, handleClickAddToCart }) => {
    const itemPerPage = 12;
    const pages = [];

    for (let i = 0; i < items.length;) {
        const onePage = [];
        for (let j = 0; j < itemPerPage && i < items.length; j++, i++) {
            onePage.push(items[i]);
        }
        pages.push(
            <div className={classes['section-center']} key={i}>
                {onePage.map((item) => {
                    const { id, title, image, rating, price } = item;
                    return (
                        <article key={id} className={classes['menu-item']}>
                            <img src={image} alt={title} className={classes['photo']} />
                            <div className={classes['item-hover']}>
                                <button
                                    className={classes['buttonAddItem']}
                                    type="button"
                                    onClick={() => handleClickAddToCart(item)}
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} className={classes['_icon']} />
                                </button>

                                <h4 className={classes['price']}>{price} VND</h4>
                            </div>
                            <div className={classes['item-info']}>
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
    const [items, setItems] = useState([]);// khai baos danh sach food
    const [checkOpen, setCheckOpen] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const categories = ['All', 'Món nước', 'Cơm', 'Đồ uống', 'Tráng miệng', 'Ăn vặt', 'Giảm dần'];
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/auth/foods`)
            .then((res) => {
                var newItems = [];
                res.data.sortedFoods.forEach((item, index) => {

                    var newItem = {
                        id: item._id,
                        title: item.name,
                        image: item.image,
                        price: item.price,
                        rating: item.rating,
                        category: item.typeOf,
                    };
                    newItems = [...newItems, newItem];
                });



                setItems(newItems);
                if (checkOpen) {
                    setMenuItems(newItems);

                }
                localStorage.setItem('listFoods', JSON.stringify(newItems));
                setCheckOpen(false);

            })
            .catch((error) => {
                console.log(error);
            });
        //lưu vào storage 

    }, [items]);




    const [activeCategory, setActiveCategory] = useState('');



    const filterItems = (category, isSorted) => {
        setIsFirstLoad(false);
        setActiveCategory(category);
        if (category === 'All') {
            setMenuItems(items);
            return;
        } else if (category === 'Giảm dần') {
            const newItems = [...items].sort((a, b) => b.price - a.price);
            setMenuItems(newItems);
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
    };

    return (
        <div>
            <Slider
                sliderPage={sliderMenuItems.sliderImage}
                height={sliderMenuItems.height}
                slogan={sliderMenuItems.slogan}
            />

            <div className={classes['body__container']}>
                <Categories categories={categories} activeCategory={activeCategory} filterItems={filterItems} isFirstLoad={isFirstLoad} />
                <MenuList items={menuItems} key={1} handleClickAddToCart={handleClickAddToCart} />
            </div>

            {isOpen && <ModalFood setData={data} setIsOpen={setIsOpen} />}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={checkOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Menu;
