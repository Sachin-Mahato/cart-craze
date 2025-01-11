import * as React from "react";
import {
    Html,
    Head,
    Preview,
    Section,
    Row,
    Heading,
    Text,
    Container,
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    verificationCode: string;
}

export default function VerificationEmail({
    username,
    verificationCode,
}: VerificationEmailProps): JSX.Element {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>
                Your verification code is {verificationCode}. Complete your
                registration now.
            </Preview>
            <Container
                style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
            >
                <Section>
                    <Row>
                        <Heading
                            as="h2"
                            style={{ fontSize: "24px", marginBottom: "20px" }}
                        >
                            Hello {username},
                        </Heading>
                    </Row>
                    <Row>
                        <Text
                            style={{ fontSize: "16px", marginBottom: "10px" }}
                        >
                            Thank you for registering. Please use the following
                            verification code to complete your registration:
                        </Text>
                    </Row>
                    <Row>
                        <Text
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#000",
                                margin: "20px 0",
                            }}
                        >
                            {verificationCode}
                        </Text>
                    </Row>
                    <Row>
                        <Text style={{ fontSize: "14px", color: "#555" }}>
                            If you did not request this code, please ignore this
                            email.
                        </Text>
                    </Row>
                    <Row>
                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#777",
                                marginTop: "20px",
                            }}
                        >
                            Best regards, <br />
                            Sachin Kumar Mahato
                        </Text>
                    </Row>
                </Section>
            </Container>
        </Html>
    );
}
