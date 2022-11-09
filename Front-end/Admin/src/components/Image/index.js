import { useState, forwardRef } from 'react'
import images from '~/assets/images'
import classes from './Image.module.scss'
//Khi không có prop fallback được truyền nó sẽ truyền ảnh no-image khi bị lỗi
const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    }
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img className={`${classes.wrapper} ${className}`} ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError} />
    );
})

export default Image;