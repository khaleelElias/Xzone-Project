import { API_URL } from "@/config";

const GET = async (url: string) => {
  let response = await fetch(`${API_URL}/${url}`);
  return handleResponse(response)
}

const PUT = async (url: string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return handleResponse(response);
}

const POST = async (url:string, body: any) => {
  let response = await fetch(`${API_URL}/${url}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return handleResponse(response);
}


const handleResponse = (response: Response) => {
  return response;
}

export {GET, POST, PUT};
