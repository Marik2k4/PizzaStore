import React from 'react';
//import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ['Вce', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC <CategoriesProps> = React.memo(({ value, onClickCategory }) => {
 // useWhyDidYouUpdate('Categories', { value, onClickCategory });

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li 
              key={i} 
              onClick = {() => onClickCategory(i)} // Номер из массива categories 
              className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    )
})

export default Categories;
  