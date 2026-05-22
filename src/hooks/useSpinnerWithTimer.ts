import { useEffect, useState } from 'react'

export const useSpinnerWithTimer = (inProgress = false) => {
  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false)

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined = undefined
    if (inProgress) {
      timerId = setTimeout(() => {
        setDisplaySpinner(true)
      }, 200)
    } else {
      setDisplaySpinner(false)
      clearTimeout(timerId)
    }

    return () => clearTimeout(timerId)
  }, [inProgress])

  return displaySpinner
}
