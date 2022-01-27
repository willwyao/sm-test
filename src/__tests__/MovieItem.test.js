import { render, screen, fireEvent } from "@testing-library/react";
import MovieItem from "../components/MovieItem/MovieItem";


const setSelectedMovieMock = jest.fn();

it('should render provided data',()=>{
  render(<MovieItem title={'test title'} year ={'3000'} />);
  expect(screen.getByRole('heading',{level:4}).textContent).toBe('test title');
  expect(screen.getByText(/3000/)).toBeVisible();
});

it('should update selectedMovie after click the item',()=>{
  render(<MovieItem id={'111'} setSelectedMovie ={setSelectedMovieMock} />);
  fireEvent.click(screen.getByRole('listitem'));
  expect(setSelectedMovieMock).toHaveBeenCalled();
  expect(setSelectedMovieMock.mock.calls[0][0]).toBe('111');
});

it('should have class active when the item is selected',()=>{
  render(<MovieItem id={'111'} selectedMovie ={'111'} />);
  expect(screen.getByRole('listitem').className).toContain('active');
});

it('should not have class active when the item is not selected',()=>{
  render(<MovieItem id={'111'} selectedMovie ={'222'} />);
  expect(screen.getByRole('listitem').className).not.toContain('active');
});

