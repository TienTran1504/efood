import Slider from '~/components/Layout/DefaultLayout/Slider';
import { sliderMenuItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';

function Menu() {
    return (
        <div>
            <Slider sliderPage={sliderMenuItems.sliderImage} height={sliderMenuItems.height} />
            <h2>Menu page</h2>
        </div>
    );
}

export default Menu;
