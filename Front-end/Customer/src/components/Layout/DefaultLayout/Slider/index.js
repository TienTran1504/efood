import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';
import classes from './Slider.module.scss';
import { Link } from 'react-router-dom';

const Slider = (props) => {
    return (
        <div className={classes.container__slider}>
            <>
                {props.slogan !== '' ? (
                    <div className={classes.container__slogan} style={{ height: props.height }}>
                        <div id={classes.box__content}>
                            <h2>{props.slogan.heading__2}</h2>
                            <h1>{props.slogan.heading__1}</h1>
                            <p>{props.slogan.desc}</p>
                            <hr />
                            <div className={classes.box__btn}>
                                <Link to={props.link}>
                                    <button id={classes.btn__slogan}>{props.slogan.btn}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>
            <HeroSlider
                height={props.height}
                autoplay={{
                    autoplayDuration: 3000,
                }}
                controller={{
                    slidingDuration: 500,
                    slidingDelay: 200,
                }}
            >
                {props.sliderPage.map((slide, index) => {
                    return (
                        <Slide
                            key={index}
                            background={{
                                backgroundImageSrc: slide.image,
                                backgroundAttachment: 'fixed',
                            }}
                        />
                    );
                })}
            </HeroSlider>
        </div>
    );
};

export default Slider;
