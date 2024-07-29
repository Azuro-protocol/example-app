import { getSvgData } from './'


const pendingRequests = {}

const request = (src: string): Promise<SvgProvider.SvgData> => {
  if (pendingRequests[src]) {
    return pendingRequests[src]
  }

  pendingRequests[src] = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(`InlineSvg: Request failed: ${src}, status: ${xhr.status}`)
      }
      else if (xhr.response === null) {
        reject(`InlineSvg: Empty response: ${src}`)
      }
      else {
        const svgData = getSvgData(xhr.response)
        resolve(svgData)
      }

      delete pendingRequests[src]
    }

    xhr.onerror = () => {
      reject(`InlineSvg: Request failed: ${src}`)
      delete pendingRequests[src]
    }

    xhr.open('GET', src, true)
    xhr.responseType = 'text'
    xhr.send()
  })

  return pendingRequests[src]
}

export default request
