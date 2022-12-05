import classes from "./FoodItem.module.scss";
import Image from '~/components/Image';

function FoodItem({ data }) {
    return (
        <div className={classes.wrapper}>
            <Image
                className={classes['food-image']}
                src={data.image}
                alt="avatar_picture" />
            <div className={classes['food-content']}>
                <h4 className={classes['food-name']}>{data.name}</h4>
            </div>

        </div>
    );
}

export default FoodItem;

//File để render ra các món ăn
//file json cần có data có thuộc tính avatar,full_name,nick_name