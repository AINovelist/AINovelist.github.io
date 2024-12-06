import { useState } from 'react';
import { Button } from '@/components/ui/button';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setSelectedItemsPerPage(itemsPerPage);
    onItemsPerPageChange(itemsPerPage);
  };

  return (
    <div className="flex justify-between items-center mt-8">
      
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            // color={page === currentPage ? 'primary' : 'secondary'}
            variant={page === currentPage ? 'destructive' : 'outline'}
          >
            {page}
          </Button>
        ))}
      
      <div>
        تعداد
          {[3, 6, 9, 12, 15].map((itemsPerPage) => (
            <Button
              key={itemsPerPage}
              onClick={() => handleItemsPerPageChange(itemsPerPage)}
              // color={itemsPerPage === selectedItemsPerPage ? 'primary' : 'secondary'}
              variant={itemsPerPage === selectedItemsPerPage ? 'default' : 'outline'}
            >
              {itemsPerPage}
            </Button>
          ))}
        
      </div>
    </div>
  );
}