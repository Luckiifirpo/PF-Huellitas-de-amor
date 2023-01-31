const errorMessageList = {
    AxiosError: {
        ERR_NETWORK: "Ocurrio un error al intentar establecer la conexion con el servidor"
    },
    LoginError : {
        UserNotFound : "No se ha encontrado usuario registrado con este correo",
        InvalidPassword: "Contraseña incorrecta"
    },
    SignUpError: {
        EmailAlreadyExist: "Este email ya esta registrado"
    },
    ChangingPasswordError: {
        OldPasswordNotMatch: "Contraseña anterior incorrecta",
        RepeatedPasswordNotMatch: "Debe repetir la contraseña"
    },
    FirebaseError: {
        "account_exists_with_different_credential": "Ya usaste un metodo de autenticacion distinto anteriormente"
    },
    UnknownError: "Ocurrio un error desconocido"
}

const ErrorManager = {
    CreateErrorInfoObject(error, detailsData) {
        console.log(error);
        if (error.name) {
            switch (error.name) {
                case "AxiosError":
                    return {
                        title: "Error de conexion",
                        message: errorMessageList["AxiosError"][error.code],
                        detailsData
                    }
                case "LoginError" : {
                    return {
                        title: "Error de autenticacion",
                        message: errorMessageList["LoginError"][error.code],
                        detailsData
                    }
                }
                case "SignUpError" : {
                    return {
                        title: "Error de registro",
                        message: errorMessageList["SignUpError"][error.code],
                        detailsData
                    }
                }
                case "ChangingPasswordError" : {
                    return {
                        title: "Error al actualizar contraseña",
                        message: errorMessageList["ChangingPasswordError"][error.code],
                        detailsData
                    }
                }
                case "FirebaseError":
                    return {
                        title: "Error de autenticacion",
                        message: errorMessageList["FirebaseError"][error.code.replace("auth/","").replaceAll("-", "_")],
                        detailsData
                    }
                case "CloudinaryUploadImageError":{
                    return {
                        title: "Error al subir imagen",
                        message: "No se ha podido cargar la imagen a cloudinary.com",
                        detailsData
                    }
                }
                default:
                    console.log(error);
                    return {
                        title: "UnknownError",
                        message: errorMessageList["UnknownError"],
                        detailsData
                    }
            }
        }

        return {
            title: "UnknownError",
            message: errorMessageList["UnknownError"],
            detailsData
        }
    }
}

export default ErrorManager;