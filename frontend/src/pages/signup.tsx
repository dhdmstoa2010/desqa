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
} from "./styles/signup.style";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signupRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { EyeIcon, EyeOffIcon } from "../components/icons";

type SignupForm = {
  ID: string;
  name: string;
  password: string;
  confirmPassword: string;
};

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    setServerError(null);
    try {
      const { token, user } = await signupRequest({
        loginId: data.ID,
        name: data.name,
        password: data.password,
      });
      login(user, token);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setServerError(err.response.data.message);
      } else {
        setServerError("회원가입 중 오류가 발생했습니다");
      }
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>Sign up</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name   is required" })}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </Field>
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
            Sign up
          </SubmitButton>
        </Form>
      </Content>
    </Wrapper>
  );
}

export default SignupPage;
