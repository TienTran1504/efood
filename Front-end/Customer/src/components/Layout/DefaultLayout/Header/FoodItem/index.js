import classes from "./FoodItem.module.scss";
import Image from '~/components/Image';
import { Link } from 'react-router-dom'
function FoodItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={classes.wrapper}>
            <Image
                className={classes['food-image']}
                src={data.avatar}
                alt="avatar_picture" />
            <div className={classes['food-content']}>
                <h4 className={classes['food-name']}>{data.full_name}</h4>
            </div>

        </Link>
    );
}

export default FoodItem;

//File để render ra các món ăn
//file json cần có data có thuộc tính avatar,full_name,nick_name