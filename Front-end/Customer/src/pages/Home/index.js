import Slider from '~/components/Layout/DefaultLayout/Slider/index.js';
import { sliderHomeItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';

function Home() {
    return (
        <div>
            <Slider sliderPage={sliderHomeItems.sliderImage} height={sliderHomeItems.height} />
        </div>
    );
}

export default Home;
