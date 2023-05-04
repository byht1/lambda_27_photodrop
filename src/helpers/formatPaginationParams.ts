import { TPaginationParams } from 'db/repository/albums/type';
import { TPaginationParamsRequest } from 'modules/album/type';

export const formatQueryParams = (params: TPaginationParamsRequest): TPaginationParams => {
  const { limit = 20, page = 1 } = params;
  const limitElement = +limit;
  const currentPage = +page;
  const skip = (currentPage - 1) * limitElement;

  return {
    limit: limitElement,
    offset: skip,
  };
};
