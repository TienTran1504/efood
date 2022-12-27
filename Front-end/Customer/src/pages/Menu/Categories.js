import React from "react";
import classes from './styleMenu.module.scss'

const Categories = ({ categories, filterItems, activeCategory, isFirstLoad, isSorted }) => {
  return (
    <div>
      <div className={classes ['btn-container']}>
        {categories.map((category, index) => {
          if(index >= 0 && index < 6){
            
          } 
          if (isFirstLoad == true && index === 0) {
            return (
              <button
                type="button"
                className={classes ['active']}
                key={0}
                onClick={() => filterItems(category)}
              >
                {category}
              </button>
            )
          } else {
            return (
              <button
                type="button"
                className={classes [`${activeCategory === category ? 'active' : 'filter-btn'}`]}
                key={index}
                onClick={() => filterItems(category)}
              >
                {category}
              </button>
            );
          }
        })}
      </div>
    </div>
   
    
  );
};

export default Categories;