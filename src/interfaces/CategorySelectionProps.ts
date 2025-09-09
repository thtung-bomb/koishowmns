export default interface CategorySelectionProps {
    onSelectedCategory: (category: string | null) => void;
    activeCategory: string | null;
}