import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './MenuSlider.scss';

const MenuSlider = (props) => {
    const pages = [];
    for (let i = 0; i < props.pages.length; i++) {
        pages.push(<SwiperSlide key={i}>{props.pages[i]}</SwiperSlide>);
    }
    return (
        <div className="MenuSlider">
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
            >
                {pages}
            </Swiper>
        </div>
    );
};

export default MenuSlider;
