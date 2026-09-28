import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
    .swagger-ui .topbar {
        background-color: red;
    }
    .swagger-ui .topbar .link svg {
        display: none;
    }
    .swagger-ui .topbar .link {
        background-image: url('/images/images.jpeg');
        background-repeat: no-repeat;
        background-size: contain;
        height: 120px;
        width: 200px;
    }
    ` ,
    customSiteTitle: 'Documentación REST API Express / TypeScript'

}
export default swaggerSpec
export {
    swaggerUiOptions
}