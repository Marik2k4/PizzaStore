import React from 'react';

/* --- Изменение адресной строки  --- */
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

/* --- React-Redux --- */
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

/* --- Компоненты--- */
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { FilterSelector } from '../redux/filter/selectors';
import { PizzaDataSelector } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

import pizzasItemes from '../assets/pizzas.json'; // Локальный массив пицц (заменить на items)

const Home: React.FC = () => {
    const navigate = useNavigate(); // для URL 
    const dispatch = useAppDispatch(); // вызов функий из Redux 

    const isMounted = React.useRef(false); // был ли первый рендер 

    // Redux
    const { categoryId, sort, currentPage, searchValue } = useSelector(FilterSelector); // фильтрация 
    const { items, status } = useSelector(PizzaDataSelector); // массив пицц и загрузка
    const sortType = sort.sortProperty // rating | price | title 

    // Изменение категории
    const onClickCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));     
    }, [])

    // Изменение страницы 
    const onChangePage = (page: number) => {
     dispatch(setCurrentPage(page));   
    }

     /* --- Запрос пицц  --- */
    const getPizzas = async () => {
        const category =  categoryId > 0 ? `category=${categoryId}` : '';  // выбор другой категории  
        const sortBy = sortType.replace('-', ''); // удаляем минус 
        const order = sortType.includes('-') ? 'asc' : 'desc'; // проверка на минус 
        const search = searchValue ? `search=${searchValue}` : ''; // поиск 

        // запрос на сервер и сохранение пицц в массив 
        dispatch(
            fetchPizzas({ 
                category,
                sortBy,
                order,
                search,
                currentPage: String(currentPage),
            }),
        ); 

        window.scrollTo(0,0);
    };

    /* --- Изменение адресной строки  --- */
    React.useEffect(() => { 
        // // Если происходит только первый рендер, то мы не вшиваем в URL параметры 
        if (isMounted.current) {
                const queryString = qs.stringify({
                    sortProperty: sort.sortProperty,
                    categoryId,
                    currentPage
                });
                navigate(`?${queryString}`);
        }

        isMounted.current = true; // первый рендер произошёл 

        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId: null,
                sortProperty: sort.sortProperty,
                currentPage,
            };
            const queryString = qs.stringify(params, {skipNulls: true});

            navigate(`?${queryString}`);
        }


    }, [categoryId, sortType, searchValue, currentPage])


    /* --- Следим за обновлением данных --- */
    React.useEffect(() => {
        getPizzas();
    }, [categoryId, sortType, searchValue, currentPage]);


    /* --- Рендер пицц и фильтрация при поиске из input --- */
    const pizzas = items
    /*
    .filter((obj) => {
        if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    })
    */
    .map((obj: any) => 
        <PizzaBlock key={obj.id} {...obj} /> 
    );

    const pizzasLocal = pizzasItemes
    .map((obj: any) => 
        <PizzaBlock key={obj.id} {...obj} /> 
    );



    console.log(categoryId)


  return (
    <div className="container">
        <div className="content__top">
            <Categories 
                value={categoryId} 
                onClickCategory = {onClickCategory} 
            />
            <Sort value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
            {
                status == 'error' 
                ? 
                // <div className='content_error-info'>
                //     <h2>Ошибка. Повторите попытку позже</h2>
                // </div> 

                <div className="content__items">
                    {/* Рендер пицц из LS */}
                    { pizzasLocal }
                </div>
                
                : 
                <div className="content__items">
                    {/* Рендер Анимации или Пицц */}
                    {
                        status == 'loading' 
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) 
                        : pizzas
                    }
                </div>
            }
            {/* Номера страниц */}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;
