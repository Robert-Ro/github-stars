import React, { useEffect, useState } from 'react'
import http from '@/services/http'
import ReactMarkdown from 'react-markdown'

const url = 'https://raw.githubusercontent.com/ant-design/ant-design/master/README.md'
const Detail = () => {
  const [data, setData] = useState<string>('')
  useEffect(() => {
    http.get(url).then((data) => {
      setData(data as unknown as string)
    })
  })
  if (data) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      ></div>
    )
  }
  return null
}

export default Detail
