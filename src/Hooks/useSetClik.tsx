import React, { useEffect } from 'react'

const useSetClik = () => {
    const [click, setClick] = React.useState("following")

  const handleClick = () => {
    setClick("followers")

  }

  const handleClickFollowing = () => {
    setClick("following")
  }

  useEffect(() => {
    console.log(click)
  }, [click])

  return {
    handleClick,
    click

  }
}

export default useSetClik