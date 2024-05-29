import { useStreamableValue } from 'ai/rsc'

export const StreamableTextUI = ({ streamableValue }) => {
  //   const [data, error, pending] = useStreamableValue(streamableValue)
  //   console.log(streamableValue)
  //   console.log({ data })
  //   console.log({ error })
  //   console.log({ pending })
  //   if (pending) return <div>Loading...</div>
  //   if (error) return <div>Error: {error.message}</div>

  return <div>{streamableValue}</div>
}
