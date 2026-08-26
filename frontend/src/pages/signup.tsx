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
import { EyeIcon, EyeOffIcon } from "../components/icons";

type SignupForm = {
  ID: string;
  name: string;
  password: string;
  confirmPassword: string;
};

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit = (data: SignupForm) => {
    console.log(data);
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

          <SubmitButton type="submit">Sign up</SubmitButton>
        </Form>
      </Content>
    </Wrapper>
  );
}

export default SignupPage;
