import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./login";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as authHook from "@/hooks/auth";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe("Login Page", () => {
  it("renders form fields", () => {
    render(<Login />, { wrapper });

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng nhập/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<Login />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText(/email không được trống/i)).toBeInTheDocument();
      expect(
        screen.getByText(/mật khẩu không được trống/i)
      ).toBeInTheDocument();
    });
  });

  it("calls login with correct data", async () => {
    const loginMock = jest.fn();
    jest.spyOn(authHook, "useLogin").mockReturnValue({
      mutate: loginMock,
      isPending: false,
    } as any);

    render(<Login />, { wrapper });

    fireEvent.change(screen.getByPlaceholderText("example@gmail.com"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText(/mật khẩu/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(
        { email: "test@gmail.com", password: "123456" },
        expect.any(Object)
      );
    });
  });

  it("toggles password visibility", () => {
    render(<Login />, { wrapper });

    const passwordInput = screen.getByLabelText(/mật khẩu/i);
    const toggleBtn = screen.getByTestId("toggle-password");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
