import { ReviewRequestDto } from "src/review/dto/ReviewRequestDto";

describe('[ReviewRequestDto]', () => {
  it.each([
    [1, 9, 0],
    [2, 9, 9],
    [3, 9, 18],
    [1, 18, 0],
    [2, 18, 18],
  ])('pageNo=%i, pageSize=%i 이면 offset=%i', (pageNo, pageSize, offset) => {
      expect(new ReviewRequestDto(pageNo, pageSize).getOffset()).toBe(offset);
  })
});
