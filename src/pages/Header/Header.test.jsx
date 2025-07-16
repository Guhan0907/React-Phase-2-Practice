import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

beforeEach(() => {
  localStorage.clear();
});

describe("Header Component", () => {
  it("renders title correctly", () => {
    render(
      <MemoryRouter>
        <Header onLogout={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Feast Feed/i)).toBeInTheDocument();
  });

  it("does not show wishlist and logout buttons when not logged in", () => {
    render(
      <MemoryRouter>
        <Header onLogout={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/Wishlist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it("shows wishlist and logout buttons when logged in", () => {
    localStorage.setItem("email", "test@example.com");

    render(
      <MemoryRouter>
        <Header onLogout={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it("calls onLogout and clears localStorage when logout is clicked", () => {
    const mockLogout = vi.fn();
    localStorage.setItem("email", "test@example.com");
    localStorage.setItem("wishlist", '["test"]');

    render(
      <MemoryRouter>
        <Header onLogout={mockLogout} />
      </MemoryRouter>,
    );

    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem("email")).toBeNull();
    expect(localStorage.getItem("wishlist")).toBeNull();
    expect(mockLogout).toHaveBeenCalled();
  });
});
