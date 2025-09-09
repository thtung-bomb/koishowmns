import { useEffect } from 'react'
import { scrollToTop } from '@/utils'

//tạo ra 1 đối tượng có kiểu K (string) và giá trị T (number | undefined) 
const scrollPositions: Record<string, number | undefined> = {}

//hàm để lưu vị trí cuộn hiện tại, khi navigate sang trang khác và back lại trang cũ
//nó vẫn sẽ lưu ở vị trí cũ mà ta lướt tới cuối cùng
 const useScrollPosition = (page: string) => {
    useEffect(() => {
        // Khôi phục vị trí cuộn cho trang hiện tại, hoặc về đầu trang nếu không có dữ liệu
        scrollToTop(scrollPositions[page] || 0, 'auto')
        const save = () => {
            // Lưu object với key là tên page và value là position theo trục y hiện tại
            scrollPositions[page] = document.body.scrollTop
            console.log(`Saved ${page}: ${scrollPositions[page]}`)
        }

        document.body.addEventListener('scroll', save)
        return () => {
            document.body.removeEventListener('scroll', save)
        }
    }, [page])
}

export default useScrollPosition;