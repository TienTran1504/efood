import classes from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Layout/DefaultLayout/Header/Popper';

import FoodItem from '~/components/Layout/DefaultLayout/Header/FoodItem';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        //Khi lần đầu load trang thì searchValue nó bằng rỗng để ngăn chặn gọi api thì return nếu nó là chuỗi rỗng
        // .trim() để loại bỏ chuỗi rỗng ký tự đầu
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        // encodeURIcomponent để mã hoá những ký tự đặc biệt thành ký tự hợp lệ trên URL vd &,?,...
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data); // sẽ gán lại mảng cho result
                setLoading(false);
            })
            .catch(() => {
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
                        {searchResult.map((result) => (
                            <FoodItem key={result.id} data={result} />
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
