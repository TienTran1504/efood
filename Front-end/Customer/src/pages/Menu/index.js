import Slider from '~/components/Layout/DefaultLayout/Slider';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { sliderMenuItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// import axios from 'axios';
import { useState } from 'react';
import items from './data';
import Categories from './Categories';
import './product_style.css';
import MenuSlider from '~/components/Layout/DefaultLayout/MenuSlider';

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

const MenuList = ({ items }) => {
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
                    const { id, title, img, desc, price } = item;
                    return (
                        <article key={id} className="menu-item">
                            <img src={img} alt={title} className="photo" />
                            <div className="item-hover">
                                <FontAwesomeIcon icon={faShoppingCart} className="_icon" />

                                <h4 className="price">{price} VND</h4>
                            </div>
                            <div className="item-info">
                                {/* <h4>{title}  </h4> */}
                                <div>
                                    <h4>{title}</h4>
                                </div>
                                <div>
                                    <p>
                                        {desc}
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
    const [menuItems, setMenuItems] = useState(items);
    const [activeCategory, setActiveCategory] = useState('');
    const [categories, setCategories] = useState(allCategories);
    const filterItems = (category) => {
        setActiveCategory(category);
        if (category === 'all') {
            setMenuItems(items);
            return;
        }
        const newItems = items.filter((item) => item.category === category);
        setMenuItems(newItems);
    };

    return (
        <div>
            <Slider
                sliderPage={sliderMenuItems.sliderImage}
                height={sliderMenuItems.height}
                slogan={sliderMenuItems.slogan}
                link={sliderMenuItems.link}
            />

            <div className="body__container">
                <Categories categories={categories} activeCategory={activeCategory} filterItems={filterItems} />
                <MenuList items={menuItems} />
            </div>
        </div>
    );
}

export default Menu;
