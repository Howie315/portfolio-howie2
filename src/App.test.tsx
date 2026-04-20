import { render } from "@testing-library/react";

import App from "./App";

test("renders the portfolio scene shell", () => {
  const { getByText } = render(<App />);

  expect(getByText(/Howie Nguyen/i)).toBeInTheDocument();
});
