import { UserRejectedRequestError } from 'viem'


const isUserRejectedRequestError = (error: any) => {
  return error instanceof UserRejectedRequestError || error?.cause instanceof UserRejectedRequestError
}

export default isUserRejectedRequestError
