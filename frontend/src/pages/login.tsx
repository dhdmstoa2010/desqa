import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { EyeIcon, EyeOffIcon } from "../components/icons";
import {
  Wrapper,
  Content,
  Title,
  Form,
  Field,
  Label,
  Input,
  PasswordField,
  ToggleButton,
  ErrorText,
  SubmitButton,
  Footer,
  FooterLink,
} from "./styles/login.style";

type LoginForm = {
  ID: string;
  password: string;
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const { token, user } = await loginRequest({
        loginId: data.ID,
        password: data.password,
      });
      login(user, token);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setServerError(err.response.data.message);
      } else {
        setServerError("로그인 중 오류가 발생했습니다");
      }
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>Log in</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label htmlFor="ID">ID</Label>
            <Input
              id="ID"
              type="text"
              placeholder="Enter your ID"
              {...register("ID", { required: "ID is required" })}
            />
            {errors.ID && <ErrorText>{errors.ID.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <PasswordField>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              <ToggleButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </ToggleButton>
            </PasswordField>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </Field>

          {serverError && <ErrorText>{serverError}</ErrorText>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            Log in
          </SubmitButton>
        </Form>

        <Footer>
          Don't have an account? <FooterLink to="/signup">Sign up</FooterLink>
        </Footer>
      </Content>
    </Wrapper>
  );
}

export default LoginPage;
