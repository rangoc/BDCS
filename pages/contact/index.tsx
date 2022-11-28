import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import styled from "styled-components";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";

import { SEO } from "../../components/SEO";
import { Layout } from "../../components/Layout";
import { QUERIES } from "../../lib/constants";

import contact from "../../public/contact.webp";
import { Dialog } from "../../components/Dialog";

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface IFetchResponse {
  data: {
    spreadsheetId: string;
  };
}

const defaultValues: IFormInputs = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  margin: auto;
  gap: 50px;
`;

// const ImageWrapper = styled.div`
//   display: none;
//   flex: 1;

//   @media ${QUERIES.tabletAndDown} {
//     display: none;
//   }
// `;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-block-end: 16px;
`;

const FormWrapper = styled.div`
  flex: 1;
  max-width: 720px;
  margin: auto;
  padding-inline: 16px;
  padding-block-start: 16px;
  padding-block-end: 32px;
  border-radius: 1rem;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);

  @media ${QUERIES.tabletAndDown} {
    max-width: 512px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;

const FormField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
`;
const Input = styled.input`
  padding: 8px;
  border: 0;
  border-bottom: 1px solid hsla(188, 100%, 3%, 0.4);
`;

const Message = styled.textarea`
  height: 150px;
  padding: 8px;
  resize: none;
  border: 1px solid hsla(188, 100%, 3%, 0.4);
  border-radius: 1rem;
`;

const Error = styled.span`
  color: red;
  position: absolute;
  left: 0;
  bottom: -25px;
`;

export const SubmitButton = styled.button`
  cursor: pointer;
  max-width: 320px;
  min-width: 240px;
  margin: auto;
  padding: 8px;
  background-color: black;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid black;
  transition: all 0.25s ease-out;

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
    color: black;
    border: 2px solid lightgray;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: white;
      color: revert;
    }
  }
`;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInputs>({ defaultValues });

  const [isFetching, isFetchingSet] = useState(false);
  const [showModal, showModalSet] = useState(false);

  // Reset form after succesful submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...defaultValues });
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const requestData: IFormInputs = {
      ...data,
      email: data.email.trim().toLowerCase(),
    };

    isFetchingSet(true);
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const content = (await response.json()) as IFetchResponse;

    isFetchingSet(false);

    if (content?.data?.spreadsheetId) {
      showModalSet(true);
    }

    console.log("Submit::FetchResponse::", content);
  };

  return (
    <Layout>
      <SEO
        title="Contact Us | BD Corporate Services d.o.o. Podgorica"
        description="For more information about us, check out our website and get in touch today."
      />
      <Wrapper>
        {/* <ImageWrapper>
          <Image
            src={contact}
            alt="Contact us, we are always at your service."
          />
        </ImageWrapper> */}
        <FormWrapper>
          <Title>Contact Us</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <Label htmlFor="name">Name*</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && <Error>This field is required!</Error>}
            </FormField>
            <FormField>
              <Label htmlFor="email">Email*</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && <Error>This field is required!</Error>}
            </FormField>
            <FormField>
              <Label htmlFor="subject">Subject*</Label>
              <Input
                type="text"
                id="subject"
                placeholder="Type the subject"
                {...register("subject", { required: true })}
              />
              {errors.subject && <Error>This field is required!</Error>}
            </FormField>
            <FormField>
              <Label htmlFor="message">Message*</Label>
              <Message
                id="message"
                placeholder="Type your message here..."
                {...register("message", { required: true })}
              />
              {errors.message && <Error>This field is required!</Error>}
            </FormField>

            <SubmitButton disabled={isFetching && true}>Submit</SubmitButton>
          </Form>
        </FormWrapper>
      </Wrapper>
      <Dialog showModal={showModal} showModalSet={showModalSet} />
    </Layout>
  );
}
