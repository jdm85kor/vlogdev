/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "ap-northeast-2",
    "aws_cognito_identity_pool_id": "ap-northeast-2:ab9fa852-eb7a-4698-9f4c-df78ed4e27c2",
    "aws_cognito_region": "ap-northeast-2",
    "aws_user_pools_id": "ap-northeast-2_fP8ZeL8NV",
    "aws_user_pools_web_client_id": "7dkq8mrarcg0alggt50674p8j1",
    "oauth": {
        "domain": "v-log-dev.auth.ap-northeast-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://v-log.dev/",
        "redirectSignOut": "https://v-log.dev/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_login_mechanisms": [
        "EMAIL"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 10,
        "passwordPolicyCharacters": ["RequireLowercase", "RequireNumbers", "RequireSymbols", "RequireUppercase"]
    }
};


export default awsmobile;
