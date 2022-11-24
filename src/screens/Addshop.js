import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
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

const CREATE_SHOP_MUTATION = gql`
    mutation createCoffeeShop(
        $name: String!
        $latitude: String
        $longtitude: String
        $photos: Upload
        $categories: [String]
        $slug: string
        $caption: String!
    ){
        createCoffeeShop(
            name: $name
            latitude: $latitude
            logtitude: $logtitude
            photos: $photos
            categories: $categories
            slug: $slug
            caption: $caption
        ){
            ok
            error
            shop
            photos
        }
    }
`;

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

function Addshop() {
    const [createCoffeeShop, { loading }] = useMutation(CREATE_SHOP_MUTATION);
    const { register, handleSubmit, formState } = useForm({
        mode: "onChange",
    });

    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
    }
    return (
        <AuthLayout>
            <PageTitle title="Add Shop" />
            <FormBox>
                <HeaderContainer>
                    <h1>Add Shop</h1>
                    <Subtitle>
                        make a shop!
                    </Subtitle>
                </HeaderContainer>
                <Seperator />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input {...register("name", { required: "name require" })} name="name" type="text" placeholder="name" />
                    <Input {...register("latitude",)} name="latitude" type="text" placeholder="latitude" />
                    <Input {...register("longtitude", { required: "longtitude require" })} name="longtitude" type="text" placeholder="longtitude" />
                    <Input {...register("photos")} name="photos" type="file" placeholder="photos" />
                    <Input {...register("caption")} name="caption" type="text" placeholder="caption" />
                    <Button type="submit" value={loading ? "loading" : "Sign Up"} disabled={!formState.isValid || loading} />
                </form>
            </FormBox>
            <BottomBox cta="go Home" linkText="Home" link={routes.home} />
        </AuthLayout>
    )
}

export default Addshop;