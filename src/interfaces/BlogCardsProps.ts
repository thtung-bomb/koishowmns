import { Blog } from ".@/models";

export default interface BlogCardsProps {
    blogs: Blog[];
    currentPage: number;
    selectedCategory: string | null;
    pageSize: number;
}