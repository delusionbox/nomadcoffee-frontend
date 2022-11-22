import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/ButtomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import PageTitle from "../components/PageTitle";
import { logUserIn } from "./apollo";
import routes from "./routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc00;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  //console.log(location);
  const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    }
  });
  const onCompleted = (data) => {
    const { login: { ok, error, token } } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      }
    });
  };
  const clearLoginError = () => {
    clearErrors("result")
  }
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <h1>Coffee</h1>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "username is required", minLength: {
                value: 3,
                message: "Username should be longer than 3 chars",
              }
            })}
            onFocus={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.error?.username?.message} />
          <Input
            {...register("password", { required: "password is required", minLength: 4, })}
            onFocus={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.error?.password?.message} />
          <Button type="submit" value={loading ? "loading" : "Log In"} disabled={!formState.isValid || loading} />
          <FormError message={formState.error?.result?.message} />
        </form>
        <Seperator />
        <FacebookLogin>
          <span>
            Log in with facebook
          </span>
        </FacebookLogin>
      </FormBox>
      <BottomBox cta="Don't have an account?" linkText="Sign Up" link={routes.signUp} />
    </AuthLayout>
  )

}

export default Login;
