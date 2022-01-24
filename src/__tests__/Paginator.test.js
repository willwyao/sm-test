import { render, waitFor, screen } from "@testing-library/react";
import Paginator from "../components/Paginator/Paginator";

it('renders the provided page number',()=>{
  render(<Paginator page={3} />);
  expect(screen.getByText(/3/)).toBeVisible();
});
