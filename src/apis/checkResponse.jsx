import Swal from "sweetalert2";

// To check response error
export const checkResponse = async (response) => {
    
    const resp = await response.json()

    switch (response?.status) {
        case 400: {
           
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: resp?.message,
            });
           
            return resp;

        } break;
        
        case 401: {
           
            Swal.fire({
                icon: "error",
                title: "Login Again",
                text: resp?.message,
            });
           
            return resp;

        } break;

        case 422: {

            Swal.fire({
                icon: "error",
                title: "Please check your data.",
                text: resp?.message,
            });

            console.log('resp: ', resp)

            return resp;
            
        } break;

        case 200: {
            return resp;
        }

        case 201: {
            return resp;
        }

        default: {
            return resp;
        }
    }

}