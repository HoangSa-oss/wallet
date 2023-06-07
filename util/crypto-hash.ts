import crypto from 'crypto'
var hexToBinary = require('hex-to-binary');

export const cryptoHash = (...inputs:any)=>{
    const hash = crypto.createHash('sha256')
    hash.update(inputs.sort().join(' '))
    return hash.digest('hex')
}