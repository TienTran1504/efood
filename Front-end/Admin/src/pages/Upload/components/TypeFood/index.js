import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './TypeFoodStyle.module.scss';

export default function ({ props, handleFilterProducts }) {
    return (
        <button className={`${classes['type-food']} ${classes[props.color]}`} onClick={handleFilterProducts}>
            <p className={classes['type-name']}>{props.name}</p>
            <FontAwesomeIcon className={classes['type-icon']} icon={props.icon} />
            <p className={classes['type-quantity']}>{props.number}</p>
        </button>
    );
}
