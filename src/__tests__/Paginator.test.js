import { render, screen, fireEvent } from "@testing-library/react";
import Paginator from "../components/Paginator/Paginator";

const mockSetPage = jest.fn();

it("should render the provided page number", () => {
  render(<Paginator page={3} />);
  expect(screen.getByText(/3/)).toBeVisible();
});

it("should handle page increment after click the next button", () => {
  render(<Paginator page={3} total={50} setPage={mockSetPage} />);
  fireEvent.click(screen.getAllByRole("button")[1]);
  expect(mockSetPage).toHaveBeenCalledTimes(1);
  expect(mockSetPage.mock.calls[0][0]).toBe(4);
});

it("should handle page decrement after click the prev button", () => {
  render(<Paginator page={3} total={50} setPage={mockSetPage} />);
  fireEvent.click(screen.getAllByRole("button")[0]);
  expect(mockSetPage).toHaveBeenCalledTimes(1);
  expect(mockSetPage.mock.calls[0][0]).toBe(2);
});

//max page maxPage = Math.ceil(total / 10);
it("should not increase the page number to be greater than the max page", () => {
  render(<Paginator page={5} total={50} setPage={mockSetPage} />);
  fireEvent.click(screen.getAllByRole("button")[1]);
  expect(mockSetPage).toHaveBeenCalledTimes(1);
  expect(mockSetPage.mock.calls[0][0]).toBe(5);
});

it("should not decrease the page number to be less than 1", () => {
  render(<Paginator page={1} total={50} setPage={mockSetPage} />);
  fireEvent.click(screen.getAllByRole("button")[0]);
  expect(mockSetPage).toHaveBeenCalledTimes(1);
  expect(mockSetPage.mock.calls[0][0]).toBe(1);
});
