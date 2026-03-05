const verifyEmailTemplate = ({name, url}) => {
    return `
    <p> Thank you for registering with Blinkeyit! </p>
    <p> Please click the link below to verify your email address:</p>
    <a href="${url}">Verify Email</a>
    <p> If you did not create an account, please ignore this email.</p>
    `
}

export default verifyEmailTemplate