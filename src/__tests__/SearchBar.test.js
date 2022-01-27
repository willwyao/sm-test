import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar/SearchBar";

const setSearchTermMock = jest.fn();

it("should render the initial value from searchTerm", () => {
  render(<SearchBar searchTerm={"test term"} />);
  expect(screen.getByPlaceholderText("Search here").value).toBe("test term");
});

it("should render only the clear button after initial loading", () => {
  render(<SearchBar searchTerm={"test term"} />);
  expect(screen.getAllByRole("button").length).toBe(1);
  expect(screen.getByRole("button").textContent).toBe("X");
});

it("should update input value on change", () => {
  render(<SearchBar />);
  fireEvent.change(screen.getByPlaceholderText("Search here"), {
    target: { value: "test" },
  });
  expect(screen.getByPlaceholderText("Search here").value).toBe("test");
});

it("should render the search button after the input value change", () => {
  const { container } = render(<SearchBar searchTerm={"initial string"} />);
  fireEvent.change(screen.getByPlaceholderText("Search here"), {
    target: { value: "changed string" },
  });
  expect(container.querySelector('[type="submit"]')).toBeVisible();
  expect(screen.getByRole("button").textContent).not.toBe("X");
});

it('should clear input value after click the clear button',()=>{
  render(<SearchBar searchTerm={"initial string"} setSearchTerm={setSearchTermMock} />);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByPlaceholderText("Search here").value).toBe('');
  expect(setSearchTermMock).toHaveBeenCalled();
  expect(setSearchTermMock.mock.calls[0][0]).toBe('');
});

it('should update the search term after form submit',()=>{
  const {container}=render(<SearchBar searchTerm={"initial string"} setSearchTerm={setSearchTermMock} />);
  fireEvent.change(screen.getByPlaceholderText("Search here"), {
    target: { value: "changed string" },
  });
  fireEvent.submit(container.querySelector('form'));
  expect(setSearchTermMock).toHaveBeenCalled();
  expect(setSearchTermMock.mock.calls[0][0]).toBe('changed string');
});

it('should submit the form after click the search button',()=>{
  render(<SearchBar searchTerm={"initial string"} setSearchTerm={setSearchTermMock} />);
  fireEvent.change(screen.getByPlaceholderText("Search here"), {
    target: { value: "changed string" },
  });
  fireEvent.click(screen.getByRole("button"));
  expect(setSearchTermMock).toHaveBeenCalled();
  expect(setSearchTermMock.mock.calls[0][0]).toBe('changed string');
});