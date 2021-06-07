import { Expose } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginateOptions {
  page: number;
  limit: number;
  total?: boolean;
}

// A class is needed to transform it via class-transformer package
export class PaginationResult<T> {

  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  first: number;

  @Expose()
  last: number;

  @Expose()
  limit: number;

  @Expose()
  total?: number;

  @Expose()
  data: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options: PaginateOptions = {
    limit: 10,
    page: 1,
  }
): Promise<PaginationResult<T>> {

  const offset = (options.page - 1) * options.limit;
  const data = await qb.limit(options.limit).offset(offset).getMany();
  
  return new PaginationResult({
    first: offset + 1,
    last: offset + data.length,
    limit: options.limit,
    total: options.total ? await qb.getCount() : null,
    data,
  });
}
