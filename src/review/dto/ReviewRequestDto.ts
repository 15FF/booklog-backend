export class ReviewRequestDto {
  pageNo: number | 1;
  pageSize: number | 9;

  getOffset(): number {
    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    return this.pageSize;
  }

  constructor(pageNo: number, pageSize: number) {
    this.pageNo = pageNo;
    this.pageSize = pageSize;
  }
}