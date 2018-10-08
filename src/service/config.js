const constants = {
    gatewayZones: {
        internet: 'Internet Gateway',
        intranet: 'Intranet Gateway'
    },
    strings: {
        signatureUrl: 'Apex API domains (api.gov.sg) need to have subdomains .i (intranet gateway) or .e (internet gateway) inserted for signing.'
    },
    requestBodyTypes: [
        'none',
        'application/json',
        'application/x-www-form-urlencoded'
    ]
};

export default {
    constants: constants,
    main: {
        appVersion: '1.0',
        sigMethod: {
            level1: 'HMACSHA256',
            level2: 'SHA256withRSA'
        },
        httpMethods: [
            'GET',
            'POST', // Only POST body encoding of x-www-urlencoded affects basestring
            'PUT',
            'DELETE'
        ],
        callerZone: ['WWW', 'Internet Zone', 'Intranet Zone', 'SGNet'],
        providerGateway: [constants.gatewayZones.internet, constants.gatewayZones.intranet],
        authLevels: [0, 1, 2],
        defaultGateway: 'apex_example_gateway',
        defaultUri: '/apex/example/path',
        authPrefix: {
            internet: {
                l1: 'apex_l1_eg',
                l2: 'apex_l2_eg'    
            },
            intranet: {
                l1: 'apex_l1_ig',
                l2: 'apex_l2_ig'
            }
        },
        notificationShowTime: 5000,
        errorMessages: {
            noSelectedGateway: 'Gateway must be specified',
            noAuthPrefix: 'Auth prefix must be specified',
            noAppId: 'Application Id must be specified',
            noAppSecret: 'Application Secret must be specified',
            timestampInvalid: 'Timestamp must be specified if not autogenerated',
            nonceInvalid: 'Nonce must be specified if not autogenerated',
            noPemProvided: 'Please load or enter a valid PEM formatted private key',
            pemSecretInvalid: 'Please verify that both pem string and secret are correct',
            pkeyInvalid: 'Error verifying private key: check that both private key and its passphrase are correct',
            httpRequestError: 'Error contacting backend; please check that it is running.',
            httpRequestFullError: 'Error encountered while making the request. Please refer to the readme at https://github.com/GovTechSG/apex-signature-validator for possible causes.'
        }
    },
    sign: {
        beginPrivateKeyHeader: /-----BEGIN ([A-Z]+ )*PRIVATE KEY-----/,
        endPrivateKeyHeader: /-----END ([A-Z]+ )*PRIVATE KEY-----/
    },
    test: {
        levels: [0, 1, 2]
    }
};