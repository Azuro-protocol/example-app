const shortenAddress = (address: string, countBefore: number = 4, countAfter: number = 4) =>
  `${address.substr(0, countBefore)}...${address.substr(-1 * countAfter)}`

export default shortenAddress
