import { getServerSession } from "next-auth/next"

import { options } from "./options"
import axios from 'axios';

export async function getUser() {
  const session = await getServerSession(options)
  return session?.user
}

export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const swrOptions = {shouldRetryOnError: false, errorRetryCount: 2};
