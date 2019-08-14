import React, { useState, useEffect } from 'react'
import moment from 'moment'

const ItemTimer = () => {
  let duration = moment.duration({ minutes: 0, seconds: 10 })
  const [timeLeft, setTimeLeft] = useState(
    `${duration.minutes()} minutes ${duration.seconds()} seconds`
  )

  useEffect(() => {
    let timer = setInterval(() => {
      duration.subtract(1, 'second')
      setTimeLeft(`${duration.minutes()} minutes ${duration.seconds()} seconds`)
      console.log({
        timeLeft: `${duration.minutes()} minutes ${duration.seconds()} seconds`
      })
      if (duration.asMilliseconds() === 0) {
        clearInterval(timer)
      }
    }, 1000)
    // eslint-disable-next-line
  }, [])

  return <span>{timeLeft}</span>
}

export default ItemTimer
