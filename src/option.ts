import * as core from '@actions/core'
import * as github from '@actions/github'

export const option = (): Option => {
  const period = Number(core.getInput('period'))
  const since = `${new Date().toISOString().split('T')[0]} 00:00:00`
  const until = `${
    new Date(Date.now() + period * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  } 00:00:00`
  const repoFullName = github.context.payload.repository?.full_name?.split('/')
  if (!repoFullName) throw new Error("Can't get repository full name")

  const owner = repoFullName[0]
  const repo = repoFullName[1]
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
