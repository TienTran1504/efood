import classes from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Layout/DefaultLayout/Header/Popper';
import axios from 'axios';

import FoodItem from '~/components/Layout/DefaultLayout/Header/FoodItem';

function Search({ setIsOpen, setData }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    function jsUcfirst(string) {
        return string
            .toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    useEffect(() => {
        //Khi lần đầu load trang thì searchValue nó bằng rỗng để ngăn chặn gọi api thì return nếu nó là chuỗi rỗng
        // .trim() để loại bỏ chuỗi rỗng ký tự đầu
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        var arraySuggestFood = [];
        // encodeURIcomponent để mã hoá những ký tự đặc biệt thành ký tự hợp lệ trên URL vd &,?,...
        const numberLimit = 7;
        axios
            .get(`http://localhost:3000/api/v1/auth/foods?limit=${numberLimit}&search=${searchValue}`)
            .then((res) => {
                var temparray = searchValue.split(' ');

                res.data.sortedFoods.map((food) => {
                    for (var i = 0; i < temparray.length; i++) {
                        if (food.name.length >= temparray[i].length) {
                            if (jsUcfirst(food.name).includes(jsUcfirst(temparray[i]))) {
                                arraySuggestFood.push(food);
                                return;
                            }
                        } else {
                            if (jsUcfirst(temparray[i]).includes(jsUcfirst(food.name))) {
                                arraySuggestFood.push(food);
                                return;
                            }
                        }
                    }
                });
                setSearchResult(arraySuggestFood);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={classes['search-result']} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={classes['search-title']}>FOOD</h4>
                        {searchResult.map((result, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setIsOpen(true);
                                    setShowResult(false);
                                    setData(result);
                                }}
                            >
                                <FoodItem data={result} />
                            </div>
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={classes.search}>
                <input
                    placeholder="Search dishes..."
                    ref={inputRef}
                    value={searchValue}
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {/* Khi có search value sẽ hiện button clear */}
                {!!searchValue && !loading && (
                    <button className={classes.clear} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={classes.loading} icon={faSpinner} />}

                <button className={classes['search-btn']}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
