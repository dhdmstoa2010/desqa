import { useState } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
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

          <SubmitButton type="submit">Log in</SubmitButton>
        </Form>

        <Footer>
          Don't have an account? <FooterLink to="/signup">Sign up</FooterLink>
        </Footer>
      </Content>
    </Wrapper>
  );
}

export default LoginPage;
