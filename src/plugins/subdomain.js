import { getAddress } from '@harmony-js/crypto'
const ENS = require('@ensdomains/ensjs').default
const Web3 = require('web3')
const { hash } = require('eth-ens-namehash')
const oldnames = require('./oldnames.json')

const WEB3_URL = 'https://api.s0.t.hmny.io'
const ENS_ADDRESS = '0x3fa4135B88cE1035Fed373F0801118a3340B37e7'

const EthRegistrarSubdomainRegistrar = require('../../build/contracts/EthRegistrarSubdomainRegistrar')
const apiFactory = () => ({
  ens: null,
  web3: null,
  subdomainRegistrar: null,
  async init (subdomain) {
    this.web3 = new Web3(WEB3_URL)

    const provider = new Web3.providers.HttpProvider(WEB3_URL)

    this.ens = new ENS({ provider, ensAddress: ENS_ADDRESS })

    const subdomainRegisterAddress = await this.ens.name('crazy.one').getAddress()

    this.subdomainRegistrar = new this.web3.eth.Contract(
      EthRegistrarSubdomainRegistrar.abi,
      subdomainRegisterAddress
    )
    let twitter = await this.twitterLookup(subdomain)

    if (!twitter && oldnames[subdomain]) {
      twitter = oldnames[subdomain] && oldnames[subdomain].trim()
    }

    return twitter
  },

  async getAddress (subdomain) {
    const subdomainAddress = await this.ens.name(`${subdomain}.crazy.one`).getAddress()

    if (subdomainAddress) {
      return (this.oneAddress(subdomainAddress))
    }
    return null
  },

  async twitterLookup (subdomain) {
    return await this.subdomainRegistrar.methods.twitter(hash(`${subdomain}.crazy.one`)).call()
  },

  oneAddress (address) {
    return getAddress(address).bech32
  }
})

export default ({}, inject) => {
  const subdomain = apiFactory()
  inject('subdomain', subdomain)
}
