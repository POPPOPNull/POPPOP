import './pagination.css';

function Pagination({ totalPages, currentPage, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // 전체 페이지가 1개 이하일 경우 페이지네이션 미표시
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a onClick={() => paginate(currentPage -1)} href="#!" className="page-link">
                        이전
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a onClick={() => paginate(number)} href="#!" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a onClick={() => paginate(currentPage + 1)} href="#!" className="page-link">
                        다음
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;