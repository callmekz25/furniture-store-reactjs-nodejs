import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./register";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as authHook from "@/hooks/auth";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe("Register Page", () => {
  it("renders all form fields", () => {
    render(<Register />, { wrapper });

    expect(screen.getByLabelText(/họ tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng ký/i })
    ).toBeInTheDocument();
  });

  it("shows validation messages when fields are empty", async () => {
    render(<Register />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /đăng ký/i }));

    await waitFor(() => {
      expect(screen.getByText(/họ tên không được trống/i)).toBeInTheDocument();
      expect(screen.getByText(/email không được trống/i)).toBeInTheDocument();
      expect(
        screen.getByText(/mật khẩu không được trống/i)
      ).toBeInTheDocument();
    });
  });

  it("shows validation for invalid email", async () => {
    render(<Register />, { wrapper });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /đăng ký/i }));

    await waitFor(() => {
      expect(screen.getByText(/email không hợp lệ/i)).toBeInTheDocument();
    });
  });

  it("submits form with correct data", async () => {
    const registerMock = jest.fn();
    jest.spyOn(authHook, "useRegister").mockReturnValue({
      mutate: registerMock,
      isPending: false,
    } as any);

    render(<Register />, { wrapper });

    fireEvent.change(screen.getByLabelText(/họ tên/i), {
      target: { value: "Vinh Nguyen" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/mật khẩu/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /đăng ký/i }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith(
        {
          name: "Vinh Nguyen",
          email: "test@gmail.com",
          password: "123456",
        },
        expect.any(Object)
      );
    });
  });

  it("toggles password visibility", () => {
    render(<Register />, { wrapper });

    const passwordInput = screen.getByLabelText(/mật khẩu/i);
    const toggleBtn = screen.getByTestId("toggle-password");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
