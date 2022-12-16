import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './TypeStyle.module.scss';

export default function ({ props, handleFilterBills, handleFilterUsers }) {
    return (
        <button
            className={`${classes['type-food']} ${classes[props.color]}`}
            onClick={handleFilterBills || handleFilterUsers}
        >
            <p className={classes['type-name']}>{props.name}</p>
            <FontAwesomeIcon className={classes['type-icon']} icon={props.icon} />
            <p className={classes['type-quantity']}>{props.number}</p>
        </button>
    );
}
