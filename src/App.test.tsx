import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders the Tailwind showcase section", () => {
  render(<App />);
  expect(screen.getByText(/tailwind check/i)).toBeInTheDocument();
});
