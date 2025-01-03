import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function fetcher<A>(url: string, options: RequestInit = {}): Promise<A> {
	return new Promise((resolve, reject) => {
		fetch(url, options)
			.then((response) => {
				if (!response.ok) {
					reject(`Error: ${response.status} ${response.statusText}`);
				}
				return response.json();
			})
			.then((data: A) => resolve(data))
			.catch((error) => reject(error));
	});
}

// fetcher<any>('https://api.example.com/data')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
