import Slider from '~/components/Layout/DefaultLayout/Slider/index.js';
import { sliderHomeItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';

function Home() {
    return (
        <>
            <Slider
                sliderPage={sliderHomeItems.sliderImage}
                height={sliderHomeItems.height}
                slogan={sliderHomeItems.slogan}
                link={sliderHomeItems.link}
            />
        </>
    );
}

export default Home;
