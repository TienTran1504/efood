import React from "react";
import Star from './Star';

const RatingStarts = () => {
    const GREADES = ['Tệ', 'Tạm được', 'Tốt', 'Rất Tốt', 'Đm tuyệt vời' ]

    return (
        <div className="container">
            <h1 className="result"></h1>
            <div className="starts">
                {
                    GREADES.map((grade, index) => (
                        <Star
                            index={index}
                            key={grade}
                        />
                    ))
                }
            </div>
        </div>
    );

}

export default RatingStarts;