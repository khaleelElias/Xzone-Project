import { API_URL } from "@/config";
import { toast } from 'react-toastify';

export interface IError {
  message: string;
  key: string;
}

export interface IResponse<T> {
  data: T;
  error: IError[];
  status: number;
  success: boolean;
  errorMessage: string;
}

const GET = async <T extends unknown>(url: string) => {
  let response = await fetch(`${API_URL}/${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await handleResponse<T>(response);
};

const PUT = async <T extends unknown>(url: string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    method: "PUT",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await handleResponse<T>(response);
};

const PATCH = async <T extends unknown>(url: string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })

  return await handleResponse<T>(response);
}


const POST = async <T extends unknown>(url: string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await handleResponse<T>(response);
};

const handleResponse = async <T extends unknown>(response: Response) => {
  let responseObject = {} as IResponse<T>;
  responseObject.success = response.ok;
  responseObject.status = response.status;

  //TODO: handle bad gateway response, handle unauthorized req

  if(!response.ok) {
    
    try {
      let errResponse = await response.json();
      if(typeof errResponse.message == 'string') 
        responseObject.errorMessage = errResponse.message;
      else
        responseObject.error = errResponse.message;
    } catch {
      responseObject.errorMessage = await response.text();
    }
    finally {
      if(responseObject.errorMessage)
        toast.error(responseObject.errorMessage);
    }

    return responseObject;
  }

  try {
    responseObject.data = await response.json();
  } catch (erorr) {
  }

  return responseObject;
};

export { GET, POST, PUT, PATCH };
