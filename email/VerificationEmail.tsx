import * as React from "react";
import {
    Html,
    Head,
    Preview,
    Section,
    Row,
    Heading,
    Text,
} from "@react-email/components";

interface verificationEmailProps {
    username: string;
    verificationCode: string;
}
export default async function verificationEmail({
    username,
    verificationCode,
}: verificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>
                Here&apos;s your verification code: {verificationCode}
            </Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please use the following
                        verification code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{verificationCode}</Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code ,please ignore this
                        email.
                    </Text>
                </Row>
                {/* TODO: add email */}
            </Section>
        </Html>
    );
}
