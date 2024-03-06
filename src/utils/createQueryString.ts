import { type ReadonlyURLSearchParams } from 'next/navigation'

export const createQueryString = (
  name: string,
  value: string,
  initialParams?: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(initialParams?.toString())

  if (value === '') {
    params.delete(name)
  } else if (params.has(name)) {
    params.set(name, value)
  } else {
    params.append(name, value)
  }

  return params.toString().replaceAll('%2C', ',')
}
