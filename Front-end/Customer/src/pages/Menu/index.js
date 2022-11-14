import Slider from '~/components/Layout/DefaultLayout/Slider';
import { sliderMenuItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';
// import { Fontawesome } from '@fortawesome/react-fontawesome';
// import axios from 'axios';
import react, { useState } from 'react';
import items from './data';
import Categories from './Categories';
import './product_style.css';

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

const MenuList = ({ items }) => {
    // console.log('images', images);
    return (
        <div className="section-center">
            {items.map((item) => {
                const { id, title, img, desc, price } = item;
                return (
                    <article key={id} className="menu-item">
                        <img src={img} alt={title} className="photo" />
                        <div className="item-info">
                            <header>
                                <h4>{title}</h4>
                                <h4 className="price">${price}</h4>
                            </header>
                            <p className="item-text">{desc}</p>
                        </div>
                    </article>
                );
            })}
        </div>
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
            <Slider sliderPage={sliderMenuItems.sliderImage} height={sliderMenuItems.height} />
            {/* <h2>Menu page</h2> */}
            <div className="body__container">
                <Categories categories={categories} activeCategory={activeCategory} filterItems={filterItems} />
                <MenuList items={menuItems} />
            </div>
        </div>
    );
}

export default Menu;
