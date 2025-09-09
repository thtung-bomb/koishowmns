import React from 'react'
import { CategorySelectionProps } from '@/interfaces';
import { Category } from '../../models';

const CategorySelection: React.FC<CategorySelectionProps> = ({ categories, onSelectedCategory, activeCategory }) => {
    return (
        <div className='px-4 mb-8 lg:space-x-16 flex flex-wrap items-center border-b-2 py-5 text-gray-900 font-semibold'>
            <button onClick={() => onSelectedCategory(null)} className={`lg:ml-12 ${activeCategory ? "" : "active-button"}`}>All</button>
            {
                categories.map((category: Category) => (
                    <button
                        onClick={() => onSelectedCategory(category.name)}
                        className={`mr-2 space-x-16 ${activeCategory === category.name ? "active-button" : ""}`}
                        key={categories.id}>
                        {category.name}
                    </button>
                ))
            }
        </div>
    )
}

export default CategorySelection