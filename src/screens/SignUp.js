import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/ButtomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "./routes";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $name: String!
        $email: String!
        $location: String
        $githubUsername: String
        $password: String!
    ){
        createAccount(
            username: $username
            name: $name
            email: $email
            location: $location
            githubUsername: $githubUsername
            password: $password
        ){
            ok
            error
        }
    }
`;

function SignUp() {
    const history = useHistory();
    const onCompleted = (data) => {
        const { username, password } = getValues();
        const { createAccount: { ok, error }, } = data;
        if (!ok) {
            return;
        }
        history.push(routes.home, {
            message: "Account created. Please Log in",
            username,
            password,
        });
    }
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    })
    const { register, handleSubmit, formState, getValues } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data,
            },
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign Up" />
            <FormBox>
                <HeaderContainer>
                    <h1>Sign Up~</h1>
                    <Subtitle>
                        Sign up to see store and from your friends.
                    </Subtitle>
                </HeaderContainer>
                <Seperator />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input {...register("username", { required: "Username require" })} name="username" type="text" placeholder="Username" />
                    <Input {...register("name", { required: "Name require" })} name="name" type="text" placeholder="Name" />
                    <Input {...register("email", { required: "email require" })} name="email" type="text" placeholder="email" />
                    <Input {...register("location")} name="location" type="text" placeholder="location" />
                    <Input {...register("githubUsername")} name="githubUsername" type="text" placeholder="githubUsername" />
                    <Input {...register("password", { required: "password require" })} name="password" type="password" placeholder="Password" />
                    <Button type="submit" value={loading ? "loading" : "Sign Up"} disabled={!formState.isValid || loading} />
                </form>
            </FormBox>
            <BottomBox cta="have an account?" linkText="Log in" link={routes.home} />
        </AuthLayout>
    )

}

export default SignUp;