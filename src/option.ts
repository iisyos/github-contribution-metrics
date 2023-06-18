import * as core from '@actions/core'

export const option = (): Option => {
  const period = Number(core.getInput('period'))
  const since = new Date().toISOString().split('T')[0]
  const until = new Date(Date.now() + period * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
  const repo = core.getInput('repo').split('/')[1]
  return {
    repo,
    owner: core.getInput('owner'),
    since,
    until
  }
}

export type Option = {
  repo: string
  owner: string
  since: string
  until: string
}
