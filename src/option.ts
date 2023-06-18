import * as core from '@actions/core'

export const option = (): Option => {
  const period = Number(core.getInput('period'))
  const since = `${new Date().toISOString().split('T')[0]} 00:00:00`
  const until = `${
    new Date(Date.now() + period * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  } 00:00:00`
  const rawRepo = 'iisyos/actions_runner'.split('/')
  const owner = rawRepo[0]
  const repo = rawRepo[1]
  core.debug(`owner: ${owner}`)
  core.debug(`repo: ${repo}`)
  return {
    repo,
    owner,
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
