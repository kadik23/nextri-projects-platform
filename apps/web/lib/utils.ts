import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function myFetch<za3ma>(
  url: string,
  options: RequestInit = {}
): Promise<za3ma> {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          reject(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: za3ma) => resolve(data))
      .catch((error) => reject(error));
  });
}

// simpleFetch<any>('https://api.example.com/data')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
