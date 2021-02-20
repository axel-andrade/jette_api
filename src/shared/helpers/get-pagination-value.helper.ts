import { ResultQueryPaged } from '../dtos/result-query-paged.dto';

export const getPaginationValues = function(
  limit: number,
  page: number,
  total: number,
): ResultQueryPaged {
  const totalPages = Math.ceil(total / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    total,
    limit,
    page,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage: hasPrevPage ? page - 1 : undefined,
    nextPage: hasNextPage ? page + 1 : undefined,
  };
};
